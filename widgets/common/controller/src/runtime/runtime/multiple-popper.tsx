/** @jsx jsx */
import { React, jsx, css, lodash, classNames, ReactRedux, IMState, ImmutableObject, IMRuntimeInfos, WidgetManager, IMThemeVariables, WidgetJson, polished, Immutable } from 'jimu-core';
import { Placement, Popper, Resizeable, Draggable, VirtualReference, PopperData, DraggableData, TargetType, Modifiers } from 'jimu-ui';
import { PopperHeader } from '../common';
import { IMConfig, DisplayType } from '../../config';

const modifiers: Modifiers = {
  flip: {
    enabled: true,
    padding: 0
  },
  preventOverflow: {
    enabled: true,
    boundariesElement: 'viewport'
  }
};

const MaxNumberOfCallbacks = 15;
interface Size {
  width: number;
  height: number;
}
interface SizeMap {
  [widgetId: string]: Size;
}

type IMSizeMap = ImmutableObject<SizeMap>;

interface PositionMap {
  [widgetId: string]: {
    x: number;
    y: number;
  }
}

interface ReferenceMap {
  [widgetId: string]: VirtualReference
}

export interface WidgetInfo {
  show?: boolean;
  id: string;
}

export interface Posotion {
  left: number,
  top: number,
  offset: number, //For `DisplayType.Stack`
  space: number //For `DisplayType.SideBySide`
}

export type IMPosotion = ImmutableObject<Posotion>

interface OwnProps {
  widgetIds: string[];
  forbiddenZone: ClientRect | DOMRect;
  widgetId: string,
  widgets: WidgetInfo[],
  defaultSize: {
    width: number,
    height: number
  },
  referenceNode?: HTMLElement,
  position: IMPosotion,
  container?: TargetType,
  offset?: number[];
  placement: Placement,
  onClose?: (id?: string) => any
}

interface ExtraProps {
  theme: IMThemeVariables;
  config: IMConfig,
  widgetJsons: ImmutableObject<{ [widgetId: string]: WidgetJson }>,
  widgetsRuntimeInfo: IMRuntimeInfos;
}

type Props = OwnProps & ExtraProps;

interface State {
  size?: IMSizeMap;
  position?: PositionMap;
}

export class _MultiplePopper extends React.PureComponent<Props, State> {
  wm: WidgetManager;
  numberOfCallbacks: number;
  referenceRectMap: {
    [x: number]: ClientRect
  };
  virtualRefs?: ReferenceMap;

  static defaultProps: Partial<Props> = {
    offset: [0, 0],
    defaultSize: { width: 300, height: 300 },
    onClose: () => { },
    forbiddenZone: {} as any
  }
  popperOptions: any;

  constructor(props) {
    super(props);
    this.numberOfCallbacks = 0;
    this.wm = WidgetManager.getInstance();
    this.referenceRectMap = {}
    this.virtualRefs = {};
    this.state = {
      size: Immutable({}),
      position: {}
    };
    // this.onResizeing = lodash.debounce(this.onResizeing.bind(this), 100);
    this.onResizeing = this.onResizeing.bind(this);

    this.popperOptions = {};
  }

  componentDidMount() {
    const { config, defaultSize, widgetIds = [] } = this.props;
    let size = Immutable({});
    const configedSize = config?.behavior?.size || {};
    widgetIds.forEach(widget => {
      size = size.set(widget, configedSize[widget] || defaultSize);
    });
    this.setState({ size });
  }

  getDefaultSize(widgetId: string) {
    const { size } = this.state;
    const { config, defaultSize } = this.props;
    const configSzie = config?.behavior?.size;
    const sizeMap = lodash.assign({}, size, configSzie);
    const widgetSize = (sizeMap && sizeMap[widgetId]) || defaultSize;
    const { width, height } = widgetSize;
    return [width, height]
  }

