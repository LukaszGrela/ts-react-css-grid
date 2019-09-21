import { connect } from 'react-redux';
import Toolbox, {
  IProps as IToolboxProps,
  TAction,
  ADD,
  REMOVE,
} from './Toolbox';
import { AppState } from '../../store';
import { Dispatch } from 'redux';
import {
  addColumn,
  removeColumn,
  addRow,
  removeRow,
  setColumnGap,
  setRowGap,
} from '../../store/Grid/actions';
import { clearGridItems, addGridItem } from '../../store/GridItems/actions';

type TStateProps = Pick<
  IToolboxProps,
  'columns' | 'rows' | 'gridItemsLength' | 'rowGap' | 'columnGap'
>;
const mapStateToProps = (state: AppState): TStateProps => ({
  columns: state.grid.columns,
  rows: state.grid.rows,
  gridItemsLength: (state.gridItems.items || []).length,
  columnGap: state.grid.columnGap,
  rowGap: state.grid.rowGap,
});

type TDispatchProps = Pick<
  IToolboxProps,
  | 'modifyColumn'
  | 'modifyRow'
  | 'addGridItem'
  | 'clearGridItems'
  | 'changeRowGap'
  | 'changeColumnGap'
>;
const mapDispatchToProps = (dispatch: Dispatch): TDispatchProps => ({
  modifyColumn: (action: TAction): void => {
    if (action === ADD) {
      dispatch(addColumn());
    } else if (action === REMOVE) {
      dispatch(removeColumn());
    }
  },
  modifyRow: (action: TAction): void => {
    if (action === ADD) {
      dispatch(addRow());
    } else if (action === REMOVE) {
      dispatch(removeRow());
    }
  },
  addGridItem: () => {
    dispatch(addGridItem());
  },
  clearGridItems: (): void => {
    dispatch(clearGridItems());
  },
  changeColumnGap: (newValue: number) => {
    dispatch(setColumnGap(newValue));
  },
  changeRowGap: (newValue: number) => {
    dispatch(setRowGap(newValue));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbox);
