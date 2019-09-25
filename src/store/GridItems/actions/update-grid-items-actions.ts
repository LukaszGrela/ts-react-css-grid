import {
  IModifyGridItemsAction,
  GRID_ITEMS_ADD,
  GRID_ITEMS_CLEAR,
  IRemoveGridItemAction,
  GRID_ITEMS_REMOVE,
  IRepositionGridItem,
  GRID_ITEMS_REPOSITION,
  GRID_ITEMS_RESIZE,
  IResizeGridItem,
} from '../types';

export const addGridItem = (): IModifyGridItemsAction => ({
  type: GRID_ITEMS_ADD,
});

export const clearGridItems = (): IModifyGridItemsAction => ({
  type: GRID_ITEMS_CLEAR,
});

export const removeGridItem = (id: string): IRemoveGridItemAction => ({
  type: GRID_ITEMS_REMOVE,
  id,
});

export const repositionGridItem = (
  id: string,
  x: number,
  y: number
): IRepositionGridItem => ({
  type: GRID_ITEMS_REPOSITION,
  id,
  x,
  y,
});

export const resizeGridItem = (
  id: string,
  x: number,
  y: number,
  cols: number,
  rows: number
): IResizeGridItem => ({
  type: GRID_ITEMS_RESIZE,
  id,
  x,
  y,
  cols,
  rows,
});
