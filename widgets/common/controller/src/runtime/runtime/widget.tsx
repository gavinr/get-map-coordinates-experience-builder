import {
  React, IMState, IMLayoutJson, utils as jimuUtils, ReactRedux, ThemeVariables, ImmutableObject, LayoutItemType, ContainerType, Immutable,
  lodash, ReactResizeDetector, IMRuntimeInfos, appActions, getAppStore, WidgetState, BrowserSizeMode, WidgetManager, WidgetJson, appConfigUtils
} from 'jimu-core';
import { IMConfig } from '../../config';
import { RollList, getItemLength, AvatarCardProps } from '../common'
import * as utils from '../utils';
import { IconList } from './icon-list'
import { MultiplePopper, WidgetInfo } from './multiple-popper';
import { MobilePanel } from 'jimu-ui';

const getWidgetIconNode = (widgetId: string) => {
  return document && document.querySelector(`.widget-controller .icon-list .avatar-card[data-widgetid='${widgetId}']`);
}

const LayoutName = 'controller';

const position = Immutable({
  left: 70,
  top: 70,
  offset: 30,
  space: 30
});

const widgetRenderDefSize = {
  width: 300,
  height: 300
}

interface OwnProps {
  id: string;
  layoutId?: string;
  config: IMConfig;
  translate: (id: string) => string;
  generation?: number;
}

interface ExtraProps {
  isInBuilder: boolean;
  mobile: boolean;
  layout: IMLayoutJson;
  theme: ThemeVariables;
  currentPageId: string;
  showInView: boolean;
  widgetsRuntimeInfo: IMRuntimeInfos;
  widgetJsons: ImmutableObject<{ [widgetId: string]: WidgetJson }>,
}

export type IMWidgetInfo = ImmutableObject<WidgetInfo>;

interface State {
  openedWidgets: string[];
  referenceNode: HTMLDivElement;
  start: number,
  end: number,
  openMobilePanel?: boolean;
}

export class _Widget extends React.PureComponent<OwnProps & ExtraProps, State>{
  domNode: HTMLElement;
  forbiddenZone: ClientRect | DOMRect;
  resizeDebounce: any;
  wm: WidgetManager;
  constructor(props: OwnProps & ExtraProps) {
    super(props);
    this.state = {
      openedWidgets: [],
      referenceNode: null,
      start: 0,
      end: 1,
      openMobilePanel: false
    }
    this.toggleMobilePanel = this.toggleMobilePanel.bind(this);
    this.mobilePanel = this.mobilePanel.bind(this);
    this.resizeDebounce = lodash.debounce(this.onRollLayoutResize.bind(this), 100);
    this.wm = WidgetManager.getInstance();
  }

  componentDidMount() {
    this.forbiddenZone = this.domNode.getBoundingClientRect();
    const isInBuilder = this.props.isInBuilder;
    if (!isInBuilder) {
      const openStarts = this.props.config?.behavior?.openStarts as any;
      const onlyOpenOne = this.props.config?.behavior?.onlyOpenOne;

      if (openStarts && openStarts.length) {
        if (onlyOpenOne) {
          setTimeout(() => {
            const referenceNode = getWidgetIconNode(openStarts[0]) as HTMLDivElement;
            this.openWidgets(openStarts);
            this.setState({ openedWidgets: openStarts, referenceNode });
          }, 500);
        } else {
          this.openWidgets(openStarts);
          this.setState({ openedWidgets: openStarts });
        }
      }
    }
  }

  getOpeningWidgets = (): string[] => {
    const { layout, widgetsRuntimeInfo } = this.props;
    const widgetIds = utils.getWidgetIdsFromLayout(layout) || [];

    const openingWidgets = Object.keys(widgetsRuntimeInfo).filter(widgetId => {
      const runtimeInfo = widgetsRuntimeInfo[widgetId];
      return !!(runtimeInfo && runtimeInfo.state && runtimeInfo.state === WidgetState.Opened);
    });

    return widgetIds.filter(widgetId => {
      return openingWidgets.indexOf(widgetId) > -1;
    });
  }

  closeWidgets = (widgetIds: string[]) => {
    widgetIds.forEach(widgetId => {
      this.closeWidget(widgetId);
    })
  }

  closeWidget = (widgetId: string) => {
    const action = appActions.closeWidget(widgetId);
    getAppStore().dispatch(action);
  }

