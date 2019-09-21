import { IChangeGridGap, SET_ROW_GAP, SET_COLUMN_GAP } from '../types';

export const setRowGap = (value: number): IChangeGridGap => ({
  type: SET_ROW_GAP,
  value,
});

export const setColumnGap = (value: number): IChangeGridGap => ({
  type: SET_COLUMN_GAP,
  value,
});