  componentDidUpdate(prevProps: Props) {
    const { position, config } = this.props;
    const { displayType, onlyOpenOne } = config?.behavior || {};
    //Clear the cached virtual reference when position changed
    if (position !== prevProps.position || displayType !== prevProps.config?.behavior?.displayType || onlyOpenOne !== prevProps.config?.behavior?.onlyOpenOne) {
      this.virtualRefs = {};
    }
  }

  handleClose = (widgetId: string) => {
    this.props.onClose(widgetId);
  }

  onResizeing(widgetId: string, width: number, height: number) {
    let { size } = this.state;
    size = size.set(widgetId, { width, height })
    this.setState({ size });
  }

  getWidgetTitle = (widgetId: string) => {
    const { widgetJsons } = this.props;
    return widgetJsons && widgetJsons[widgetId] && widgetJsons[widgetId].label;
  }

  generatePopperHeader = (widgetId: string) => {
    const { theme } = this.props;
    const title = this.getWidgetTitle(widgetId);
    return <PopperHeader className="header popper-header" theme={theme} text={title} onClose={() => this.handleClose(widgetId)}></PopperHeader>
  }

  gtePopperContent = (widgetId: string) => {
    const header = this.generatePopperHeader(widgetId);
    const widget = this.getWidgetComponent(widgetId);
    return <div className="popper-content">{header}{widget}</div>
  }

  getWidgetComponent = (widgetId: string) => {
    let widgetContent;
    const { widgetsRuntimeInfo: wris } = this.props;
    const isClassLoaded = wris[widgetId] && wris[widgetId].isClassLoaded
    if (!isClassLoaded) {
      this.wm.loadWidgetClass(widgetId);
    }
    if (isClassLoaded) {
      const Widget = this.wm.getWidgetClass(widgetId);
      widgetContent = <div className="widget-container"><Widget /></div>
    } else {
      widgetContent = <div>Loading...</div>;
    }
    return widgetContent;
  }

  getReference = (widgetId: string, index: number) => {
    const { config, referenceNode, position, forbiddenZone } = this.props;
    const { displayType, onlyOpenOne } = config?.behavior || {};
    if (onlyOpenOne) {
      return referenceNode;
    } else {
      if (this.virtualRefs[widgetId]) {
        return this.virtualRefs[widgetId];
      } else {
        let reference = null;
        if (displayType === DisplayType.Stack) {
          reference = this.getStackReference(position, widgetId, forbiddenZone, index);
        } else {
          reference = this.getSideBySideReference(position, widgetId, forbiddenZone, index);
        }
        this.virtualRefs[widgetId] = reference;
        return reference;
      }
    }
  }

  getStackReference = (position: IMPosotion, widgetId: string, forbiddenZone: ClientRect, index: number) => {
    const { left: originLeft, top: originTop, offset } = position;

    const { width, height } = this.state.size[widgetId] || {} as Size;

    let left, top, right, bottom;

    if (index === 0) {
      left = originLeft;
      top = originTop;
      right = left + width;
      bottom = top + height;

    } else {
      const preRect = this.referenceRectMap[index - 1];
      left = preRect.left + offset;
      top = preRect.top + offset;
      right = left + width;
      bottom = top + height;
    }

    const boundary = document.body.getBoundingClientRect();
    const overlapCallback = this.handleOverlap.bind(this, widgetId, position, boundary);
    let rect = this.preverntOverlap({ left, right, top, bottom, width, height }, forbiddenZone, overlapCallback);

    left = rect.left;
    top = rect.top;
    right = rect.right;
    bottom = rect.bottom;

    const outboundaryCallback = this.handleOutBoundary.bind(this, widgetId, position, forbiddenZone);
    rect = this.preverntOutBoundry({ left, right, top, bottom, width, height }, boundary, outboundaryCallback);

    left = rect.left;
    top = rect.top;
    right = rect.right;
    bottom = rect.bottom;

    this.referenceRectMap[index] = {
      width,
      height,
      left,
      top,
      right,
      bottom
    } as ClientRect;


    const option = {
      left,
      top,
      width: 0,
      height: 0
    }
    return new VirtualReference(option as ClientRect);
  }

