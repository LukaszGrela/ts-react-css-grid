import { AnyAction } from 'redux';

export const ADD_COLUMN = 'grid/column/ADD';
export const REMOVE_COLUMN = 'grid/column/REMOVE';
export const ADD_ROW = 'grid/row/ADD';
export const REMOVE_ROW = 'grid/row/REMOVE';

export const SET_ROW_GAP = 'grid/gap/row/SET';
export const SET_COLUMN_GAP = 'grid/column/row/SET';

export interface IModifyGridAction extends AnyAction {
  type:
    | typeof ADD_COLUMN
    | typeof REMOVE_COLUMN
    | typeof ADD_ROW
    | typeof REMOVE_ROW;
}

export interface IChangeGridGap extends AnyAction {
  type: typeof SET_ROW_GAP | typeof SET_COLUMN_GAP;
  value: number;
}

export type IGridActions = IModifyGridAction & IChangeGridGap;

export interface ICSSGridStyle {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumnGap?: string;
  gridRowGap?: string;
}

export interface IGridState {
  rows: number;
  columns: number;

  rowGap: number;
  columnGap: number;

  style: ICSSGridStyle;
}
