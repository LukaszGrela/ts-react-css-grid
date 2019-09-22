import {
  IDragGridItemAction,
  START_DRAG_GRID_ITEM,
  STOP_DRAG_GRID_ITEM,
  UPDATE_DRAG_GRID_ITEM,
} from '../types';

export const dragItemStart = (id: string): IDragGridItemAction => ({
  type: START_DRAG_GRID_ITEM,
  id,
});

export const dragItemStop = (id: string): IDragGridItemAction => ({
  type: STOP_DRAG_GRID_ITEM,
  id,
});

export const dragItemUpdate = (
  id: string,
  x: number,
  y: number
): IDragGridItemAction => ({
  type: UPDATE_DRAG_GRID_ITEM,
  id,
  x,
  y,
});