  closeOpeningWidgets = () => {
    const openingWidgets = this.getOpeningWidgets();
    this.closeWidgets(openingWidgets);
  }

  openWidgets = (widgetIds: string[]) => {
    widgetIds.forEach(widgetId => {
      this.openWidget(widgetId);
    })
  }

  openWidget = (widgetId: string) => {
    const action = appActions.openWidget(widgetId);
    getAppStore().dispatch(action);
  }

  componentDidUpdate(preProps: OwnProps & ExtraProps) {
    const { generation: preGeneration } = preProps;
    const { generation } = this.props;

    if (generation !== preGeneration) {
      this.closeOpeningWidgets();
      this.setState({ openedWidgets: [] })
    }

    const { currentPageId: prePageId, showInView: preShowInView } = preProps;
    const { currentPageId, showInView } = this.props;

    if (currentPageId !== prePageId || (showInView !== preShowInView && !showInView)) {
      this.closeOpeningWidgets();
    }
  }

  private handleClick = (widgetNode: HTMLDivElement, widgetId: string, ) => {
    let { openedWidgets } = this.state;

    if (openedWidgets.indexOf(widgetId) < 0) {
      openedWidgets = [...openedWidgets, widgetId];
      this.setState({ openedWidgets });
    }
    this.setState({ referenceNode: widgetNode });

    const { config, mobile } = this.props;
    const onlyOpenOne = config?.behavior?.onlyOpenOne;
    const keepOneOpened = mobile ? true : onlyOpenOne;

    const openingWidgtes = this.getOpeningWidgets();
    if (keepOneOpened) {
      this.closeOpeningWidgets();
      if (openingWidgtes.indexOf(widgetId) < 0) {
        this.openWidget(widgetId);
      }
    } else {
      if (openingWidgtes.indexOf(widgetId) < 0) {
        this.openWidget(widgetId);
      } else {
        this.closeWidget(widgetId);
      }
    }
  }

  private getIconUnitLength = (): number => {
    const { space } = this.props.config?.appearance || {};
    const { showLabel } = this.props.config?.appearance?.card || {};
    const { size, shape } = this.props.config?.appearance?.card?.avatar || {};
    const baseLength = getItemLength(size, showLabel, shape);
    return baseLength + space;
  }

  private calculateStartEnd = (width: number, height: number): [number, number] => {
    const { config } = this.props;
    const vertical = config?.behavior.vertical;
    const space = config?.appearance.space;
    const length = utils.getListContentLength(width, height, vertical, space);
    const unitLength = this.getIconUnitLength();
    const number = utils.getOneScreenNumber(length, unitLength);
    return utils.calculateStartEnd(0, number);
  }

  private onRollLayoutResize = (width: number, height: number) => {
    if (!width && !height) {
      return;
    }
    const counts = utils.getLayoutItemCounts(this.props.layout);
    if (!counts) {
      return;
    }
    const [start, end] = this.calculateStartEnd(width, height);
    this.setState({ start, end });
  }

  private onListArrowClick = (previous: boolean, rollOne: boolean = true) => {
    const counts = utils.getLayoutItemCounts(this.props.layout);
    const { disablePrevious, disableNext } = this.calculateRollListState(this.state.start, this.state.end, counts);
    if ((disablePrevious && previous) || (disableNext && !previous)) {
      return;
    }

    const [start, end] = utils.onListArrowClick(previous, counts, this.state.start, this.state.end, rollOne);
    this.setState({ start, end });
  }

  private calculateRollListState = (start: number, end: number, counts: number) => {
    const { showArrow, disablePrevious, disableNext } = utils.calculateRollListState(start, end, counts);
    return { showArrow, disablePrevious, disableNext };
  }

  private genarateWidgetInfos = (): WidgetInfo[] => {
    const { openedWidgets } = this.state;
    const openingWidgtes = this.getOpeningWidgets();
    const widgetInfos = openedWidgets.map(openedWidget => {
      const show = openingWidgtes.indexOf(openedWidget) > -1;
      return {
        id: openedWidget,
        show
      }
    });
    return widgetInfos;
  }

  private onWidgetPopperClose = (id: string) => {
    this.closeWidget(id);
  }

  private setRef = (ref: HTMLDivElement) => {
    this.domNode = ref && ref.parentElement;
  }

