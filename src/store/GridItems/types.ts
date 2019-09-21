import { AnyAction } from 'redux';

export const GRID_ITEMS_ADD = 'grid/items/ADD';
export const GRID_ITEMS_CLEAR = 'grid/items/CLEAR';
export const GRID_ITEMS_REMOVE = 'grid/items/REMOVE';

export interface IModifyGridItemsAction extends AnyAction {
  type:
    | typeof GRID_ITEMS_ADD
    | typeof GRID_ITEMS_CLEAR
    | typeof GRID_ITEMS_REMOVE;
}

export interface IRemoveGridItemAction extends IModifyGridItemsAction {
  id: string;
}

export interface IGridItemDescriptor {
  id: string;
  color: string;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface IGridItemsState {
  items: IGridItemDescriptor[];
}