  isOverlapp = (rect1: ClientRect, rect2: ClientRect) => {
    const overlap = !(rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom);
    return overlap;
  }

  isOutBoundary = (rect: ClientRect, boundary: ClientRect) => {
    const inside = rect.right <= boundary.right &&
      rect.left >= boundary.left &&
      rect.bottom <= boundary.bottom &&
      rect.top >= boundary.top;
    return !inside;
  }
  preverntOutBoundry = (rect: ClientRect, boundary: ClientRect, callback: (rect: ClientRect) => ClientRect) => {
    this.numberOfCallbacks++;
    if (this.numberOfCallbacks > MaxNumberOfCallbacks) {
      console.log(`Number of cycles: ${this.numberOfCallbacks} .In the current boundary, it is impossible to avoid the forbidden areas.
      Maybe it's because the boundary is too small or the forbidden area is too large.`);
      this.numberOfCallbacks = 0;
      return rect;
    }
    const outBoundary = this.isOutBoundary(rect, boundary);
    if (outBoundary) {
      rect = callback(rect);
      this.preverntOutBoundry(rect, boundary, callback);
    }
    return rect;
  }

  handleOutBoundary = (widgetId: string, position, forbiddenZone: ClientRect, rect: ClientRect): ClientRect => {
    const { left: originLeft, offset, space } = position;

    const { width, height } = this.state.size[widgetId] || {} as Size;

    let { left, top, right, bottom } = rect;

    left = originLeft;
    right = left + width;
    top = top + offset;
    bottom = top + height;

    const overlap = this.isOverlapp({ left, top, right, bottom } as ClientRect, forbiddenZone);
    if (overlap) {
      left = forbiddenZone.right + space;
      right = left + width;
    }

    return { left, right, top, bottom, width, height } as ClientRect;
  }

  preverntOverlap = (rect1: ClientRect, rect2: ClientRect, callback: (rect1: ClientRect, rect2: ClientRect) => ClientRect) => {
    this.numberOfCallbacks++;
    if (this.numberOfCallbacks > MaxNumberOfCallbacks) {
      console.log(`Number of cycles: ${this.numberOfCallbacks} .In the current boundary, it is impossible to avoid the forbidden areas.
      Maybe it's because the boundary is too small or the forbidden area is too large.`);
      this.numberOfCallbacks = 0;
      return rect1;
    }
    const overlap = this.isOverlapp(rect1, rect2);
    if (overlap) {
      rect1 = callback(rect1, rect2);
      this.preverntOverlap(rect1, rect2, callback);
    }
    return rect1;
  }

  handleOverlap = (widgetId: string, position, boundary: ClientRect, rect1: ClientRect, rect2: ClientRect): ClientRect => {
    const { left: originLeft, offset, space } = position;

    const { width, height } = this.state.size[widgetId] || {} as Size;

    let { left, top, right, bottom } = rect1;

    left = rect2.right + space;
    right = left + width;
    const outBoundary = this.isOutBoundary({ left, top, right, bottom } as ClientRect, boundary);
    if (outBoundary) {
      left = originLeft;
      right = left + width;
      top = rect2.bottom + offset;
      bottom = top + height;
    }

    return { left, right, top, bottom, width, height } as ClientRect;
  }

