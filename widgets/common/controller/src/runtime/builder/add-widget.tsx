/** @jsx jsx */
import { React, jsx, css, IMThemeVariables, themeUtils, layoutUtils, LayoutItemConstructorProps, WidgetType, LayoutItemType, injectIntl, IntlShape } from 'jimu-core';
import { WidgetListPopper } from 'jimu-ui/setting-components';
import { AvatarCard, AvatarCardProps } from '../common';
const addIcon = require('jimu-ui/lib/icons/add-16.svg');
import defaultMessages from '../translations/default';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  item: AvatarCardProps
  onAddWidget?: (item: LayoutItemConstructorProps) => void;
}

interface ExtraProps {
  intl: IntlShape
}


interface State {
  open?: boolean;
}

export class _AddWidget extends React.PureComponent<Props & ExtraProps, State> {
  button: any;
  buildTheme: IMThemeVariables;
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  handleClick(evt: React.MouseEvent<HTMLDivElement>) {
    evt.stopPropagation();
    this.toggle();
  }

  componentDidMount() {
    this.buildTheme = themeUtils.getBuilderThemeVariables();
  }

  popperStyle = () => {
    return css`
      width: 300px;
      height: 300px;
      overflow-y: auto;
    `;
  }

  isItemAccepted(item: LayoutItemConstructorProps): boolean {
    const itemType = item?.itemType;
    const type = item?.manifest?.widgetType;
    const name = item?.manifest?.name;
    return itemType !== LayoutItemType.Section && type !== WidgetType.Layout && name !== 'controller' && !layoutUtils.isWidgetPlaceholder(item);
  }

  translate = (id: string) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] })
  }

  render() {
    const { onAddWidget, item, style, className } = this.props;
    const { open } = this.state;
    return <React.Fragment>
      <AvatarCard
        {...item}
        style={style}
        className={className}
        title={this.translate('addWidget')}
        icon={{ svg: addIcon } as any}
        innerRef={ref => this.button = ref}
        onClick={this.handleClick}>
      </AvatarCard>
      {open && <WidgetListPopper
        builderTheme={this.buildTheme}
        referenceElement={this.button}
        isItemAccepted={this.isItemAccepted}
        onItemSelect={onAddWidget}
        onClose={this.toggle}
      >
      </WidgetListPopper>}
    </React.Fragment>
  }
}

export const AddWidget = injectIntl(_AddWidget);