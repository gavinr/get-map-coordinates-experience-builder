import { React, IMLayoutItemJson, classNames } from 'jimu-core';
import { withRnd } from 'jimu-layouts/layout-builder';
import { getAppConfigAction, AppConfigAction } from 'jimu-for-builder'
import { WidgetAvatarCardProps, WidgetAvatarCard } from '../../common';
const WidgetRndAvatarCard = withRnd(false)(WidgetAvatarCard as any);

export interface ControllerLayoutItemProps extends WidgetAvatarCardProps {
  draggable?: boolean;
  layoutId: string;
  layoutItem: IMLayoutItemJson;
  layoutItemId: string;
  syncWidgetsToOtherSizeMode: (appConfigAction: AppConfigAction) => void;
}

export default class LayoutItem extends React.PureComponent<Omit<ControllerLayoutItemProps, 'onDragStart' | 'onDragEnd'>> {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove() {
    const { layoutItem } = this.props;
    const appConfigAction = getAppConfigAction();
    appConfigAction.removeWidget(layoutItem?.widgetId)
    this.props.syncWidgetsToOtherSizeMode(appConfigAction);
    appConfigAction.exec();
  }

  render() {
    const {
      className,
      draggable,
      layoutId,
      layoutItem,
      onWidgetClick,
      label,
      showLabel,
      labelGrowth,
      showMarker,
      avatar
    } = this.props;

    return <WidgetRndAvatarCard
      className={classNames({ 'no-drag-action': !draggable }, className)}
      layoutId={layoutId}
      layoutItem={layoutItem}
      widgetid={layoutItem.widgetId}
      layoutItemId={layoutItem.id}
      onRemoveWidget={this.remove}
      onWidgetClick={onWidgetClick}
      label={label}
      showMarker={showMarker}
      showLabel={showLabel}
      labelGrowth={labelGrowth}
      avatar={avatar}
    />
  }
}