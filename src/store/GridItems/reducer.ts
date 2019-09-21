import {
  IGridItemsState,
  IModifyGridItemsAction,
  IRemoveGridItemAction,
  GRID_ITEMS_ADD,
  IGridItemDescriptor,
  GRID_ITEMS_CLEAR,
} from './types';
import { randomString } from '../../utils/randomString';
import { stringToHashedColour } from '../../utils/stringToHashedColour';

const initialState: IGridItemsState = {
  items: [],
};

const generateItem = (): IGridItemDescriptor => {
  const id = randomString();
  return {
    id,
    color: stringToHashedColour(id),
    bottom: -1,
    left: -1,
    top: -1,
    right: -1,
  };
};

const reducer = (
  state = initialState,
  action: IModifyGridItemsAction & IRemoveGridItemAction
): IGridItemsState => {
  switch (action.type) {
    case GRID_ITEMS_ADD:
      return { ...state, items: [...state.items, generateItem()] };
    case GRID_ITEMS_CLEAR:
      return { ...state, items: [] };
    default:
      return { ...state };
  }
};

export default reducer;
