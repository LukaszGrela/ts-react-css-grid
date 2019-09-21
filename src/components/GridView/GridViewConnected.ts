import { connect } from 'react-redux';
import GridView, { IProps } from './GridView';
import { AppState } from '../../store';
import { stringToHashedColour } from '../../utils/stringToHashedColour';

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
