/** @jsx jsx */
import {
  React, jsx, IMState, IMLayoutJson, appActions, Immutable, utils as jimuUtils, IMSizeModeLayoutJson, ReactRedux, ThemeVariables, ImmutableObject,
  LayoutItemConstructorProps, lodash, ReactResizeDetector, IMRuntimeInfos, WidgetState, BrowserSizeMode, css, polished, ImmutableArray, getAppStore
} from 'jimu-core';
import { IMConfig } from '../../config';
import { RollList, getItemLength, AvatarCardProps } from '../common'
import * as utils from '../utils';
import { getAppConfigAction, AppConfigAction } from 'jimu-for-builder';
import LayoutIconList from './layout/layout';
import { LayoutContainer } from './layout-container';
import { addItemToLayout } from 'jimu-layouts/layout-builder';
import { BASE_LAYOUT_NAME, CONTAINER_LAYOUT_NAME } from '../consts';
import { AddWidget } from './add-widget';
import { Placement } from 'jimu-ui';

interface OwnProps {
  id: string;
  config: IMConfig;
  translate: (id: string) => string;
  generation?: number;
  moves: number;
}

interface ExtraProps {
  layout: IMLayoutJson;
  controlledWidgets: ImmutableArray<string>;
  layouts: IMSizeModeLayoutJson;
  popperLayouts: IMSizeModeLayoutJson;
  theme: ThemeVariables;
  widgetsRuntimeInfo: IMRuntimeInfos;
  sizeMode: BrowserSizeMode;
  widgetState?: {
    layoutAbility: boolean
  }
}

type Size = ImmutableObject<{
  width: number,
  height: number
}>

interface State {
  activeIconNode: HTMLDivElement;
  start: number,
  end: number,
  size?: Size
}

export class _Widget extends React.PureComponent<OwnProps & ExtraProps, State>{
  rollContent: HTMLDivElement;
  resizeDebounce: any;
  dropzoneNode: HTMLDivElement;
  rolllistNode: HTMLDivElement;
  constructor(props) {
    super(props);
    this.state = {
      activeIconNode: null,
      start: 0,
      end: 4,
      size: Immutable({ width: 0, height: 0 })
    }

    this.addWidgetToLayout = this.addWidgetToLayout.bind(this);
    this.addWidgetFromList = this.addWidgetFromList.bind(this);
    this.resizeDebounce = lodash.debounce(this.onContentSizeChange.bind(this), 200);
    this.syncWidgetsToOtherSizeMode = this.syncWidgetsToOtherSizeMode.bind(this);
    this.setDropzoneRef = this.setDropzoneRef.bind(this);
    this.setRollListRef = this.setRollListRef.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    getAppStore().dispatch(appActions.widgetStatePropChange(this.props.id, 'onArrowClick', this.onListArrowClick));
    this.addTargetEvents();
    //Fix issue #1625
    const { controlledWidgets, layout } = this.props;
    if (!controlledWidgets || !controlledWidgets.length) {
      const widgetIds = utils.getWidgetIdsFromLayout(layout) || [];
      if (widgetIds?.length) {
        this.updateWidgetJsonWidgets(widgetIds);
      }
    }
  }