  getSideBySideReference = (position: IMPosotion, widgetId: string, forbiddenZone: ClientRect, index: number) => {
    const { left: originLeft, top: originTop, space } = position;

    const { width, height } = this.state.size[widgetId] || {} as Size;

    let left, top, right, bottom;

    if (index === 0) {
      left = originLeft;
      top = originTop;
      right = left + width;
      bottom = top + height;

    } else {
      const preRect = this.referenceRectMap[index - 1];
      left = preRect.right + space;
      top = preRect.top;
      right = left + width;
      bottom = top + height;
    }

    const boundary = document.body.getBoundingClientRect();
    const overlapCallback = this.handleOverlap.bind(this, widgetId, position, boundary);
    let rect = this.preverntOverlap({ left, right, top, bottom, width, height }, forbiddenZone, overlapCallback);

    left = rect.left;
    top = rect.top;
    right = rect.right;
    bottom = rect.bottom;

    const outboundaryCallback = this.handleOutBoundary.bind(this, widgetId, position, forbiddenZone);
    rect = this.preverntOutBoundry({ left, right, top, bottom, width, height }, boundary, outboundaryCallback);

    left = rect.left;
    top = rect.top;
    right = rect.right;
    bottom = rect.bottom;


    this.referenceRectMap[index] = {
      width,
      height,
      left,
      top,
      right,
      bottom
    };

    const option = {
      left,
      top,
      width: 0,
      height: 0
    }

    return new VirtualReference(option as ClientRect);
  }

  onPopperCreate = (data: PopperData, widgetId: string) => {
    const transform = data.styles.transform;
    // eslint-disable-next-line no-useless-escape
    const transforms = transform.match(/(\-?)\d+(\.\d+)?px/g) || [];
    const [x, y] = transforms.map(e => +e.replace('px', ''));

    let { position } = this.state;
    position = lodash.assign({}, position, { [widgetId]: { x, y } });
    this.setState({ position });
  }

  getPopperInitPosition = (widgetId?: string) => {
    return this.state.position[widgetId] || { x: 0, y: 0 };
  }

  onDragStop = (data: DraggableData, widgetId: string) => {
    const { lastX, lastY, deltaX, deltaY } = data;
    let { position } = this.state;
    position = lodash.assign({}, position, { [widgetId]: { x: lastX + deltaX, y: lastY + deltaY } });
    this.setState({ position });
  }

  getStyle = () => {
    return css`
      touch-action: none;
      .popper-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .popper-header {
          width: 100%;
          flex-shrink: 0;
          flex-grow: 0;
          cursor: move;
        }
        .widget-container {
          width: 100%;
          flex-shrink: 0;
          flex-grow: 1;
          height: calc(100% - 48px);
          overflow: auto;
          padding: ${polished.rem(5)};
        }
      }
    `;
  }

  render() {
    const { widgets, placement, offset, defaultSize, container = 'body' } = this.props;
    const { size } = this.state;
    return <React.Fragment>
      {widgets.map((widget, index) => {
        const widgetId = widget.id;
        const { width, height } = size[widgetId] || defaultSize;
        const reference = this.getReference(widgetId, index)
        const content = this.gtePopperContent(widgetId);
        const position = this.getPopperInitPosition(widgetId);
        const onCreate = (data) => this.onPopperCreate(data, widgetId);
        this.popperOptions.onCreate = onCreate;

        return <Draggable
          key={widgetId}
          position={position}
          onStop={(e, data) => this.onDragStop(data, widgetId)}
          bounds="body"
          handle=".popper-header">
          <Popper
            css={this.getStyle}
            offset={offset}
            open={true}
            modifiers={modifiers}
            reference={reference}
            placement={placement}
            container={container}
            popperOptions={this.popperOptions}
            className={classNames({ 'd-none': !widget.show })}>
            <Resizeable onResize={(w, h) => this.onResizeing(widgetId, w, h)}
              minSize={[150, 80]}
              width={width}
              height={height}>
              <div style={{ width, height }} className="border bg-white shadow rounded">{content}</div>
            </Resizeable>
          </Popper>
        </Draggable>
      })
      }
    </React.Fragment>;
  }
}

const mapStateToProps = (state: IMState, ownProps: OwnProps) => {
  return {
    theme: state.theme,
    widgetJsons: state.appConfig.widgets,
    config: state.appConfig.widgets[ownProps.widgetId].config,
    widgetsRuntimeInfo: state.widgetsRuntimeInfo
  }
}

export const MultiplePopper = ReactRedux.connect<ExtraProps, {}, OwnProps>(mapStateToProps)(_MultiplePopper);