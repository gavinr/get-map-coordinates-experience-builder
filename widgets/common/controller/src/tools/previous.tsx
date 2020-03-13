import { extensionSpec, React, getAppStore, LayoutContextToolProps, i18n } from 'jimu-core';
import { defaultMessages } from 'jimu-ui';
export default class Previous implements extensionSpec.ContextTool {
  index = 1;
  id = 'controller-roll-list-previous';
  widgetId: string;

  classes: { [widgetId: string]: React.ComponentClass<{}> } = {};

  visible(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    return widgetState && widgetState.showArrow;
  }

  disabled(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    return widgetState && widgetState.disablePrevious;
  }

  getGroupId() {
    return null;
  }

  getTitle() {
    const intl = i18n.getIntl('_jimu');
    return intl ? intl.formatMessage({ id: 'previous', defaultMessage: defaultMessages['previous'] }) : 'Previous';
  }

  getIcon() {
    return require('jimu-ui/lib/icons/arrow-left-14.svg');
  }

  onClick(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    if (widgetState && widgetState.onArrowClick) {
      widgetState.onArrowClick(true, false);
    }
  }
  getSettingPanel(props: LayoutContextToolProps): React.ComponentClass<{}> {
    return null;
  }
}




