/** @jsx jsx */
import { React, css, jsx, IconResult, classNames, polished } from 'jimu-core';
import { Button, Icon, ButtonProps, ButtonSize } from 'jimu-ui';
import { WIDGET_ITEM_SIZES, LABEL_HEIGHT } from '../consts';

export type AvatarSize = ButtonSize | 'default';

export const getItemLength = (buttonSize: AvatarSize, showLabel: boolean, shape: 'circle' | 'rectangle') => {
  let size = WIDGET_ITEM_SIZES[buttonSize];
  if (showLabel) {
    size = size + LABEL_HEIGHT;
  }

  const padding = calcPadding(buttonSize, shape);
  size = size + padding * 2;
  return size;
};

const calcPadding = (buttonSize: AvatarSize, shape: 'circle' | 'rectangle'): number => {
  const circle = shape === 'circle';
  if (!circle) return 6;
  if (buttonSize === 'sm') return 4;
  if (buttonSize === 'default') return 2;
  if (buttonSize === 'lg') return 0;
}

interface MarkerProps {
  marker?: string;
  onMarkerClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export interface AvatarProps extends ButtonProps {
  shape: 'circle' | 'rectangle';
}

interface _AvatarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconResult | string;
  autoFlip?: boolean;
  label?: string;
  showLabel?: boolean;
  labelGrowth?: number;
  widgetid?: string;
  innerRef?: (ref) => void;
  avatar: AvatarProps;
}

export type AvatarCardProps = _AvatarCardProps & MarkerProps;

export const AvatarCard = (props: AvatarCardProps) => {
  const {
    label,
    className,
    title,
    widgetid,
    showLabel,
    labelGrowth = 0,
    icon,
    marker,
    onMarkerClick,
    innerRef,
    avatar,
    autoFlip,
    ...others
  } = props;

  const { shape, style, active, ...buttonProps } = avatar || {} as AvatarProps;
  const size = buttonProps?.size;

  const getStyle = React.useCallback(() => {
    const length = getItemLength(size, showLabel, shape);
    const width = length + labelGrowth;
    const padding = calcPadding(size, shape);
    return css`
      display: flex;
      align-items:center;
      flex-direction: column;
      justify-content: ${showLabel ? 'space-around' : 'center'};
      width: ${polished.rem(width)} !important;
      height: ${polished.rem(length)};
      .avatar {
        padding: ${padding}px;
        position: relative;
        text-align: center;
        .marker {
          position: absolute;
          right: 0;
          top: 0;
          padding: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .avatar-label {
        text-align: center;
        width: 100%;
        min-height: ${polished.rem(21)};
      }
    `;
  }, [size, showLabel, shape, labelGrowth])

  return <div
    {...others}
    ref={innerRef}
    css={getStyle()}
    data-widgetid={widgetid}
    className={classNames('avatar-card', className)}>
    <div className="avatar">
      {!!marker && <Button size="sm" icon onClick={onMarkerClick} className="marker">
        <Icon size={10} icon={marker}></Icon>
      </Button>}
      <Button
        icon
        active={active}
        title={title || label}
        className="avatar-button"
        {...buttonProps}
        style={{ borderRadius: shape === 'circle' ? '50%' : undefined, ...style }}>
        <Icon
          color={typeof icon !== 'string' && icon.properties?.color}
          icon={typeof icon !== 'string' ? icon.svg : icon} autoFlip={autoFlip}></Icon>
      </Button>
    </div>
    {showLabel && <div
      title={label}
      className={classNames('avatar-label text-capitalize text-truncate', { active })}>{label}</div>}
  </div>
}