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
} from '../../store/Grid/actions';

type TStateProps = Pick<IToolboxProps, 'columns' | 'rows'>;
const mapStateToProps = (state: AppState): TStateProps => ({
  columns: state.grid.columns,
  rows: state.grid.rows,
});

type TDispatchProps = Pick<IToolboxProps, 'modifyColumn' | 'modifyRow'>;
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbox);