  widgetIconList = () => {
    const { layout, config } = this.props;
    const vertical = config?.behavior.vertical;
    const space = config?.appearance.space;
    const card = this.props.config?.appearance?.card;
    const { start, end } = this.state;
    const counts = utils.getLayoutItemCounts(this.props.layout);
    const { showArrow, disableNext, disablePrevious } = this.calculateRollListState(start, end, counts);
    const widgetIds = utils.getWidgetIdsFromLayout(layout);
    const openedWidgets = this.getOpeningWidgets();
    return <RollList
      innerRef={this.setRef}
      vertical={vertical}
      showArrow={showArrow}
      disableNext={disableNext}
      disablePrevious={disablePrevious}
      onArrowClick={this.onListArrowClick}>
      <IconList
        start={start}
        end={end}
        lists={widgetIds}
        space={space}
        vertical={vertical}
        activeIds={openedWidgets}
        onClick={this.handleClick}
        item={card as AvatarCardProps} >
      </IconList>
    </RollList>
  }


  getWidgetTitle = (widgetId: string) => {
    const { widgetJsons } = this.props;
    return widgetJsons && widgetJsons[widgetId] && widgetJsons[widgetId].label;
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
      widgetContent = <Widget />;
    } else {
      widgetContent = <div>Loading...</div>;
    }
    return widgetContent;
  }

  openWidgetsRenderer = () => {
    const { config, id, layout } = this.props;
    const vertical = config?.behavior?.vertical;
    const onlyOpenOne = config?.behavior?.onlyOpenOne;
    const { referenceNode } = this.state;
    const placement = onlyOpenOne ? !vertical ? 'bottom' : 'right-start' : 'bottom-start';
    const offset = onlyOpenOne ? vertical ? [0, 0] : [0, 0] : [0, 0];
    const widgetIds = utils.getWidgetIdsFromLayout(layout);
    return <MultiplePopper
      widgetIds={widgetIds}
      forbiddenZone={this.forbiddenZone}
      widgets={this.genarateWidgetInfos()}
      referenceNode={referenceNode}
      widgetId={id}
      placement={placement}
      offset={offset}
      container="body"
      position={position}
      defaultSize={widgetRenderDefSize}
      onClose={this.onWidgetPopperClose} />;
  }

  toggleMobilePanel() {
    this.closeOpeningWidgets();
  }

  mobilePanel() {
    const openedWidgets = this.getOpeningWidgets();
    const openedWidget = openedWidgets && openedWidgets[0];
    const widget = this.getWidgetComponent(openedWidget);
    const title = this.getWidgetTitle(openedWidget);
    return <MobilePanel title={title} open={!!openedWidget} toggle={this.toggleMobilePanel}>{widget}</MobilePanel>;
  }

  render() {
    const { mobile } = this.props;
    return <React.Fragment>
      {mobile && this.mobilePanel()}
      {!mobile && this.openWidgetsRenderer()}
      {this.widgetIconList()}
      <ReactResizeDetector handleWidth handleHeight onResize={this.resizeDebounce}></ReactResizeDetector>
    </React.Fragment>
  }
}

const mapStateToProps = (state: IMState, ownProps: OwnProps) => {
  const layouts = state.appConfig.widgets[ownProps.id].layouts;
  const info = appConfigUtils.getWidgetOrSectionContainerInfo(state.appConfig, ownProps.id, LayoutItemType.Widget, state.browserSizeMode);
  const viewIds = state.appRuntimeInfo.currentViewIds || [];

  let showInView = true;
  if (info && info.type === ContainerType.View) {
    showInView = viewIds.indexOf(info.id) > -1;
  }

  const widgetsRuntimeInfo = state.widgetsRuntimeInfo || Immutable({}) as IMRuntimeInfos;

  return {
    isInBuilder: state.appContext.isInBuilder,
    widgetJsons: state.appConfig.widgets,
    mobile: state.browserSizeMode === BrowserSizeMode.Small,
    widgetsRuntimeInfo,
    theme: state.theme,
    currentPageId: state.appRuntimeInfo.currentPageId,
    showInView,
    layout: state.appConfig.layouts[jimuUtils.findLayoutId(layouts[LayoutName], state.browserSizeMode, state.appConfig.mainSizeMode)],
    pageId: (info && info.type === ContainerType.Page) ? info.id : ''
  }
}

export const WidgetRuntime = ReactRedux.connect<ExtraProps, {}, OwnProps>(mapStateToProps)(_Widget);