import { combineReducers, Reducer, AnyAction } from "redux";
import { IGridState, TGridActions } from "./Grid/types";
import grid from "./Grid/reducer";
import gridItems from "./GridItems/reducer";
import { IGridItemsState, TGridItemActions } from "./GridItems/types";

export type TRootReducer = Reducer<
  {
    grid: IGridState;
    gridItems: IGridItemsState;
  },
  AnyAction & TGridActions & TGridItemActions
>;
const createRootReducer = (): TRootReducer =>
  combineReducers({
    grid,
    gridItems,
  });

export default createRootReducer;
