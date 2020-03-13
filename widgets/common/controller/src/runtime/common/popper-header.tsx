/** @jsx jsx */
import { jsx, css, polished, ThemeVariables } from 'jimu-core'
import { Icon } from 'jimu-ui';

const closeIcon = require('jimu-ui/lib/icons/close-16.svg');

interface Props {
  className?: string;
  onClose?: () => void;
  theme: ThemeVariables;
  text: string;
}

export const PopperHeader = ({ className, theme, onClose, text }: Props) => {
  const primary600 = theme ? theme.colors.palette.primary[600] : '';
  const white = theme ? theme.colors.white : '';

  const style = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${polished.rem(48)};
    user-select: none;
    touch-action: none;
    background: ${primary600};
    padding: ${polished.rem(13)} ${polished.rem(20)};
    color: ${white};
    > span {
      margin-right:${polished.rem(20)};
    }
    .close-div {
      cursor: pointer;
    }
  `;

  return <div css={style} className={className}>
    <span className="title text-truncate" title={text}>{text}</span>
    <div className="close-div" onClick={onClose}>
      <Icon icon={closeIcon} size="16" />
    </div>
  </div>;
};
