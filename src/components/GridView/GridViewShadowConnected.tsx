import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GridView, { IProps } from './GridView';
import { AppState } from '../../store';
import { IGridItemDescriptor } from '../../store/GridItems/types';

type TStateProps = Pick<
  IProps,
  'columns' | 'rows' | 'gridStyle' | 'gridContent' | 'className'
>;
const mapStateToProps = (state: AppState): TStateProps => ({
  columns: state.grid.columns,
  rows: state.grid.rows,
  gridStyle: state.grid.style,

  gridContent: state.gridItems.items.filter((item): boolean => {
    return item.id === state.gridItems.draggedItem;
  }),

  className: '_shadow',
});
type TDispatchProps = Pick<
  IProps,
  'onStartDrag' | 'onUpdateDrag' | 'onStopDrag' | 'onResize'
>;
const mapDispatchToProps = (dispatch: Dispatch): TDispatchProps => ({
  onStartDrag: (id: string): void => {},
  onUpdateDrag: (id: string, x: number, y: number): void => {},
  onStopDrag: (id: string): void => {},
  onResize: (descriptor: IGridItemDescriptor): void => {},
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridView);
