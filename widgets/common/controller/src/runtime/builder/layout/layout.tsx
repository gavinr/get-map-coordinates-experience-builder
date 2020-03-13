/** @jsx jsx */
import {
  React, css, jsx, IMSizeModeLayoutJson, IMLayoutJson, IMState, utils, ReactRedux, IMThemeVariables, classNames, Immutable, LayoutItemConstructorProps,
  WidgetType, LayoutItemType, layoutUtils, polished
} from 'jimu-core';
import LayoutItem from './layout-item';
import { DrapZone } from './drop-zone';
import { PageContext, PageContextProps, LayoutContext } from 'jimu-layouts/common';
import { getItemLength } from '../../common/avatar-card';
import { DROP_ZONE_PLACEHOLDER_WIDTH } from '../../consts';
import { AppConfigAction } from 'jimu-for-builder';
import { AvatarCardProps } from '../../common/avatar-card';

interface ExtraProps {
  layout: IMLayoutJson;
}

interface OwnProps {
  vertical?: boolean;
  className?: string;
  style?: React.CSSProperties;
  layouts: IMSizeModeLayoutJson;
  start?: number; // start index of the content, include
  end?: number; // end index of the content, exclude
  onWidgetClick?: (widgetNode: HTMLDivElement, widgetId: string) => void;
  activeIds: string[];
  space?: number;
  item: AvatarCardProps,
  addWidgetToLayout: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, insertIndex: number) => void;
  syncWidgetsToOtherSizeMode: (appConfigAction: AppConfigAction) => void;
  draggable?: boolean;
  dropZoneRef?: (ref: HTMLDivElement) => void;
}

type Props = OwnProps & ExtraProps;

interface State {
  dragover?: boolean;
  openList?: boolean;
}

class _Layout extends React.PureComponent<Props, State> {
  domNode: React.RefObject<HTMLDivElement>;
  builderTheme: IMThemeVariables;

  constructor(props) {
    super(props);
    this.state = {
      dragover: false,
      openList: false
    }
    this.addWidgetFromList = this.addWidgetFromList.bind(this);
    this.isItemAccepted = this.isItemAccepted.bind(this);
    this.handleWidgetClick = this.handleWidgetClick.bind(this);
  }

  getStyle = () => {
    const { vertical, space = 0 } = this.props;
    const spacing = polished.rem(space);
    return css`
      width: 100%;
      height: 100%;
      .layout-item-list {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .layout-item {
          &:not(:first-of-type) {
            margin-top: ${vertical ? spacing : 'unset'};
            margin-left: ${!vertical ? spacing : 'unset'};
          }
        }
      }
    `;
  }

  filterContent = () => {
    const { layout, start, end } = this.props;
    let content = layout.order || Immutable([]);
    content = content.slice(start, end);
    return content;
  }

  addWidgetFromList(item: LayoutItemConstructorProps) {
    const { layout } = this.props;
    const insertIndex = (layout && layout.order && layout.order.length) || 0;
    const containerRect = {} as ClientRect;
    const itemRect = {} as ClientRect;
    this.props.addWidgetToLayout(item, containerRect, itemRect, insertIndex);
  }

  handleWidgetClick(widgetNode: HTMLDivElement, widgetId: string) {
    if (this.props.draggable) return;
    if (this.props.onWidgetClick) {
      this.props.onWidgetClick(widgetNode, widgetId);
    }
  }

  createItem = (itemId: string) => {
    const {
      layout,
      item,
      activeIds,
      draggable
    } = this.props;

    const layoutItem = layout.content[itemId];
    const widgetId = (layoutItem && layoutItem.widgetId) || '';

    const showLabel = item?.showLabel;
    const labelGrowth = item?.labelGrowth;
    const { type, size, shape } = item?.avatar || {};
    const avatarCardProps = {
      showLabel,
      labelGrowth,
      avatar: {
        type,
        size,
        shape,
        active: activeIds.indexOf(widgetId) > -1
      }
    }

    return (
      <LayoutItem
        key={itemId}
        {...avatarCardProps}
        widgetid={widgetId}
        layoutId={layout.id}
        layoutItemId={itemId}
        draggable={draggable}
        showMarker={draggable}
        layoutItem={layoutItem}
        onWidgetClick={this.handleWidgetClick}
        className={`layout-${layout.id}-item layout-item`}
        syncWidgetsToOtherSizeMode={this.props.syncWidgetsToOtherSizeMode}
      />
    );
  }

  isItemAccepted(item: LayoutItemConstructorProps): boolean {
    const itemType = item?.itemType;
    const type = item?.manifest?.widgetType;
    const name = item?.manifest?.name;
    return itemType !== LayoutItemType.Section && type !== WidgetType.Layout && name !== 'controller' && !layoutUtils.isWidgetPlaceholder(item);
  }

  render() {
    const { className, style, layouts, layout, vertical, item, addWidgetToLayout, dropZoneRef } = this.props;
    const showLabel = item?.showLabel;
    const shape = item?.avatar?.shape;
    const size = item?.avatar?.size;

    const content = this.filterContent();
    return <PageContext.Consumer>
      {(pageContext: PageContextProps) => {
        const cyan500 = pageContext.builderTheme.colors.palette.primary[700];
        const placeholder = {
          color: cyan500,
          size: [getItemLength(size, showLabel, shape), DROP_ZONE_PLACEHOLDER_WIDTH]
        }
        return <LayoutContext.Provider value={{ isItemAccepted: this.isItemAccepted }}><div
          css={this.getStyle()}
          className="layout controller-layout"
          data-layoutid={layout.id}>
          <DrapZone
            innerRef={dropZoneRef}
            vertical={vertical}
            layout={layout}
            childClass={`layout-${layout.id}-item`}
            placeholder={placeholder}
            addWidgetToLayout={addWidgetToLayout}
            layouts={layouts}></DrapZone>
          <div style={style}
            className={classNames(className, 'layout-item-list', { 'flex-column': vertical })}>
            {content.length > 0 && (content as any).map(this.createItem)}
          </div>
        </div>
        </LayoutContext.Provider>
      }}
    </PageContext.Consumer>
  }
}

const mapStateToLayoutProps = (state: IMState, ownProps: OwnProps): ExtraProps => {
  const layoutId = utils.findLayoutId(ownProps.layouts, state.browserSizeMode, state.appConfig.mainSizeMode);
  const { layouts } = state.appConfig;

  if (!layouts[layoutId]) {
    return {
      layout: null,
    };
  }

  return {
    layout: layouts[layoutId],
  };
}

export default ReactRedux.connect<ExtraProps, {}, OwnProps>(mapStateToLayoutProps)(_Layout);
