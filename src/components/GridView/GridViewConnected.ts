import { connect } from 'react-redux';
import GridView, { IProps } from './GridView';
import { AppState } from '../../store';

type TStateProps = Pick<IProps, 'columns' | 'rows' | 'gridStyle'>;
const mapStateToProps = (state: AppState): TStateProps => ({
  columns: state.grid.columns,
  rows: state.grid.rows,
  gridStyle: state.grid.style,
});

export default connect(mapStateToProps)(GridView);
