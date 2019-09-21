import {
  IModifyGridItemsAction,
  GRID_ITEMS_ADD,
  GRID_ITEMS_CLEAR,
  IRemoveGridItemAction,
  GRID_ITEMS_REMOVE,
} from './types';

export const addGridItem = (): IModifyGridItemsAction => ({
  type: GRID_ITEMS_ADD,
});

export const clearGridItems = (): IModifyGridItemsAction => ({
  type: GRID_ITEMS_CLEAR,
});

export const removeGridItem = (id: string): IRemoveGridItemAction => ({
  type: GRID_ITEMS_REMOVE,
  id,
});
