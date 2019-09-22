import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import GridView, { IProps } from './GridView';
import { AppState } from '../../store';
import {
  dragItemStart,
  dragItemStop,
  repositionGridItem,
} from '../../store/GridItems/actions';

import { throttle } from 'lodash';

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(val, max));

type TStateProps = Pick<
  IProps,
  'columns' | 'rows' | 'gridStyle' | 'gridContent' | 'enableDragging'
>;
const mapStateToProps = (state: AppState): TStateProps => ({
  columns: state.grid.columns,
  rows: state.grid.rows,
  gridStyle: state.grid.style,

  gridContent: state.gridItems.items,

  enableDragging: true,
});
type TDispatchProps = Pick<
  IProps,
  'onStartDrag' | 'onUpdateDrag' | 'onStopDrag'
>;
const onUpdateDrag = (
  id: string,
  x: number,
  y: number,
  columns: number,
  rows: number,
  target: HTMLElement
): void => {
  const halfPadding = 8;
  const columnSize = target.offsetParent
    ? target.offsetParent.clientWidth / columns
    : 0;
  const rowSize = target.offsetParent
    ? target.offsetParent.clientHeight / rows
    : 0;
  console.log(
    'UPDATE DRAG',
    id,
    clamp(
      Math.round((x - halfPadding + columnSize / 2) / columnSize),
      1,
      columns
    ),
    clamp(Math.round((y - halfPadding + rowSize / 2) / rowSize), 1, rows)
  );
  const marker = document.getElementById('marker');
  if (marker) {
    marker.style.top = `${y}px`;
    marker.style.left = `${x}px`;
  }
};
const throttledOnUpdateDrag = throttle(onUpdateDrag, 333);
const mapDispatchToProps = (dispatch: Dispatch): TDispatchProps => ({
  onStartDrag: (id: string): void => {
    console.log('START DRAG', id);
    dispatch(dragItemStart(id));
  },
  onUpdateDrag: throttledOnUpdateDrag,
  onStopDrag: (
    id: string,
    x?: number,
    y?: number,
    columns?: number,
    rows?: number,
    target?: HTMLElement
  ): void => {
    console.log('STOP DRAG', id);
    if (target && x !== undefined && y != undefined) {
      const columnSize = target.offsetParent
        ? target.offsetParent.clientWidth / (columns || 0)
        : 0;
      const rowSize = target.offsetParent
        ? target.offsetParent.clientHeight / (rows || 0)
        : 0;
      console.log(
        'UPDATE DRAG',
        id,
        x,
        y,
        clamp(
          Math.round((x + 16 + columnSize / 2) / columnSize),
          1,
          columns || 0
        ),
        clamp(Math.round((y + 16 + rowSize / 2) / rowSize), 1, rows || 0),
        columnSize,
        rowSize
      );
      dispatch(repositionGridItem(id, x || -1, y || -1));
    }

    dispatch(dragItemStop(id));
    const marker = document.getElementById('marker');
    if (marker) {
      marker.style.top = `${0}px`;
      marker.style.left = `${0}px`;
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridView);
