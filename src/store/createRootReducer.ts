import { combineReducers, Reducer, AnyAction } from 'redux';
import { IGridState } from './Grid/types';
import grid from './Grid/reducer';
import gridItems from './GridItems/reducer';
import { IGridItemsState } from './GridItems/types';

export type TRootReducer = Reducer<
  {
    grid: IGridState;
    gridItems: IGridItemsState;
  },
  AnyAction
>;
const createRootReducer = (): TRootReducer =>
  combineReducers({
    grid,
    gridItems,
  });

export default createRootReducer;
