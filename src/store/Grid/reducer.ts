import {
  IModifyGridAction,
  IGridState,
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_ROW,
  REMOVE_ROW,
} from './types';

const initialState: IGridState = {
  columns: 1,
  rows: 1,
};

const reducer = (
  state = initialState,
  action: IModifyGridAction
): IGridState => {
  switch (action.type) {
    case ADD_COLUMN:
      return { ...state, columns: state.columns + 1 };
    case REMOVE_COLUMN:
      return { ...state, columns: Math.max(state.columns - 1, 0) };
    case ADD_ROW:
      return { ...state, rows: state.rows + 1 };
    case REMOVE_ROW:
      return { ...state, rows: Math.max(state.rows - 1, 0) };

    default:
      return state;
  }
};

export default reducer;
