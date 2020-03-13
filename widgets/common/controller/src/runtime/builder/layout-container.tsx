/** @jsx jsx */
import {
  React, jsx, css, Immutable, utils as jimuUtils, ThemeVariables, getAppStore, IMState, ReactRedux, IMSizeModeLayoutJson,
  IMLayoutJson, polished, LayoutItemType, IMWidgetJson
} from 'jimu-core';
import { Resizeable, Draggable, DraggableData, PopperData, Placement } from 'jimu-ui';
import { getAppConfigAction, appConfigUtils } from 'jimu-for-builder';
import { selectionChanged } from 'jimu-core/lib/app-actions';
import LayoutForBuilder from 'jimu-layouts/lib/fixed-layout/builder/layout';
import { PopperHeader } from '../common'
import { SensitivePopper } from '../common/sensitive-popper';
import { ControlPosition } from 'react-draggable';

export interface OwnProps {
  placement?: Placement;
  theme?: ThemeVariables;
  parentId: string;
  widgetId?: string;
  widgetIds: string[],
  layouts: IMSizeModeLayoutJson,
  reference: any;
  onClose?: (widgetId?: string) => any;
  size: { width: number, height: number };
  onWidgetSizeChange?: (widgetId: string, width: number, height: number) => any;
  /**
 *  When this value changes, call scheduleUpdate to recalculate the position
 */
  generation?: number;
}

interface ExtraProps {
  widgetJson: IMWidgetJson,
  isExist: boolean;
  layout: IMLayoutJson;
  inSelection: boolean;
  parentWidgetState?: {
    layoutAbility: boolean
  }
}

interface State {
  width: number;
  height: number;
  position: ControlPosition
}

class _LayoutContainer extends React.PureComponent<OwnProps & ExtraProps, State> {
  elementId: string;

  static defaultProps: Partial<OwnProps> = {
    placement: 'bottom',
    widgetIds: [],
    size: { width: 300, height: 300 },
    onClose: () => { },
    onWidgetSizeChange: () => { }
  }
  popperOptions: any;

  constructor(props) {
    super(props);
    this.elementId = '0';
    this.state = {
      width: 0,
      height: 0,
      position: {
        x: 0,
        y: 0
      }
    }

    this.popperOptions = {
      onCreate: this.onPopperCreate
    }
  }

  componentDidMount() {
    this.createLayoutElement();
    const { size: { width, height } } = this.props;
    this.setState({ width, height });
  }

  componentDidUpdate(preveProps: OwnProps & ExtraProps) {
    const { widgetId: prveWidgetId, layout, isExist: prveIsExist, inSelection: prveInSelection, parentWidgetState: prveParentWidgetState } = preveProps;
    const { widgetId, isExist, inSelection, parentWidgetState, onClose } = this.props;

    if (isExist !== prveIsExist && !isExist) {
      onClose(widgetId);
      return;
    }

    if (widgetId && widgetId !== prveWidgetId) {
      let appConfig = getAppConfigAction().appConfig;
      appConfig = appConfig.setIn(['layouts', layout.id, 'content', this.elementId], this.getLayoutElementJson(widgetId))
        .setIn(['layouts', layout.id, 'order'], [this.elementId]);
      getAppConfigAction(appConfig).exec();
      getAppStore().dispatch(selectionChanged((Immutable({ layoutId: layout.id, layoutItemId: this.elementId }))));
      const { size: { width, height } } = this.props;
      this.setState({ width, height });
    } else {
      if ((!inSelection && inSelection !== prveInSelection) || parentWidgetState.layoutAbility && parentWidgetState.layoutAbility !== prveParentWidgetState.layoutAbility) {
        onClose();
      }
    }
  }

  getWidgetTitle = (widgetId: string) => {
    if (!widgetId) {
      return;
    }
    return this.props.widgetJson?.label;
  }

