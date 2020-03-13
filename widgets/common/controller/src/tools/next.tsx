import { extensionSpec, React, getAppStore, LayoutContextToolProps, i18n } from 'jimu-core';
import { defaultMessages } from 'jimu-ui';

export default class Next implements extensionSpec.ContextTool {
  index = 2;
  id = 'controller-roll-list-next';
  widgetId: string;

  classes: { [widgetId: string]: React.ComponentClass<{}> } = {};

  visible(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    return widgetState && widgetState.showArrow;
  }

  disabled(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    return widgetState && widgetState.disableNext;
  }

  getGroupId() {
    return null;
  }

  getTitle() {
    const intl = i18n.getIntl('_jimu');
    return intl ? intl.formatMessage({ id: 'next', defaultMessage: defaultMessages['next'] }) : 'Next';
  }

  getIcon() {
    return require('jimu-ui/lib/icons/arrow-right-14.svg');
  }

  onClick(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    if (widgetState && widgetState.onArrowClick) {
      widgetState.onArrowClick(false, false);
    }
  }
  getSettingPanel(props: LayoutContextToolProps): React.ComponentClass<{}> {
    return null;
  }
}




