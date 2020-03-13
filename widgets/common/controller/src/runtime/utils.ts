
import { WidgetInfo } from './runtime/multiple-popper';
import { IMWidgetInfo } from './runtime/widget'
import { Immutable, IMLayoutJson } from 'jimu-core';
import { ARROW_ICON_SIZE } from './consts';

export const toggleOpenedWidgets = (openedWidgets: IMWidgetInfo[], onlyOpenOne: boolean, openedWidget: WidgetInfo): IMWidgetInfo[] => {
  if (onlyOpenOne) {
    openedWidgets = updateOpenedWidgetDisplay(openedWidgets, false);
  }
  let newOpenedWidgets: IMWidgetInfo[];
  if (getOpenedWidget(openedWidgets, openedWidget.id)) {
    newOpenedWidgets = openedWidgets.filter((v: IMWidgetInfo) => {
      return v.id !== openedWidget.id;
    });
  } else {
    newOpenedWidgets = openedWidgets.concat(Immutable(openedWidget));
  }
  return newOpenedWidgets;
}

export const updateOpenedWidgetDisplay = (openedWidgets: IMWidgetInfo[], show: boolean): IMWidgetInfo[] => {
  return openedWidgets.map((v: IMWidgetInfo) => {
    return v.set('show', show);
  })
}

export const toggleOpenedWidgetsDisplay = (openedWidgets: IMWidgetInfo[], onlyOpenOne: boolean, id: string): IMWidgetInfo[] => {
  let newOpenedWidgets: IMWidgetInfo[];
  newOpenedWidgets = openedWidgets.map((v: IMWidgetInfo) => {
    if (v.id === id) {
      return v.set('show', !v.show);
    }
    return v;
  });
  if (onlyOpenOne) {
    newOpenedWidgets = newOpenedWidgets.map((v: IMWidgetInfo) => {
      if (v.id !== id) {
        return v.set('show', false);
      }
      return v;
    });
  }
  return newOpenedWidgets;
}

export const getOpenedWidget = (openedWidgets: IMWidgetInfo[], widgetId: string): IMWidgetInfo => {
  return openedWidgets.find(ow => ow.id === widgetId)
}

export const getWidgetIdsFromLayout = (layout: IMLayoutJson): string[] => {
  const content = layout.order && layout.order.asMutable() || [];
  return content.map(itemId => layout.content[itemId] && layout.content[itemId].widgetId);
}

export const getLayoutItemCounts = (layout: IMLayoutJson): number => {
  const widgets = getWidgetIdsFromLayout(layout) || [];
  return widgets.length;
}

export const getRollListLength = (width: number, height: number, vertical: boolean): number => {
  return !vertical ? width : height;
}

export const getOneScreenNumber = (length: number, unitLength: number): number => {
  return Math.floor(length / unitLength);
}

export const getListContentLength = (width: number, height: number, vertical: boolean, space: number, offset?: number) => {
  offset = offset || 0;
  const listLength = getRollListLength(width, height, vertical);
  const arrowLength = ARROW_ICON_SIZE * 2;
  return listLength + space - arrowLength - offset;
}

export const calculateStartEnd = (origin: number, number: number, reverse?: boolean): [number, number] => {
  if (number < 1) {
    number = 1; //We make sure that at least one is showing
  }
  if (!reverse) {
    const start = origin, end = start + number;
    return [start, end];
  } else {
    const end = origin;
    let start = end - number;
    start = start < 0 ? 0 : start;
    return [start, end];
  }
}

export const calculateRollListState = (start: number, end: number, counts: number): { showArrow: boolean, disablePrevious: boolean, disableNext: boolean } => {
  const showArrow = (end - start) < counts;
  const disablePrevious = start === 0;
  const disableNext = end >= counts;
  return { showArrow, disablePrevious, disableNext }
}

export const onListArrowClick = (previous: boolean, counts: number, start: number, end: number, rollOne: boolean = true): [number, number] => {
  if (!counts) {
    return [0, 1];
  }
  const oneScreenNumber = end - start;
  const number = rollOne ? 1 : oneScreenNumber;
  start = previous ? start - number : start + number;
  end = previous ? end - number : end + number;
  start = start < 0 ? 0 : start;
  return [start, end];
}

export const correctionOffset = (start: number, end: number, counts: number): [number, number] => {
  if (start < 0) {
    const offset = Math.abs(start);
    start = 0;
    end += offset;
  } else if (start + end > counts) {
    const offset = end - counts;
    start = start - offset < 0 ? 0 : start - offset;
    end = end - offset < 1 ? 1 : end - offset;
  }
  return [start, end]
}

export function  calInsertPositionForRow(boundingRect: ClientRect,
  itemRect: Partial<ClientRect>,
  childRects: Array<ClientRect & {id: string}>): {insertX: number, refId: string} {
  const centerX = itemRect.left + itemRect.width / 2;
  let result, refId;
  let found = false;
  childRects.some((rect, i) => {
    const rectX = rect.left + rect.width / 2;
    if (rectX > centerX) {
      if (i === 0) { // insert before the first item
        result = rect.left / 2;
      } else { // insert between this and previous one
        const previousItem = childRects[i - 1];
        result = (rect.left + previousItem.left + previousItem.width) / 2;
      }
      found = true;
      refId = rect.id;
    }
    return found;
  });
  if (!found) { // insert after the last one
    const lastItem = childRects[childRects.length - 1];
    result = (lastItem.left + lastItem.width + boundingRect.width) / 2;
  }
  return {
    insertX: result,
    refId
  };
}

export function  calInsertPositionForColumn(boundingRect: ClientRect,
  itemRect: Partial<ClientRect>,
  childRects: Array<ClientRect & {id: string}>): {insertY: number, refId: string} {
  const centerY = itemRect.top + itemRect.height / 2;
  let result, refId;
  let found = false;
  childRects.some((rect, i) => {
    const rectY = rect.top + rect.height / 2;
    if (rectY > centerY) {
      if (i === 0) { // insert before the first item
        result = rect.top / 2;
      } else { // insert between this and previous one
        const previousItem = childRects[i - 1];
        result = (rect.top + previousItem.top + previousItem.height) / 2;
      }
      found = true;
      refId = rect.id;
    }
    return found;
  });
  if (!found) { // insert after the last one
    const lastItem = childRects[childRects.length - 1];
    result = (lastItem.top + lastItem.height + boundingRect.height) / 2;
  }
  return {
    insertY: result,
    refId
  };
}