  getLayoutElementJson = (widgetId: string) => {
    return {
      type: 'WIDGET',
      widgetId: widgetId,
      bbox: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      },
      id: this.elementId
    };
  }

  createLayoutElement = () => {
    const { widgetId, layout } = this.props;
    if (layout) {
      let appConfig = getAppConfigAction().appConfig;
      const elementJson = this.getLayoutElementJson(widgetId);

      appConfig = appConfig.setIn(['layouts', this.props.layout.id, 'content', elementJson.id], elementJson)
        .setIn(['layouts', this.props.layout.id, 'order'], [elementJson.id]);
      getAppConfigAction(appConfig).exec();
      getAppStore().dispatch(selectionChanged((Immutable({ layoutId: layout.id, layoutItemId: this.elementId }))));
    }
  }

  onResizeEnd = (width: number, height: number) => {
    const { widgetId } = this.props;
    this.props.onWidgetSizeChange(widgetId, width, height);
  }

  getStyle = () => {
    return css`
      /* hide rnd-resize bar for the outermost layout item */
      .controller-configuration-container > .fixed-layout > .builder-layout-item > .select-wrapper >.action-area {
        > .rnd-resize-top,
        > .rnd-resize-right,
        > .rnd-resize-bottom,
        > .rnd-resize-left {
          display: none;
        }
      }
      
      .selectable {
        > div {
          cursor: default;
        }
      }
      .popper-content {
        display: flex;
        width: 100%;
        height:100%;
        flex-direction: column;
        .popper-header {
          width: 100%;
          flex-shrink: 0;
          flex-grow: 0;
          cursor: move;
        }
        .widget-container {
          display: flex;
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

  onResizeing = (width: number, height: number) => {
    this.setState({ width, height });
  }

  generatePopperHeader = () => {
    const { widgetId, onClose, theme } = this.props;
    return <PopperHeader className="popper-header" theme={theme} text={this.getWidgetTitle(widgetId)} onClose={() => onClose(widgetId)}></PopperHeader>
  }

  closePopper = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  onPopperCreate = (data: PopperData) => {
    const transform = data.styles.transform;
    const transforms = transform.match(/(\-?)\d+(\.\d+)?px/g) || [];
    const [x, y] = transforms.map(e => +e.replace('px', ''));
    this.setState({ position: { x, y } });
  }

  onDragStop = (data: DraggableData) => {
    const { lastX, lastY, deltaX, deltaY } = data;
    const position = { x: lastX + deltaX, y: lastY + deltaY }
    this.setState({ position });
  }

  isItemAccepted(): boolean {
    return false;
  }

  render() {
    const { layouts, layout, reference, widgetId, placement, generation } = this.props;
    if (!layout || !widgetId) {
      return null;
    }
    const { width, height } = this.state;

    return <Draggable
      position={this.state.position}
      onStop={(e, data) => this.onDragStop(data)}
      bounds="body"
      handle=".popper-header">
      <SensitivePopper
        css={this.getStyle()}
        generation={generation}
        container="body"
        onRequestClose={this.closePopper}
        className="d-flex flex-column flex-grow-1 border bg-white shadow rounded"
        popperOptions={this.popperOptions}
        reference={reference} open={!!widgetId} placement={placement}>
        <Resizeable
          onResize={this.onResizeing}
          onEnd={this.onResizeEnd}
          minSize={[150, 30]}
          width={width}
          height={height}>
          <div style={{ width, height }} className="popper-content">
            {this.generatePopperHeader()}
            <div className="widget-container controller-configuration-container">
              <LayoutForBuilder isItemAccepted={this.isItemAccepted} layouts={layouts} itemDraggable={false} itemResizable={true} showDefaultTools={false}></LayoutForBuilder>
            </div>
          </div>
        </Resizeable>

      </SensitivePopper>
    </Draggable>
  }
}

const mapStateToProps = (state: IMState, ownProps: OwnProps) => {
  const appConfig = state.appConfig;
  const layout = appConfig.layouts[jimuUtils.findLayoutId(ownProps.layouts, state.browserSizeMode, appConfig.mainSizeMode)];

  let inSelection = false;
  const selection = state.appRuntimeInfo.selection;
  if (selection && appConfig.layouts[selection.layoutId] && ownProps.widgetId) {
    const layoutItem = appConfig.layouts[selection.layoutId].content[selection.layoutItemId];
    const widgetId = layoutItem && layoutItem.widgetId
    const childwidgetids = appConfigUtils.getChildrenWidgetsOrSections(appConfig, ownProps.widgetId, LayoutItemType.Widget, false);
    let validids = [ownProps.widgetId, ownProps.parentId];
    if (childwidgetids) {
      validids = validids.concat(childwidgetids);
    }
    inSelection = validids.indexOf(widgetId) > -1;
  }

  return {
    widgetJson: appConfig?.widgets?.[ownProps?.widgetId],
    parentWidgetState: state.widgetsState[ownProps.parentId] || {},
    inSelection,
    layout: layout,
    isExist: ownProps.widgetIds.indexOf(ownProps.widgetId) > -1
  }
}
export const LayoutContainer = ReactRedux.connect<ExtraProps, {}, OwnProps>(mapStateToProps)(_LayoutContainer) as any;
