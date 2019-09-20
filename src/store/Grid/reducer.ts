import { IModifyGridAction, IGridState } from './types';

const initialState: IGridState = {
  columns: 1,
  rows: 1,
};

const reducer = (
  state = initialState,
  action: IModifyGridAction
): IGridState => {
  return state;
};

export default reducer;