  addTargetEvents() {
    ['click', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick as any, true)
    );
  }

  removeTargetEvents() {
    ['click', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick as any, true)
    );
  }

  handleDocumentClick(evt: React.MouseEvent<any>) {
    const { widgetState, id } = this.props;
    if (!widgetState.layoutAbility) return;
    const target = evt.target as HTMLElement
    const isToolItem = !!(target.classList && target.classList.contains('tool-item-icon'));
    if (isToolItem) return;
    const isdropzone = target === this.dropzoneNode;
    const outBoundary = !this.rolllistNode.contains(target);
    if (isdropzone || outBoundary) {
      getAppStore().dispatch(appActions.widgetStatePropChange(id, 'layoutAbility', false));
    }
  }

  setDropzoneRef(ref: HTMLDivElement) {
    this.dropzoneNode = ref;
  }

  setRollListRef(ref: HTMLDivElement) {
    this.rolllistNode = ref;
  }

  componentWillUnmount() {
    this.removeTargetEvents();
  }

  getOpeningWidgets = (): string[] => {
    const { layout, widgetsRuntimeInfo } = this.props;
    const widgetIds = utils.getWidgetIdsFromLayout(layout) || [];

    const openedWidgets = Object.keys(widgetsRuntimeInfo).filter(widgetId => {
      const runtimeInfo = widgetsRuntimeInfo[widgetId];
      return !!(runtimeInfo && runtimeInfo.state && runtimeInfo.state === WidgetState.Opened);
    });

    return widgetIds.filter(widgetId => {
      return openedWidgets.indexOf(widgetId) > -1;
    });
  }

  closeWidgets = (widgetIds: string[]) => {
    const action = appActions.closeWidgets(widgetIds);
    getAppStore().dispatch(action);
  }

  closeOpeningWidgets = () => {
    const openingWidgets = this.getOpeningWidgets();
    this.closeWidgets(openingWidgets);
  }

  openWidget = (widgetId: string) => {
    this.closeOpeningWidgets();
    const openWidget = appActions.openWidget(widgetId);
    getAppStore().dispatch(openWidget);
  }

  componentDidUpdate(prveProps: OwnProps & ExtraProps, prveState: State) {
    const { layout: { order: prveOrder = [] }, generation: prveGeneration } = prveProps;
    const { space: prveSpace } = prveProps.config?.appearance || {};
    const { showLabel: prveShowLabel, labelGrowth: prveLabelGrowth } = prveProps.config?.appearance.card || {};
    const { size: prveSize } = prveProps.config?.appearance?.card?.avatar || {};

    const { layout, layout: { order = [] }, generation } = this.props;
    const { space } = this.props.config?.appearance || {};
    const { showLabel, labelGrowth } = this.props.config?.appearance.card || {};
    const { size } = this.props.config?.appearance?.card?.avatar || {};

    if (generation !== prveGeneration) {
      this.closeOpeningWidgets();
    }

    if (order.length !== prveOrder.length) { //When the number of widgets changes
      const widgetIds = utils.getWidgetIdsFromLayout(layout);
      this.updateWidgetJsonWidgets(widgetIds);
      if (order[order.length - 1] !== prveOrder[prveOrder.length - 1]) {
        this.reflowWhenCountsChange(true);
      } else {
        this.reflowWhenCountsChange(false);
      }
    }
    /**
     * When the overall size changes, or the item size changes
     */
    if (space !== prveSpace || size !== prveSize || this.state.size !== prveState.size || showLabel !== prveShowLabel || labelGrowth !== prveLabelGrowth) {
      this.reflowWhenSizeChange();
    }
  }

  private getIconUnitLength = (): number => {
    const { config } = this.props;
    const space = config?.appearance.space;
    const vertical = config?.behavior.vertical;

    const { showLabel, labelGrowth = 0 } = config?.appearance.card || {};
    const { size, shape } = config?.appearance?.card?.avatar || {};
    const baseLength = getItemLength(size, showLabel, shape);
    return baseLength + space + (vertical ? 0 : labelGrowth);
  }

  private onPopperClose = () => {
    this.closeOpeningWidgets();
  }

  private updateWidgetJsonWidgets = (widgetIds: string[]) => {
    getAppConfigAction().editWidget({ id: this.props.id, widgets: widgetIds }).exec();
  }

  private handleClick = (widgetNode: HTMLDivElement, widgetId: string) => {
    this.setState({ activeIconNode: widgetNode });
    this.openWidget(widgetId)
  }

  private onWidgetSizeChanged = (widgetId: string, width: number, height: number) => {
    if (!widgetId) {
      return
    }
    let { config } = this.props;
    let size = config?.behavior.size || Immutable({});
    const oneSize = Immutable({ [widgetId]: { width, height } });
    size = size.merge(oneSize);
    config = config.setIn(['behavior', 'size'], size);
    this.updateWidgetConfig(config);
  }

  private updateWidgetConfig = (config: IMConfig) => {
    getAppConfigAction().editWidgetConfig(this.props.id, config).exec();
  }

  private publishRollListStateToWidgetState = (disablePrevious: boolean, disableNext: boolean, showArrow: boolean) => {
    getAppStore().dispatch(appActions.widgetStatePropChange(this.props.id, 'disablePrevious', disablePrevious));
    getAppStore().dispatch(appActions.widgetStatePropChange(this.props.id, 'disableNext', disableNext));
    getAppStore().dispatch(appActions.widgetStatePropChange(this.props.id, 'showArrow', showArrow));
  }

  private addWidgetToLayout(itemProps: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, insertIndex: number) {
    const { layout } = this.props;
    const layoutInfo = {
      layoutId: layout.id,
    };
    let appConfigAction = getAppConfigAction();
    addItemToLayout(appConfigAction.appConfig, itemProps, layoutInfo, containerRect, itemRect, insertIndex)
      .then(((result) => {
        const { updatedAppConfig } = result;
        appConfigAction = getAppConfigAction(updatedAppConfig);
        this.syncWidgetsToOtherSizeMode(appConfigAction);
        appConfigAction.exec();
      }));
  }

  private syncWidgetsToOtherSizeMode(appConfigAction: AppConfigAction) {
    const { layout, sizeMode, layouts } = this.props;
    Object.keys(layouts).forEach(sm => {
      if (sizeMode !== sm) {
        appConfigAction.copyLayoutContent(layout.id, layouts[sm]);
      }
    })
  }

  private addWidgetFromList(item: LayoutItemConstructorProps) {
    const { layout } = this.props;
    const insertIndex = (layout && layout.order && layout.order.length) || 0;
    const containerRect = {} as ClientRect;
    const itemRect = {} as ClientRect;
    this.addWidgetToLayout(item, containerRect, itemRect, insertIndex);
  }

  private reflowWhenCountsChange(reverse?: boolean) {
    const counts = utils.getLayoutItemCounts(this.props.layout);
    const { size: { width, height } } = this.state;
    const [start, end] = this.calculateStartEnd(width, height, reverse);
    const { showArrow, disablePrevious, disableNext } = utils.calculateRollListState(start, end, counts);
    this.publishRollListStateToWidgetState(disablePrevious, disableNext, showArrow);
    this.setState({ start, end });
  }

  private reflowWhenSizeChange() {
    const counts = utils.getLayoutItemCounts(this.props.layout);
    const { size: { width, height } } = this.state;
    const [start, end] = this.calculateStartEnd(width, height, false);
    const { showArrow, disablePrevious, disableNext } = utils.calculateRollListState(start, end, counts);
    this.publishRollListStateToWidgetState(disablePrevious, disableNext, showArrow);
    this.setState({ start, end });
  }

  private onContentSizeChange = (width: number, height: number) => {
    if (!width && !height) {
      return;
    }
    let { size } = this.state;
    size = size.set('width', width).set('height', height);
    this.setState({ size });
  }

  private calculateStartEnd = (width: number, height: number, reverse?: boolean): [number, number] => {
    const vertical = this.props.config?.behavior.vertical;
    const space = this.props.config?.appearance.space;
    const unitLength = this.getIconUnitLength();
    const offset = unitLength; //The width/height of add widget and space
    const length = utils.getListContentLength(width, height, vertical, space, offset);
    const number = utils.getOneScreenNumber(length, unitLength);
    const counts = utils.getLayoutItemCounts(this.props.layout);
    const origin = reverse ? counts : 0;
    return utils.calculateStartEnd(origin, number, reverse);
  }

  private onListArrowClick = (previous: boolean, rollOne: boolean = true) => {
    const counts = utils.getLayoutItemCounts(this.props.layout);
    const [start, end] = utils.onListArrowClick(previous, counts, this.state.start, this.state.end, rollOne);
    const { showArrow, disablePrevious, disableNext } = utils.calculateRollListState(start, end, counts);
    this.publishRollListStateToWidgetState(disablePrevious, disableNext, showArrow);
    this.setState({ start, end });
  }

  addWidget = () => {
    const { space = 0 } = this.props.config.appearance || {};
    const { showLabel, labelGrowth = 0 } = this.props.config?.appearance.card || {};
    const { size, shape, type = 'primary' } = this.props.config?.appearance?.card?.avatar || {};
    const vertical = this.props.config?.behavior.vertical;
    const counts = utils.getLayoutItemCounts(this.props.layout);
    const empty = !counts;
    const spacing = !empty ? polished.rem(space) : 'unset';
    const leftSpace = !empty ? polished.rem(labelGrowth / 2 + space) : 'unset';

    const avatarProps = {
      showLabel: !empty ? showLabel : false,
      avatar: {
        type,
        size,
        shape
      }
    }

    return <AddWidget
      css={css`
        margin-left: ${ !vertical ? leftSpace : 'unset'};
        margin-top: ${ vertical ? spacing : 'unset'};
      `}
      item={avatarProps}
      className="add-widget-btn"
      onAddWidget={this.addWidgetFromList}></AddWidget>
  }

  widgetIconList = () => {
    const { layouts, widgetState } = this.props;
    const vertical = this.props.config?.behavior.vertical;
    const space = this.props.config?.appearance.space;
    const card = this.props.config?.appearance?.card;
    const { start, end } = this.state;
    const counts = utils.getLayoutItemCounts(this.props.layout);
    const { showArrow, disablePrevious, disableNext } = utils.calculateRollListState(start, end, counts);
    const openingWidgets = this.getOpeningWidgets();

    return <RollList
      vertical={vertical}
      showArrow={showArrow}
      disableNext={disableNext}
      disablePrevious={disablePrevious}
      onArrowClick={this.onListArrowClick}
      innerRef={this.setRollListRef}
      placeholder={this.addWidget()}>
      <LayoutIconList
        start={start}
        end={end}
        space={space}
        layouts={layouts}
        vertical={vertical}
        dropZoneRef={this.setDropzoneRef}
        draggable={widgetState && widgetState.layoutAbility}
        activeIds={openingWidgets}
        onWidgetClick={this.handleClick}
        addWidgetToLayout={this.addWidgetToLayout}
        syncWidgetsToOtherSizeMode={this.syncWidgetsToOtherSizeMode}
        item={card as AvatarCardProps}
      />
    </RollList>
  }

  layoutContailer = () => {
    const { id, popperLayouts, config, theme, layout, moves } = this.props;
    const size = config?.behavior.size || Immutable({});
    const vertical = config?.behavior.vertical;

    const { activeIconNode } = this.state;
    const openingWidgets = this.getOpeningWidgets() || [];
    const placement: Placement = !vertical ? 'bottom' : 'right-start';
    const layoutContainer = <LayoutContainer
      parentId={id}
      generation={moves}
      placement={placement}
      onClose={this.onPopperClose}
      theme={theme}
      size={size[openingWidgets[0]]}
      layouts={popperLayouts}
      widgetIds={utils.getWidgetIdsFromLayout(layout)}
      onWidgetSizeChange={this.onWidgetSizeChanged}
      widgetId={openingWidgets[0]}
      reference={activeIconNode}></LayoutContainer>;
    return openingWidgets[0] ? layoutContainer : null
  }

  render() {
    return <React.Fragment>
      {this.layoutContailer()}
      {this.widgetIconList()}
      <ReactResizeDetector handleWidth handleHeight onResize={this.resizeDebounce}></ReactResizeDetector>
    </React.Fragment>
  }
}

const mapStateToProps = (state: IMState, ownProps: OwnProps) => {
  const widget = state.appConfig.widgets[ownProps.id];
  const layouts = widget.layouts;
  const widgetsRuntimeInfo = state.widgetsRuntimeInfo || Immutable({}) as IMRuntimeInfos;
  const controlledWidgets = widget.widgets;
  return {
    controlledWidgets,
    widgetState: state.widgetsState[ownProps.id],
    widgetsRuntimeInfo,
    theme: state.theme,
    layout: state.appConfig.layouts[jimuUtils.findLayoutId(layouts[BASE_LAYOUT_NAME], state.browserSizeMode, state.appConfig.mainSizeMode)],
    layouts: layouts[BASE_LAYOUT_NAME],
    popperLayouts: layouts[CONTAINER_LAYOUT_NAME],
    sizeMode: state.browserSizeMode
  }
}

export const WidgetInBuilder = ReactRedux.connect<ExtraProps, {}, OwnProps>(mapStateToProps)(_Widget) as any;