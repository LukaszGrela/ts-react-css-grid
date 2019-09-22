import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import GridView, { IProps } from './GridView';
import { AppState } from '../../store';
import {
  dragItemStart,
  dragItemStop,
  repositionGridItem,
  dragItemUpdate,
} from '../../store/GridItems/actions';

import { throttle } from 'lodash';
import { ICoords2D } from '../../utils/2d-array-utils';

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
const convertToGridCoords = (
  x: number,
  y: number,
  columns: number,
  rows: number,
  columnSize: number,
  rowSize: number
): ICoords2D => {
  const halfPadding = 8;

  const gridX = clamp(
    Math.round((x - halfPadding + columnSize / 2) / columnSize),
    1,
    columns
  );
  const gridY = clamp(
    Math.round((y - halfPadding + rowSize / 2) / rowSize),
    1,
    rows
  );
  return { x: gridX, y: gridY };
};
const onUpdateDrag = (
  dispatch: Dispatch,
  id: string,
  x: number,
  y: number,
  columns: number,
  rows: number,
  target: HTMLElement
): void => {
  const columnSize = target.offsetParent
    ? target.offsetParent.clientWidth / columns
    : 0;
  const rowSize = target.offsetParent
    ? target.offsetParent.clientHeight / rows
    : 0;
  const coords = convertToGridCoords(x, y, columns, rows, columnSize, rowSize);
  console.log('UPDATE DRAG', id, coords.x, coords.y);
  const marker = document.getElementById('marker');
  if (marker) {
    marker.style.top = `${y}px`;
    marker.style.left = `${x}px`;
  }
  dispatch(dragItemUpdate(id, coords.x, coords.y));
};
const throttledOnUpdateDrag = throttle(onUpdateDrag, 333, { trailing: false });
const mapDispatchToProps = (dispatch: Dispatch): TDispatchProps => ({
  onStartDrag: (id: string): void => {
    console.log('START DRAG', id);
    dispatch(dragItemStart(id));
  },
  onUpdateDrag: (
    id: string,
    x: number,
    y: number,
    columns: number,
    rows: number,
    target: HTMLElement
  ): void => {
    throttledOnUpdateDrag(dispatch, id, x, y, columns, rows, target);
  },
  onStopDrag: (
    id: string,
    x?: number,
    y?: number,
    columns?: number,
    rows?: number,
    target?: HTMLElement
  ): void => {
    console.log('STOP DRAG', id);
    if (
      target &&
      x !== undefined &&
      y != undefined &&
      columns !== undefined &&
      rows != undefined
    ) {
      const columnSize = target.offsetParent
        ? target.offsetParent.clientWidth / columns
        : 0;
      const rowSize = target.offsetParent
        ? target.offsetParent.clientHeight / rows
        : 0;
      const coords = convertToGridCoords(
        x,
        y,
        columns,
        rows,
        columnSize,
        rowSize
      );
      dispatch(repositionGridItem(id, coords.x, coords.y));
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
