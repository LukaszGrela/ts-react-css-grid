import { combineReducers, Reducer, AnyAction } from 'redux';
import { IGridState } from './Grid/types';
import grid from './Grid/reducer';

export type TRootReducer = Reducer<
  {
    grid: IGridState;
  },
  AnyAction
>;
const createRootReducer = (): TRootReducer =>
  combineReducers({
    grid,
  });

export default createRootReducer;
