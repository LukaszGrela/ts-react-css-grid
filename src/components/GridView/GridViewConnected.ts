import { connect } from 'react-redux';
import GridView, { IProps } from './GridView';
import { AppState } from '../../store';

type TStateProps = Pick<
  IProps,
  'columns' | 'rows' | 'gridStyle' | 'gridContent'
>;
const mapStateToProps = (state: AppState): TStateProps => ({
  columns: state.grid.columns,
  rows: state.grid.rows,
  gridStyle: state.grid.style,

  gridContent: state.gridItems.items,
});

export default connect(mapStateToProps)(GridView);
