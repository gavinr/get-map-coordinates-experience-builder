/** @jsx jsx */
import { BaseWidget, jsx, css, AllWidgetProps, IMState, AppMode, polished, BrowserSizeMode, IMRuntimeInfos, Immutable, utils, IMLayoutJson, lodash } from 'jimu-core';
import { IMConfig } from '../config';
import { WidgetRuntime } from './runtime';
import defaultMessages from './translations/default';
import { MIN_WIDGET_WIDTH, BASE_LAYOUT_NAME, MIN_WIDGET_HEIGHT } from './consts';
import { styleUtils } from 'jimu-ui';
import { versionManager } from '../version-manager';

interface ExtraProps {
  isInBuilder: boolean;
  appMode: AppMode;
  layout: IMLayoutJson;
  browserSizeMode: BrowserSizeMode;
  widgetsRuntimeInfo: IMRuntimeInfos;
  bbox: {
    left: number,
    top: number,
    width: number,
    height: number,
  }
}

interface State {
  generation?: number;
  moves: number;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & ExtraProps, State>{
  static versionManager = versionManager;
  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<IMConfig>) => {
    const widgetsRuntimeInfo = state.widgetsRuntimeInfo || Immutable({}) as IMRuntimeInfos;
    const layouts = state.appConfig.widgets[ownProps.id].layouts;
    const layout = state.appConfig.layouts[utils.findLayoutId(layouts[BASE_LAYOUT_NAME], state.browserSizeMode, state.appConfig.mainSizeMode)];

    const { layoutId, layoutItemId } = ownProps;
    const appConfig = state && state.appConfig;
    let bbox = null;
    if (window.jimuConfig.isInBuilder) {
      const box = appConfig.layouts?.[layoutId]?.content?.[layoutItemId]?.bbox;
      bbox = {
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height
      };
    }
    return {
      bbox,
      layout,
      widgetsRuntimeInfo,
      browserSizeMode: state.browserSizeMode,
      isInBuilder: state.appContext.isInBuilder,
      appMode: state.appRuntimeInfo.appMode
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      generation: 0,
      moves: 0
    }
  }

  componentDidUpdate(prveProps: AllWidgetProps<IMConfig> & ExtraProps) {
    const { appMode: preAppMode, browserSizeMode: preBrowserSizeMode, bbox: preBbox } = prveProps;
    const { onlyOpenOne: preOnlyOpenOne, displayType: preDisplayType } = prveProps?.config.behavior || {};

    const { appMode, browserSizeMode, bbox } = this.props;
    const { onlyOpenOne, displayType } = this.props.config?.behavior || {};
    if (preOnlyOpenOne !== onlyOpenOne || displayType !== preDisplayType || appMode !== preAppMode || browserSizeMode !== preBrowserSizeMode) {
      this.setState({ generation: this.state.generation + 1 });
    }

    if (!lodash.isDeepEqual(bbox, preBbox)) {
      this.setState({ moves: this.state.moves + 1 })
    }
  }

  advancedStyle = () => {
    const { config } = this.props;
    const advanced = config?.appearance.advanced;
    if (!advanced) return css``;

    const { variants } = config?.appearance?.card || {};
    const { type = 'primary' } = config?.appearance?.card?.avatar || {};
    const styleByState = variants?.[type];
    const regular = styleByState?.default;
    const active = styleByState?.active;
    const hover = styleByState?.hover;

    return css`
      .avatar-card:not(.add-widget-btn) {
        ${regular && css`
            > .avatar {
              > .avatar-button {
                background-color: ${regular.bg};
                border-color: ${regular.bg};
              }
            }
            > .avatar-label {
              color: ${regular.color};
              font-style: ${ regular?.italic ? 'italic' : 'normal'};
              font-weight: ${ regular?.bold ? 'bold' : 'normal'};
              text-decoration: ${styleUtils.toCSSTextUnderLine({ underline: regular.underline, strike: regular.strike })};
            }
          `}
          ${hover && css`
            &:hover {
              > .avatar {
                > .avatar-button {
                  background-color: ${hover.bg};
                  border-color: ${hover.bg};
                }
              }
              > .avatar-label {
                color: ${hover.color};
                font-style: ${ hover?.italic ? 'italic' : 'normal'};
                font-weight: ${ hover?.bold ? 'bold' : 'normal'};
                text-decoration: ${styleUtils.toCSSTextUnderLine({ underline: hover.underline, strike: hover.strike })};
              }
            }
          `}
          ${active && css`
              > .avatar {
                > .avatar-button {
                  &:not(:disabled):not(.disabled):active,
                  &:not(:disabled):not(.disabled).active,
                  &[aria-expanded="true"] {
                      background-color: ${active.bg};
                      border-color: ${active.bg};
                    }
                  }
              }
              > .avatar-label {
                &:not(:disabled):not(.disabled):active,
                &:not(:disabled):not(.disabled).active {
                  color: ${active.color};
                  font-style: ${ active?.italic ? 'italic' : 'normal'};
                  font-weight: ${ active?.bold ? 'bold' : 'normal'};
                  text-decoration: ${styleUtils.toCSSTextUnderLine({ underline: active.underline, strike: active.strike })};
                }
              }
          `}
      }
    `;
  }

  getStyle = () => {
    const { config } = this.props;
    const vertical = config?.behavior?.vertical;

    return css`
      overflow: hidden;
      white-space: nowrap;
      .controller-container {
        width: 100%;
        height: 100%;
        min-width: ${!vertical ? polished.rem(MIN_WIDGET_WIDTH) : polished.rem(MIN_WIDGET_HEIGHT)};
        min-height: ${vertical ? polished.rem(MIN_WIDGET_WIDTH) : polished.rem(MIN_WIDGET_HEIGHT)};
      }
      ${this.advancedStyle()};
      ${vertical && css`
      .roll-list {
        .content {
          width: 100%;
        }
      }
      .layout-item-list {
        &.icon-list {
          width: 100%;
        }
      }
        .layout-item {
          width: 100%;
        }
        .avatar-card {
            width: 100% !important;
          }
      `};
    `;
  }

  isBuilder = () => {
    const { isInBuilder, appMode } = this.props;
    return isInBuilder && appMode !== AppMode.Run;
  }

  translate = (id: string) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] })
  }

  render() {
    const { builderSupportModules: bsm, id, config } = this.props;
    const { moves, generation } = this.state;
    const isBuilder = this.isBuilder();
    const WidgetInBuilder = isBuilder && bsm && bsm.widgetModules.WidgetInBuilder;
    return <div className="widget-controller jimu-widget shadow" css={this.getStyle()}>
      <div className="controller-container">
        {!isBuilder && <WidgetRuntime generation={this.state.generation} id={id} config={config} translate={this.translate}></WidgetRuntime>}
        {isBuilder && WidgetInBuilder && <WidgetInBuilder id={id} moves={moves} generation={generation} config={config} nls={this.translate}></WidgetInBuilder>}
      </div>
    </div>
  }
}