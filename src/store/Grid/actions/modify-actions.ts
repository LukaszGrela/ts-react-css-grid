import {
  IModifyGridAction,
  ADD_COLUMN,
  ADD_ROW,
  REMOVE_ROW,
  REMOVE_COLUMN,
} from '../types';

export const addColumn = (): IModifyGridAction => ({
  type: ADD_COLUMN,
});

export const removeColumn = (): IModifyGridAction => ({
  type: REMOVE_COLUMN,
});

export const addRow = (): IModifyGridAction => ({
  type: ADD_ROW,
});

export const removeRow = (): IModifyGridAction => ({
  type: REMOVE_ROW,
});
