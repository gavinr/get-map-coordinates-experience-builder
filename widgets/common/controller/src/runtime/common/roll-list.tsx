/** @jsx jsx */
import { React, css, jsx, classNames } from 'jimu-core';
import { Icon, Button } from 'jimu-ui';
import { ARROW_ICON_SIZE } from '../consts';

const leftIcon = require('jimu-ui/lib/icons/arrow-left-14.svg');
const rightIcon = require('jimu-ui/lib/icons/arrow-right-14.svg');
const upIcon = require('jimu-ui/lib/icons/arrow-up-14.svg');
const downIcon = require('jimu-ui/lib/icons/arrow-down-14.svg');

interface Props {
  className?: string,
  vertical?: boolean,
  disablePrevious: boolean,
  disableNext: boolean,
  showArrow: boolean,
  onArrowClick?: (previous: boolean) => any;
  children: any;
  innerRef: (ref: HTMLDivElement) => void;
  showAddWidget?: boolean;
  placeholder?: React.ReactNode;
}

export class RollList extends React.PureComponent<Props> {
  contentNoded: React.RefObject<HTMLDivElement>;
  static defaultProps: Partial<Props> = {
    vertical: false,
    onArrowClick: () => { }
  }

  getStyle = () => {
    const { vertical, showArrow } = this.props;
    return css`
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: ${!vertical ? 'row' : 'column'};
      justify-content: ${showArrow ? 'space-between' : 'center'};
      align-items: center;
      > button.icon-btn {
        &:focus {
          outline: none;
        }
        z-index: 1;
        flex-grow: 0;
        flex-shrink: 0;
        padding: ${!vertical ? '0.5rem 0.2rem' : '0.2rem 0.5rem'};
        width: ${!vertical ? `${ARROW_ICON_SIZE}px` : 'unset'};
        height: ${vertical ? `${ARROW_ICON_SIZE}px` : 'unset'};
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-grow:  0;
        flex-shrink: 1;
        flex-wrap: nowrap;
        flex-direction: ${vertical ? 'column' : 'row'};
      }
    `;
  }

  render() {
    const { vertical, className, showArrow, disablePrevious, disableNext, onArrowClick, innerRef, placeholder } = this.props;
    const startIcon = vertical ? upIcon : leftIcon;
    const endIcon = vertical ? downIcon : rightIcon;

    return <div ref={innerRef} css={this.getStyle()} className={classNames('roll-list', className)}>
      {showArrow && <Button
        icon type="tertiary"
        disabled={disablePrevious}
        onClick={() => onArrowClick(true)}>
        <Icon size={14} icon={startIcon}></Icon>
      </Button>}
      <div className="content">
        {this.props.children}
        {
          placeholder && placeholder
        }
      </div>
      {showArrow && <Button
        icon type="tertiary"
        disabled={disableNext}
        onClick={() => onArrowClick(false)}>
        <Icon size={14} icon={endIcon}></Icon>
      </Button>}
    </div >
  }
}