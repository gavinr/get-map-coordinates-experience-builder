/** @jsx jsx */
import { React, css, jsx, classNames, polished } from 'jimu-core';
import { WidgetAvatarCard, AvatarCardProps } from '../common';

interface Props {
  vertical?: boolean;
  lists: string[];
  className?: string;
  style?: React.CSSProperties;
  start?: number; // start index of the content, include
  end?: number; // end index of the content, exclude
  onClick?: (widgetNode: HTMLDivElement, widgetid: string) => void;
  activeIds?: string[];
  space?: number;
  item: AvatarCardProps
}

export class IconList extends React.PureComponent<Props> {
  getStyle = () => {
    const { space, vertical } = this.props;
    const spacing = polished.rem(space);

    return css`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .avatar-card {
        &:not(:first-of-type) {
            margin-top: ${vertical ? spacing : 'unset'};
            margin-left: ${!vertical ? spacing : 'unset'};
          }
      }
    `;
  }

  filterList = (lists: string[]) => {
    const { start, end } = this.props;
    lists = lists || []
    return lists.slice(start, end);
  }

  createItem = (widgetid: string, index: number) => {
    const { item, onClick, activeIds } = this.props;

    const avatarCardProps = {
      ...item,
      avatar: {
        ...item.avatar,
        active: activeIds.indexOf(widgetid) > -1
      }
    }

    return <WidgetAvatarCard
      key={index}
      widgetid={widgetid}
      showMarker={false}
      {...avatarCardProps}
      onWidgetClick={(e) => onClick(e, widgetid)} ></WidgetAvatarCard>
  }

  render() {
    const { className, style, lists, vertical } = this.props;
    const list = this.filterList(lists);
    return <div
      css={this.getStyle()}
      style={style}
      className={classNames('icon-list', { 'flex-column': vertical }, className)}>
      {list.map((item, index) => this.createItem(item, index))}
    </div>
  }
}