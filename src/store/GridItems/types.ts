import { AnyAction } from 'redux';

export const GRID_ITEMS_ADD = 'grid/items/ADD';
export const GRID_ITEMS_CLEAR = 'grid/items/CLEAR';
export const GRID_ITEMS_REMOVE = 'grid/items/REMOVE';

export const START_DRAG_GRID_ITEM = 'grid/item/drag/START';
export const UPDATE_DRAG_GRID_ITEM = 'grid/item/drag/UPDATE';
export const STOP_DRAG_GRID_ITEM = 'grid/item/drag/STOP';

export const GRID_ITEMS_REPOSITION = 'grid/item/drag/REPOSITION';

export interface IModifyGridItemsAction extends AnyAction {
  type:
    | typeof GRID_ITEMS_ADD
    | typeof GRID_ITEMS_CLEAR
    | typeof GRID_ITEMS_REMOVE
    | typeof START_DRAG_GRID_ITEM
    | typeof UPDATE_DRAG_GRID_ITEM
    | typeof GRID_ITEMS_REPOSITION
    | typeof STOP_DRAG_GRID_ITEM;
}

export interface IRemoveGridItemAction extends IModifyGridItemsAction {
  id: string;
}

export interface IDragGridItemAction extends IModifyGridItemsAction {
  id: string;
  x?: number;
  y?: number;
}

export interface IRepositionGridItem extends IModifyGridItemsAction {
  id: string;
  x?: number;
  y?: number;
}
export interface IGridItemDescriptor {
  id: string;
  color: string;
  top: number;
  left: number;
  cols: number;
  rows: number;
}

export interface IGridItemsState {
  draggedItem?: string;
  items: IGridItemDescriptor[];

  grid: string;
  columns: number;
  rows: number;
}
