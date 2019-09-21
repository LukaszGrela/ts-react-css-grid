import {
  IModifyGridAction,
  IGridState,
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_ROW,
  REMOVE_ROW,
  ICSSGridStyle,
} from './types';

const initialState: IGridState = {
  columns: 1,
  rows: 1,
  style: {},
};

const updateStyle = (state: IGridState): ICSSGridStyle => {
  return {
    gridTemplateColumns: `repeat(${state.columns}, 1fr)`,
    gridTemplateRows: `repeat(${state.rows}, 1fr)`,
  };
};

const reducer = (
  state = initialState,
  action: IModifyGridAction
): IGridState => {
  switch (action.type) {
    case ADD_COLUMN: {
      const update = { ...state, columns: state.columns + 1 };
      return { ...update, style: { ...updateStyle(update) } };
    }
    case REMOVE_COLUMN: {
      const update = { ...state, columns: Math.max(state.columns - 1, 0) };
      return { ...update, style: { ...updateStyle(update) } };
    }
    case ADD_ROW: {
      const update = { ...state, rows: state.rows + 1 };
      return { ...update, style: { ...updateStyle(update) } };
    }
    case REMOVE_ROW: {
      const update = { ...state, rows: Math.max(state.rows - 1, 0) };
      return { ...update, style: { ...updateStyle(update) } };
    }

    default:
      return state;
  }
};

export default reducer;
