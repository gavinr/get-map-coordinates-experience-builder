import { React, IMWidgetJson, IMState, ReactRedux } from 'jimu-core';
import { AvatarCard, AvatarCardProps } from './avatar-card';
import { Loading } from 'jimu-ui';
const MARK_ICON = require('jimu-ui/lib/icons/close-12.svg');

export interface WidgetAvatarCardProps extends AvatarCardProps {
  widgetid?: string;
  showMarker?: boolean;
  onRemoveWidget?: () => void;
  onWidgetClick?: (widgetNode: HTMLDivElement, widgetId: string) => void;
}

interface ExtraProps {
  widgetJson: IMWidgetJson;
}

type Props = WidgetAvatarCardProps & ExtraProps;

class _WidgetIcon extends React.PureComponent<Props> {

  handleClick = e => {
    e.stopPropagation();
    if (this.props.onWidgetClick) {
      this.props.onWidgetClick(e.currentTarget, this.props.widgetid);
    }
  };

  render() {
    const {
      widgetJson,
      showMarker,
      onRemoveWidget,
      widgetid,
      showLabel,
      labelGrowth,
      avatar
    } = this.props;

    if (widgetJson) {
      return <AvatarCard
        widgetid={widgetid}
        showLabel={showLabel}
        labelGrowth={labelGrowth}
        avatar={avatar}
        label={widgetJson.label}
        icon={widgetJson.icon as any}
        autoFlip={widgetJson?.manifest?.properties?.flipIcon}
        marker={showMarker ? MARK_ICON : ''}
        onMarkerClick={onRemoveWidget}
        onClick={this.handleClick}
      />;
    }
    return <Loading />;

  }
}

const mapStateToProps = (state: IMState, ownProps: WidgetAvatarCardProps) => {
  const { widgetid } = ownProps;
  return {
    widgetJson: state.appConfig.widgets[widgetid],
  };
};

export const WidgetAvatarCard = ReactRedux.connect<ExtraProps, {}, WidgetAvatarCardProps>(mapStateToProps)(_WidgetIcon);