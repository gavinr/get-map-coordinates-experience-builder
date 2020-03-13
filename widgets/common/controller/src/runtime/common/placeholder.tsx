/** @jsx jsx */
import { jsx, css, polished, ThemeVariables } from 'jimu-core'
import { Icon } from 'jimu-ui';

const addIcon = require('jimu-ui/lib/icons/add-16.svg');


export const Placeholder = ({ text, theme }: { text: string; theme: ThemeVariables }) => {
  const gray500 = theme ? theme.colors.palette.dark[200] : '';
  const style = css`
    position: absolute;
    top: 50%;
    bottom: 50%;
    left: 20px;
    display: flex;
    align-items: center;
    .placeholder-icon {
      width: ${polished.rem(40)};
      height: ${polished.rem(40)};
      border: 1px ${gray500} dashed;
      display: flex;
      align-items: center;
      justify-content: center;
      .jimu-icon {
        color: ${gray500};
      }
    }
    .placeholder-text {
      margin-left: ${polished.rem(16)};
    }
  `;

  return <div css={style} className="placeholder">
    <div className="placeholder-icon">
      <Icon icon={addIcon} size="14"></Icon>
    </div>
    <span className="placeholder-text">{text}</span>
  </div>;
};
