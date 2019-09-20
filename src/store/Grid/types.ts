import { AnyAction } from 'redux';

export const ADD_COLUMN = 'grid/column/ADD';
export const REMOVE_COLUMN = 'grid/column/REMOVE';
export const ADD_ROW = 'grid/row/ADD';
export const REMOVE_ROW = 'grid/row/REMOVE';

export interface IModifyGridAction extends AnyAction {
  type:
    | typeof ADD_COLUMN
    | typeof REMOVE_COLUMN
    | typeof ADD_ROW
    | typeof REMOVE_ROW;
}

export interface IGridState {
  rows: number;
  columns: number;
}
