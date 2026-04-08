import { combineReducers, type Reducer, type Action } from "redux";
import { type IGridState, type TGridActions } from "./Grid/types";
import grid from "./Grid/reducer";
import gridItems from "./GridItems/reducer";
import { type IGridItemsState, type TGridItemActions } from "./GridItems/types";

export type TRootReducer = Reducer<
  {
    grid: IGridState;
    gridItems: IGridItemsState;
  },
  Action & TGridActions & TGridItemActions
>;
const createRootReducer = (): TRootReducer =>
  combineReducers({
    grid,
    gridItems,
  });

export default createRootReducer;
