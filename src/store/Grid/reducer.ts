import {
  IModifyGridAction,
  IGridState,
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_ROW,
  REMOVE_ROW,
  ICSSGridStyle,
  IGridActions,
  SET_COLUMN_GAP,
  SET_ROW_GAP,
} from './types';

const initialState: IGridState = {
  columns: 1,
  rows: 1,

  columnGap: 0,
  rowGap: 0,

  style: {},
};

const updateStyle = (state: IGridState): ICSSGridStyle => {
  return {
    gridTemplateColumns: `repeat(${state.columns}, 1fr)`,
    gridTemplateRows: `repeat(${state.rows}, 1fr)`,
    gridColumnGap: `${state.columnGap}px`,
    gridRowGap: `${state.rowGap}px`,
  };
};

const reducer = (state = initialState, action: IGridActions): IGridState => {
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

    case SET_COLUMN_GAP: {
      const update = { ...state, columnGap: Math.max(action.value, 0) };
      return { ...update, style: { ...updateStyle(update) } };
    }
    case SET_ROW_GAP: {
      const update = { ...state, rowGap: Math.max(action.value, 0) };
      return { ...update, style: { ...updateStyle(update) } };
    }
    default:
      return state;
  }
};

export default reducer;
