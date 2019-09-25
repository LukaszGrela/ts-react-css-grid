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
  IRepositionGridItem,
  IResizeGridItem,
  GRID_ITEMS_RESIZE,
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
    IRepositionGridItem &
    IResizeGridItem &
    TGridActions
): IGridItemsState => {
  switch (action.type) {
    case GRID_ITEMS_ADD: {
      const coords = Array2dUtils.findFirst(state.grid);
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

    case GRID_ITEMS_RESIZE: {
      const match: IGridItemDescriptor | undefined = state.items.find(
        (item): boolean => item.id === action.id
      );
      const updated = {
        ...state,
      };
      if (match) {
        let oldDescriptor = {
          ...match,
        };
        // clear
        updated.grid = Array2dUtils.setBox(
          state.grid,
          oldDescriptor.left - 1,
          oldDescriptor.top - 1,
          oldDescriptor.cols,
          oldDescriptor.rows
        );
        // update descriptor
        updated.items = state.items.map(
          (descriptor): IGridItemDescriptor => {
            if (descriptor.id === action.id) {
              descriptor.left = action.x;
              descriptor.top = action.y;
              descriptor.cols = action.cols;
              descriptor.rows = action.rows;
            }
            return descriptor;
          }
        );
        // mark
        updated.grid = Array2dUtils.setBox(
          updated.grid,
          action.x - 1,
          action.y - 1,
          action.cols,
          action.rows,
          '1'
        );
      }
      return updated;
    }
    case GRID_ITEMS_REPOSITION: {
      if (
        Array2dUtils.get(state.grid, { x: action.x - 1, y: action.y - 1 }) ===
        '1'
      ) {
        // can't place here
        return { ...state };
      }
      const match: IGridItemDescriptor | undefined = state.items.find(
        (item): boolean => item.id === action.id
      );
      const updated = {
        ...state,
      };
      if (match) {
        let oldDescriptor = {
          ...match,
        };
        // clear
        updated.grid = Array2dUtils.setBox(
          state.grid,
          oldDescriptor.left - 1,
          oldDescriptor.top - 1,
          oldDescriptor.cols,
          oldDescriptor.rows
        );
        // update an item
        updated.items = state.items.map(
          (descriptor): IGridItemDescriptor => {
            if (descriptor.id === action.id) {
              descriptor.left = action.x;
              descriptor.top = action.y;
            }
            return descriptor;
          }
        );

        // mark
        updated.grid = Array2dUtils.setBox(
          updated.grid,
          action.x - 1,
          action.y - 1,
          oldDescriptor.cols,
          oldDescriptor.rows,
          '1'
        );
      }

      return updated;
    }

    case ADD_COLUMN: {
      return {
        ...state,
        columns: state.columns + 1,
        grid: Array2dUtils.addColumn(state.grid),
      };
    }
    case REMOVE_COLUMN: {
      const updated = {
        ...state,
        columns: Math.max(state.columns - 1, 0),
        grid: Array2dUtils.removeColumn(state.grid),
      };
      // scan and remove items out of bounds
      updated.items = state.items.filter((descriptor): boolean => {
        try {
          Array2dUtils.get(updated.grid, {
            x: descriptor.left - 1,
            y: descriptor.top - 1,
          });
          return true;
        } catch (error) {
          return false;
        }
      });
      return { ...updated };
    }
    case ADD_ROW: {
      return {
        ...state,
        rows: state.rows + 1,
        grid: Array2dUtils.addRow(state.grid),
      };
    }
    case REMOVE_ROW: {
      const updated = {
        ...state,
        rows: Math.max(state.rows - 1, 0),
        grid: Array2dUtils.removeRow(state.grid),
      };
      // scan and remove items out of bounds
      updated.items = state.items.filter((descriptor): boolean => {
        try {
          Array2dUtils.get(updated.grid, {
            x: descriptor.left - 1,
            y: descriptor.top - 1,
          });
          return true;
        } catch (error) {
          return false;
        }
      });
      return { ...updated };
    }

    default:
      return { ...state };
  }
};

export default reducer;
