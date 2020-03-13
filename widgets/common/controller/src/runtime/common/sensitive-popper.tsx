import { React, ReactRedux, BrowserSizeMode, IMState } from 'jimu-core';
import { Popper, PopperProps } from 'jimu-ui';

interface ExtraProps {
  pageId: string;
  sizemode: BrowserSizeMode;
  dispatch?: any;
}

class _SensitivePopper extends React.PureComponent<PopperProps & { onRequestClose?: () => void } & ExtraProps> {
  componentDidUpdate(prevProps: PopperProps & ExtraProps) {
    if (this.props.onRequestClose && this.props.pageId !== prevProps.pageId || this.props.sizemode !== prevProps.sizemode) {
      this.props.onRequestClose();
    }
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pageId, sizemode, onRequestClose, dispatch, ...others } = this.props;
    return <Popper {...others} />;
  }
}

function mapStateToProps(state: IMState): ExtraProps {
  return {
    pageId: state.appRuntimeInfo.currentPageId,
    sizemode: state.browserSizeMode,
  };
}

export const SensitivePopper = ReactRedux.connect<ExtraProps, {}, PopperProps>(mapStateToProps)(_SensitivePopper);
