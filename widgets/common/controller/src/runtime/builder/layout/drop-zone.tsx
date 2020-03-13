/** @jsx jsx */
import { React, css, jsx, classNames, IMSizeModeLayoutJson, LayoutItemConstructorProps, IMLayoutJson, polished } from 'jimu-core';
import { DropArea } from 'jimu-layouts/layout-builder';
import * as SVG from 'svg.js';
import { relativeClientRect } from 'jimu-layouts/common';
import { calInsertPositionForRow, calInsertPositionForColumn } from '../../utils';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: {
    color: string;
    size: number[]
  }
  vertical?: boolean;
  childClass: string;
  layout: IMLayoutJson;
  layouts: IMSizeModeLayoutJson;
  addWidgetToLayout: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, insertIndex: number) => void;
  innerRef?: (ref: HTMLDivElement) => void;
}

interface State {
  dragover?: boolean;
}
//Drag and create a widget to the specified `layout`
export class DrapZone extends React.PureComponent<Props, State> {
  domNode: HTMLDivElement;
  childRects: Array<ClientRect & { id: string }>;
  referenceId: string;
  dropArea: SVG.Rect;
  overlayNode: React.RefObject<HTMLDivElement>;
  overlay: SVG.Doc;

  constructor(props) {
    super(props);
    this.overlayNode = React.createRef();
    this.state = {
      dragover: false
    }
    this.onDragOver = this.onDragOver.bind(this);
    this.toggleDragoverEffect = this.toggleDragoverEffect.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    this.overlay = SVG(this.overlayNode.current);
  }

  getStyle = () => {
    return css`
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      background: transparent;
      z-index: 0;
    `;
  }

  getOverlayStyle = () => {
    return css`
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      background: transparent;
      z-index: -1;
      &.hide {
        display: none;
      }
    `;
  }

  getloadingStyle = () => {
    return css`
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      z-index: 1;
    `;
  }

  collectBounds() {
    const { layout, vertical, childClass } = this.props;

    this.childRects = [];

    const domRect: ClientRect | DOMRect = this.domNode.getBoundingClientRect();
    const children = this.domNode.parentNode.querySelectorAll(`.${childClass}`);

    if (children && children.length) {
      children.forEach((node) => {
        const itemId = node.getAttribute('data-layoutitemid');
        if (layout.order && layout.order.indexOf(itemId) >= 0) {
          const rect = relativeClientRect(node.getBoundingClientRect(), domRect);
          rect.id = itemId;
          this.childRects.push(rect);
        }
      });
    }

    if (!vertical) {
      this.childRects.sort((a, b) => a.left - b.left);
    } else {
      this.childRects.sort((a, b) => a.top - b.top);
    }
  }

  toggleDragoverEffect(value: boolean) {
    if (value) {
      this.referenceId = null;
      this.collectBounds();
    }
    this.setState({ dragover: value });
  }

  onDragOver(a, b, containerRect: Partial<ClientRect>, itemRect: Partial<ClientRect>) {
    let rect = itemRect;
    const childRects = this.childRects;
    const { vertical, placeholder: { color, size: [long, short] } } = this.props

    const height = this.domNode.offsetHeight;
    const width = this.domNode.offsetWidth;

    if (childRects && childRects.length) {
      if (!vertical) {
        const { insertX, refId } = calInsertPositionForRow(containerRect as ClientRect, rect, childRects);
        this.referenceId = refId;
        rect = {
          left: insertX - short / 2 + this.domNode.scrollLeft,
          width: short,
          top: (height - long) / 2 + this.domNode.scrollTop,
          height: long,
        };
      } else {
        const { insertY, refId } = calInsertPositionForColumn(containerRect as ClientRect, rect, childRects);
        this.referenceId = refId;
        rect = {
          top: insertY - long / 2 + this.domNode.scrollTop,
          width: long,
          left: (width - long) / 2 + this.domNode.scrollLeft,
          height: short,
        };
      }
    } else {
      if (!vertical) {
        rect = {
          left: containerRect.width / 2 - short / 2,
          width: short,
          top: (height - long) / 2 + this.domNode.scrollTop,
          height: long,
        };
      } else {
        rect = {
          top: containerRect.height / 2 - short / 2,
          width: long,
          left: short / 2,
          height: short,
        };
      }
    }

    if (!this.dropArea) {
      this.dropArea = this.overlay
        .rect(rect.width, rect.height)
        .fill(polished.rgba(color, 1))
        .stroke('none')
        .attr({
          x: rect.left,
          y: rect.top,
        });
    } else {
      this.dropArea.move(rect.left, rect.top).size(rect.width, rect.height);
      if (!this.dropArea.visible()) {
        this.dropArea.show();
      }
    }
  }

  onDrop(draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect) {
    if (this.dropArea) {
      this.dropArea.hide();
    }
    const { layout } = this.props;

    let insertIndex = 0;
    if (this.referenceId) {
      insertIndex = (layout.order && layout.order.indexOf(this.referenceId)) || 0;
    } else if (layout.order) {
      insertIndex = layout.order.length;
    }

    this.props.addWidgetToLayout(draggingItem, containerRect, itemRect, insertIndex);

    this.referenceId = null;
    this.childRects = [];
  }

  setRef(ref: HTMLDivElement) {
    this.domNode = ref;
    if (this.props.innerRef) {
      this.props.innerRef(ref);
    }
  }

  render() {
    const { className, style, layouts } = this.props;
    const { dragover } = this.state;

    return <React.Fragment>
      <DropArea
        css={this.getStyle()}
        style={style}
        className={classNames('drop-zone', className)}
        innerRef={this.setRef}
        layouts={layouts}
        highlightDragover={true}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
        onToggleDragoverEffect={this.toggleDragoverEffect}
      >
      </DropArea>
      <div css={this.getOverlayStyle()} className={classNames({ hide: !dragover })} ref={this.overlayNode} />
    </React.Fragment>
  }
}
