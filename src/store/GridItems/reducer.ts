import {
  IGridItemsState,
  IModifyGridItemsAction,
  IRemoveGridItemAction,
  GRID_ITEMS_ADD,
  IGridItemDescriptor,
  GRID_ITEMS_CLEAR,
  START_DRAG_GRID_ITEM,
  STOP_DRAG_GRID_ITEM,
  GRID_ITEMS_REPOSITION,
} from './types';
import { randomString } from '../../utils/randomString';
import { stringToHashedColour } from '../../utils/stringToHashedColour';
import * as Array2dUtils from '../../utils/2d-array-utils';
import {
  TGridActions,
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_ROW,
  REMOVE_ROW,
} from '../Grid/types';

const initialState: IGridItemsState = {
  draggedItem: undefined,
  items: [],

  columns: 10,
  rows: 6,
  grid: Array2dUtils.init(10, 6, '*'),
};

const generateItem = (coords: Array2dUtils.ICoords2D): IGridItemDescriptor => {
  const id = randomString();
  return {
    id,
    color: stringToHashedColour(id),
    left: coords.x + 1,
    top: coords.y + 1,
    cols: 1,
    rows: 1,
  };
};

const reducer = (
  state = initialState,
  action: IModifyGridItemsAction &
    IRemoveGridItemAction &
    IRemoveGridItemAction &
    TGridActions
): IGridItemsState => {
  switch (action.type) {
    case GRID_ITEMS_ADD: {
      const coords = Array2dUtils.findFirstEmpty(state.grid);
      console.log('GRID_ITEMS_ADD', coords);
      return {
        ...state,
        items: [...state.items, generateItem(coords)],
        grid: Array2dUtils.set(state.grid, coords, '1'),
      };
    }
    case GRID_ITEMS_CLEAR:
      return {
        ...state,
        items: [],
        grid: Array2dUtils.init(state.columns, state.rows, '*'),
      };

    case START_DRAG_GRID_ITEM:
      return { ...state, draggedItem: action.id };

    case STOP_DRAG_GRID_ITEM:
      return { ...state, draggedItem: undefined };

    case GRID_ITEMS_REPOSITION: {
      let oldPos: Array2dUtils.ICoords2D | undefined;
      // update an item
      const updated = {
        ...state,
        items: state.items.map(
          (descriptor): IGridItemDescriptor => {
            if (descriptor.id === action.id) {
              oldPos = {
                x: descriptor.left,
                y: descriptor.top,
              };
              descriptor.left = action.x;
              descriptor.top = action.y;
            }
            return descriptor;
          }
        ),
      };
      if (oldPos) {
        // clear an item
        try {
          updated.grid = Array2dUtils.set(updated.grid, {
            x: oldPos.x - 1,
            y: oldPos.y - 1,
          });
        } catch (error) {}
      }
      // mark an item
      updated.grid = Array2dUtils.set(
        updated.grid,
        { x: action.x - 1, y: action.y - 1 },
        '1'
      );

      return {
        ...updated,
      };
    }

    case ADD_COLUMN: {
      return {
        ...state,
        columns: state.columns + 1,
        grid: Array2dUtils.addColumn(state.grid),
      };
    }
    case REMOVE_COLUMN: {
      return {
        ...state,
        columns: Math.max(state.columns - 1, 0),
        grid: Array2dUtils.removeColumn(state.grid),
      };
    }
    case ADD_ROW: {
      return {
        ...state,
        rows: state.rows + 1,
        grid: Array2dUtils.addRow(state.grid),
      };
    }
    case REMOVE_ROW: {
      return {
        ...state,
        rows: Math.max(state.rows - 1, 0),
        grid: Array2dUtils.removeRow(state.grid),
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
