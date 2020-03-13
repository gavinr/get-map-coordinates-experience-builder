/** @jsx jsx */
import { React, css, jsx, polished, ThemeVariables, IMState, Immutable, ImmutableArray, ThemeButtonVariants } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder';
import { SettingSection, SettingRow, FontStyle } from 'jimu-ui/setting-components';
import { IMConfig, DisplayType } from '../config';
import { Switch, Radio, NumericInput, Select, Label, ButtonGroup, Button, Icon, defaultMessages as jimuDefaultMessages, MultiSelect, Tabs, Tab } from 'jimu-ui';
import defaultMessages from './translations/default';
import { Shapes, ShapeType } from './shapes';
import { ThemeColorPicker } from 'jimu-ui/color-picker';

const DEFAULT_COLOR = '#080808';

const rightArrowIcon = require('jimu-ui/lib/icons/direction-right.svg');
const downArrowIcon = require('jimu-ui/lib/icons/direction-down.svg');

const DEFAULT_OPEN_START = 'none';

type ControlledWidgets = ImmutableArray<{
  label: string,
  value: string
}>;

interface ExtraProps {
  controlledWidgets: ControlledWidgets;
  appTheme: ThemeVariables;
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & ExtraProps>{
  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetSettingProps<IMConfig>) => {
    const appState = state?.appStateInBuilder;
    const widgets = appState?.appConfig?.widgets;
    const controlledWidgetIds = widgets && widgets[ownProps.id]?.widgets || Immutable([]);

    const controlledWidgets: ControlledWidgets = controlledWidgetIds.map(id => ({
      label: widgets[id]?.label,
      value: id as string
    }));

    return {
      controlledWidgets,
      appTheme: appState?.theme
    }
  };

  getStyle = () => {
    return css`
      font-size: 13px;
      font-weight: lighter;
      .setting-row-item {
        width: 100%;
        display: flex;
        margin-top: 0.5rem;
        > span.jimu-radio {
          flex-shrink: 0;
          margin-top: 0.1rem;
        }
        > label {
          margin-bottom: 0;
        }
      }
      .font-setting-row {
        display: flex;
        align-items: center;
      }
      .jimu-multi-select {
        width: 100%;
        > .jimu-dropdown {
          width: 100%;
        }
        > .jimu-menu-item {
          width: 100%;
          height: ${polished.rem(26)};
        }
      }
    `;
  }

  onSettingChange = (key: string | string[], value: any) => {
    let config = this.props.config;
    if (Array.isArray(key)) {
      config = config.setIn(key, value);
    } else {
      config = config.set(key, value);
    }
    this.props.onSettingChange({
      id: this.props.id,
      config
    });
  }

  onRadioChange = (e: React.ChangeEvent<HTMLInputElement>, key: string, value: any) => {
    const checked = e.currentTarget.checked;
    if (!checked) {
      return;
    }
    if (key === 'onlyOpenOne') {
      this.onOpenTypeChange(key, value);
    } else if (key === 'displayType') {
      value = this.getDisplayType(value);
      this.onSettingChange(['behavior', key], value);
    }
  }

  onOpenTypeChange = (key: string, value: any) => {
    let config = this.props.config;
    config = config.setIn(['behavior', 'openStarts'], Immutable([]));
    config = config.setIn(['behavior', key], value);
    this.props.onSettingChange({
      id: this.props.id,
      config
    });
  }

  getDisplayType = (isStack: boolean) => {
    return isStack ? DisplayType.Stack : DisplayType.SideBySide;
  }

  handleOpenStartMultipleClick = (_, value: string, selectedValues: string[]) => {
    const onlyOpenOne = this.props.config?.behavior?.onlyOpenOne;
    const values = onlyOpenOne ? (selectedValues.length ? [value] : []) : selectedValues;
    this.onSettingChange(['behavior', 'openStarts'], values);
  }

  handleOpenStartSingleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    let openStarts = [];
    if (value !== DEFAULT_OPEN_START) {
      openStarts = [value]
    }
    this.onSettingChange(['behavior', 'openStarts'], openStarts);
  }

  renderMultiSelectText = (values: string[]) => {
    const onlyOpenOne = this.props.config?.behavior?.onlyOpenOne;
    const controlledWidgtes = this.props.controlledWidgets;

    if (onlyOpenOne && values.length) {
      const widget = controlledWidgtes.find(w => w.value === values[0]);
      return widget?.label;
    } else {
      const widgetNumber = values?.length || 0;
      return this.translate('widgetsSelected', false, { widgetNumber });
    }
  }

  translate = (id: string, jimu?: boolean, values?: any) => {
    const message = jimu ? jimuDefaultMessages : defaultMessages;
    return this.props.intl.formatMessage({ id: id, defaultMessage: message[id] }, values)
  }

  onIconIntervalChanged = (value: number) => {
    value = +value;
    if (isNaN(value)) {
      value = 0;
    } else {
      if (value > 999) {
        value = 999
      }
      if (value < 0) {
        value = 0;
      }
    }

    let config = this.props.config;
    if (config.behavior.vertical) {
      config = config.setIn(['appearance', 'space'], value);
    } else {
      config = config.setIn(['appearance', 'card', 'labelGrowth'], value)
    }
    this.props.onSettingChange({
      id: this.props.id,
      config
    });
  }

  getButtonVariants = (theme: ThemeVariables): Immutable.ImmutableObject<ThemeButtonVariants> => {
    const type = this.props?.config?.appearance?.card.avatar?.type || 'primary';
    let variants = theme?.components?.button?.variants;
    variants = variants.setIn([type, 'default', 'color'], DEFAULT_COLOR);
    variants = variants.setIn([type, 'active', 'color'], DEFAULT_COLOR);
    return variants;
  }

  onAdvancedChange = () => {
    const { appTheme, id } = this.props;
    let { config } = this.props;
    const advanced = !config?.appearance?.advanced;
    config = config.setIn(['appearance', 'advanced'], advanced);
    if (advanced) {
      const variants = this.getButtonVariants(appTheme);
      config = config.setIn(['appearance', 'card', 'variants'], variants);
    } else {
      config = config.setIn(['appearance', 'card', 'variants'], undefined);
    }

    this.props.onSettingChange({
      id,
      config
    });
  }

  onDirectionChanged = (vertical: boolean) => {
    let config = this.props.config;
    config = config.setIn(['behavior', 'vertical'], vertical).setIn(['appearance', 'card', 'labelGrowth'], 0);
    if (!vertical) {
      config = config.setIn(['appearance', 'space'], 10);
    }
    this.props.onSettingChange({
      id: this.props.id,
      config
    });
    getAppConfigAction().exchangeWidthAndHeight().exec();
  }

  render() {
    const { config, theme, controlledWidgets, appTheme } = this.props;
    const { onlyOpenOne, displayType, vertical, openStarts = Immutable([]) } = config?.behavior || {};
    const { space, advanced } = config?.appearance || {};
    const { showLabel, labelGrowth = 0 } = config?.appearance.card || {};
    const { size, shape, type = 'primary' } = config?.appearance?.card?.avatar || {};
    const variants = advanced ? config?.appearance?.card.variants : this.getButtonVariants(appTheme);
    const styleByState = variants?.[type];
    const regular = styleByState?.default;
    const active = styleByState?.active;
    const hover = styleByState?.hover;

    const openStart = openStarts?.length ? openStarts[0] : DEFAULT_OPEN_START;

    const iconInterval = vertical ? space : labelGrowth;

    return <div className="widget-setting-controller jimu-widget-setting" css={this.getStyle()}>
      <SettingSection>
        <SettingRow flow="no-wrap" label={this.translate('direction')}>
          <ButtonGroup>
            <Button title={this.translate('horizontal')} type="secondary" icon size="sm" active={!vertical} onClick={() => this.onDirectionChanged(false)}>
              <Icon icon={rightArrowIcon}></Icon>
            </Button>
            <Button title={this.translate('vertical')} type="secondary" icon size="sm" active={vertical} onClick={() => this.onDirectionChanged(true)}>
              <Icon icon={downArrowIcon}></Icon>
            </Button>
          </ButtonGroup>
        </SettingRow>
      </SettingSection>
      <SettingSection title={this.translate('behavior')}>
        <SettingRow flow="wrap" label={this.translate('openWidget')}>
          <div className="setting-row-item">
            <Radio id="only-open-one" style={{ cursor: 'pointer' }}
              name="only-open-one" onChange={e => this.onRadioChange(e, 'onlyOpenOne', true)} checked={onlyOpenOne} />
            <Label style={{ cursor: 'pointer' }} for="only-open-one" className="ml-2">{this.translate('single', true)}</Label>
          </div>
          <div className="setting-row-item">
            <Radio id="open-multiple" style={{ cursor: 'pointer' }}
              name="only-open-one" onChange={e => this.onRadioChange(e, 'onlyOpenOne', false)} checked={!onlyOpenOne} />
            <Label style={{ cursor: 'pointer' }} for="open-multiple" className="ml-2">{this.translate('multiple', true)}</Label>
          </div>
        </SettingRow>

        <SettingRow flow="wrap" label={this.translate('openStart')}>
          {!onlyOpenOne && <MultiSelect
            values={openStarts}
            items={controlledWidgets}
            onClickItem={this.handleOpenStartMultipleClick}
            displayByValues={this.renderMultiSelectText} />}
          {
            onlyOpenOne && <Select value={openStart} onChange={this.handleOpenStartSingleChange} className="w-100">
              <option value={DEFAULT_OPEN_START}>{this.translate('none', true)}</option>
              {
                controlledWidgets?.map(item => {
                  return <option key={item.value} value={item.value}>{item.label}</option>
                })
              }
            </Select>
          }
        </SettingRow>
        {!onlyOpenOne && <SettingRow flow="wrap" label={this.translate('displayType')}>
          <div className="setting-row-item">
            <Radio id="display-stack" style={{ cursor: 'pointer' }}
              name="display-type" onChange={e => this.onRadioChange(e, 'displayType', true)}
              checked={displayType === DisplayType.Stack} />
            <Label style={{ cursor: 'pointer' }} for="display-stack" className="ml-2">{this.translate('stack')}</Label>
          </div>
          <div className="setting-row-item">
            <Radio id="display-side-by-side" style={{ cursor: 'pointer' }}
              name="display-type" onChange={e => this.onRadioChange(e, 'displayType', false)}
              checked={displayType === DisplayType.SideBySide} />
            <Label style={{ cursor: 'pointer' }} for="display-side-by-side" className="ml-2">{this.translate('sideBySide')}</Label>
          </div>
        </SettingRow>}

      </SettingSection>

      <SettingSection title={this.translate('appearance', true)}>
        <SettingRow flow="wrap" label={this.translate('iconStyle')}>
          <Shapes type={ShapeType.Circle} title={this.translate('circle', true)} className="mr-2" active={shape === 'circle'} theme={theme}
            onClick={() => this.onSettingChange(['appearance', 'card', 'avatar', 'shape'], 'circle')}></Shapes>
          <Shapes type={ShapeType.Rectangle} title={this.translate('rectangle', true)} active={shape === 'rectangle'} theme={theme}
            onClick={() => this.onSettingChange(['appearance', 'card', 'avatar', 'shape'], 'rectangle')}></Shapes>
        </SettingRow>
        <SettingRow label={this.translate('showIconLabel')}>
          <Switch checked={showLabel} onChange={(evt) => this.onSettingChange(['appearance', 'card', 'showLabel'], evt.target.checked)}></Switch>
        </SettingRow>
        <SettingRow flow="no-wrap" label={this.translate('iconSize')}>
          <Select value={size} onChange={(e) => this.onSettingChange(['appearance', 'card', 'avatar', 'size'], e.target.value)} className="w-50">
            <option value="sm">{this.translate('small', true)}</option>
            <option value="default">{this.translate('medium', true)}</option>
            <option value="lg">{this.translate('large', true)}</option>
          </Select>
        </SettingRow>
        <SettingRow flow="no-wrap" label={this.translate('iconInterval')}>
          <NumericInput className="w-50" value={iconInterval} showHandlers={false} onAcceptValue={this.onIconIntervalChanged}></NumericInput>
        </SettingRow>
      </SettingSection>

      <SettingSection>
        <SettingRow flow="no-wrap" label={this.translate('advance')}>
          <Switch checked={advanced} onChange={this.onAdvancedChange}></Switch>
        </SettingRow>

        {advanced && <SettingRow label={this.translate('states')} flow="wrap">
          <Tabs pills className="flex-grow-1 w-100 h-100" fill>
            <Tab className="tab-title-item" active={true} title={this.translate('regular')}>
              <SettingRow className="mt-2" label={this.translate('textFormat')} flow="no-wrap">
                <div className="font-setting-row">
                  <FontStyle bold={regular.bold} italic={regular.italic} underline={regular.underline} strike={regular.strike}
                    onFontChange={(key, value) => this.onSettingChange(['appearance', 'card', 'variants', type, 'default', key], value)}></FontStyle>
                  <ThemeColorPicker specificTheme={appTheme} value={regular?.color}
                    onChange={(value) => this.onSettingChange(['appearance', 'card', 'variants', type, 'default', 'color'], value)}></ThemeColorPicker>
                </div>
              </SettingRow>
              <SettingRow className="mt-2" label={this.translate('iconBackground')} flow="no-wrap">
                <ThemeColorPicker specificTheme={appTheme} value={regular?.bg}
                  onChange={(value) => this.onSettingChange(['appearance', 'card', 'variants', type, 'default', 'bg'], value)}></ThemeColorPicker>
              </SettingRow>
            </Tab>
            <Tab className="tab-title-item" title={this.translate('select')}>
              <SettingRow className="mt-2" label={this.translate('textFormat')} flow="no-wrap">
                <div className="font-setting-row">
                  <FontStyle bold={active.bold} italic={active.italic} underline={active.underline} strike={active.strike}
                    onFontChange={(key, value) => this.onSettingChange(['appearance', 'card', 'variants', type, 'active', key], value)}></FontStyle>
                  <ThemeColorPicker specificTheme={appTheme} value={active?.color}
                    onChange={(value) => this.onSettingChange(['appearance', 'card', 'variants', type, 'active', 'color'], value)}></ThemeColorPicker>
                </div>
              </SettingRow>
              <SettingRow className="mt-2" label={this.translate('iconBackground')} flow="no-wrap">
                <ThemeColorPicker specificTheme={appTheme} value={active?.bg}
                  onChange={(value) => this.onSettingChange(['appearance', 'card', 'variants', type, 'active', 'bg'], value)}></ThemeColorPicker>
              </SettingRow>

            </Tab>
            <Tab className="tab-title-item" title={this.translate('hover')}>
              <SettingRow className="mt-2" label={this.translate('textFormat')} flow="no-wrap">
                <div className="font-setting-row">
                  <FontStyle bold={hover.bold} italic={hover.italic} underline={hover.underline} strike={hover.strike}
                    onFontChange={(key, value) => this.onSettingChange(['appearance', 'card', 'variants', type, 'hover', key], value)}></FontStyle>
                  <ThemeColorPicker specificTheme={appTheme} value={hover?.color}
                    onChange={(value) => this.onSettingChange(['appearance', 'card', 'variants', type, 'hover', 'color'], value)}></ThemeColorPicker>
                </div>
              </SettingRow>
              <SettingRow className="mt-2" label={this.translate('iconBackground')} flow="no-wrap">
                <ThemeColorPicker specificTheme={appTheme} value={hover?.bg}
                  onChange={(value) => this.onSettingChange(['appearance', 'card', 'variants', type, 'hover', 'bg'], value)}></ThemeColorPicker>
              </SettingRow>
            </Tab>
          </Tabs>
        </SettingRow>}
      </SettingSection>

    </div>
  }
}