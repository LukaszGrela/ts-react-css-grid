import { connect } from 'react-redux';
import GridView, { IProps } from './GridView';
import { AppState } from '../../store';

type TStateProps = Pick<
  IProps,
  'columns' | 'rows' | 'gridStyle' | 'gridContent' | 'className'
>;
const mapStateToProps = (state: AppState): TStateProps => ({
  columns: state.grid.columns,
  rows: state.grid.rows,
  gridStyle: state.grid.style,

  gridContent: state.gridItems.items.filter((item): boolean => {
    return true;
  }),

  className: '_shadow',
});

export default connect(mapStateToProps)(GridView);
