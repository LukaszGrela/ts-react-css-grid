import React, { useReducer } from 'react';
import { IGridItemDescriptor } from '../../store/GridItems/types';

import './styles/index.scss';
import ReactHammer, { ReactHammerProps } from 'react-hammerjs';
import DragHandle, {
  HANDLE_PAN,
  HANDLE_TL,
  HANDLE_TR,
  HANDLE_BL,
  HANDLE_BR,
  HANDLE_TOP,
  HANDLE_BOTTOM,
  HANDLE_RIGHT,
  HANDLE_LEFT,
  TDirectionHandleType,
} from '../DragHandle/DragHandle';

interface IState {
  dragging: boolean;
  translateX?: number;
  translateY?: number;
  offsetX: number;
  offsetY: number;

  blocked: boolean;
}
const START_DRAGGING = 'START_DRAGGING';
const STOP_DRAGGING = 'STOP_DRAGGING';
const DRAGGING = 'DRAGGING';
const RESET = 'RESET';
const BLOCK_DRAGGING = 'BLOCK_DRAGGING';
interface IStateAction {
  type:
    | typeof START_DRAGGING
    | typeof STOP_DRAGGING
    | typeof DRAGGING
    | typeof RESET
    | typeof BLOCK_DRAGGING;
  translateX?: number;
  translateY?: number;
}

interface IStartDraggingAction extends IStateAction {
  offsetX: number;
  offsetY: number;
}

const startDragging = (
  translateX: number,
  translateY: number,
  offsetX: number,
  offsetY: number
): IStartDraggingAction => ({
  type: START_DRAGGING,
  translateX,
  translateY,
  offsetX,
  offsetY,
});

const stopDragging = (
  translateX?: number,
  translateY?: number
): IStateAction => ({
  type: STOP_DRAGGING,
  translateX,
  translateY,
});

const resetDragging = (): IStateAction => ({
  type: RESET,
});
const blockDragging = (): IStateAction => ({
  type: BLOCK_DRAGGING,
});

const updateDragging = (
  translateX: number,
  translateY: number
): IStateAction => ({
  type: DRAGGING,
  translateX,
  translateY,
});

const initialState: IState = {
  dragging: false,
  blocked: false,
  translateX: undefined,
  translateY: undefined,
  offsetX: 0,
  offsetY: 0,
};

const reducer = (
  state: IState,
  action: IStateAction | IStartDraggingAction
): IState => {
  switch (action.type) {
    case START_DRAGGING:
      return {
        ...initialState,
        dragging: true,
        translateX: action.translateX,
        translateY: action.translateY,
        offsetX: (action as IStartDraggingAction).offsetX,
        offsetY: (action as IStartDraggingAction).offsetY,
      };
    case DRAGGING:
      return {
        ...state,
        translateX: action.translateX,
        translateY: action.translateY,
      };
    case STOP_DRAGGING:
      return {
        ...state,
        dragging: false,
        translateX: action.translateX,
        translateY: action.translateY,
      };
    case BLOCK_DRAGGING:
      return { ...initialState, blocked: true };
    case RESET:
      return { ...initialState };
    default:
      throw new Error(`Unkown action ${action.type}`);
  }
};

export interface IProps {
  childDescriptor: IGridItemDescriptor;
  draggable: boolean;

  onStartDrag: (id: string) => void;
  onUpdateDrag: (id: string, x: number, y: number, target: HTMLElement) => void;
  onStopDrag: (
    id: string,
    x?: number,
    y?: number,
    target?: HTMLElement
  ) => void;
  onResize: (
    childDescriptor: IGridItemDescriptor,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    target?: HTMLElement | null
  ) => void;
}

const GridViewItem: React.FC<IProps> = ({
  childDescriptor,
  draggable,

  onStartDrag,
  onUpdateDrag,
  onStopDrag,
  onResize,
}: IProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateResize = (
    type: string,
    childDescriptor: IGridItemDescriptor,
    deltaX: number,
    deltaY: number,
    ow: number,
    oh: number,
    target: Element | null
  ): void => {
    let x = childDescriptor.left;
    let y = childDescriptor.top;
    let width = childDescriptor.cols;
    let height = childDescriptor.rows;
    let column = ow / childDescriptor.cols;
    let row = oh / childDescriptor.rows;
    let span: number;
    switch (type) {
      case HANDLE_RIGHT:
        // use only x and offsetWidth and columns
        if (deltaX > 0) {
          // growing
          span = Math.max(0, Math.floor((deltaX + column / 2) / column));
          width += span;
        } else {
          // shrinking
          span = Math.max(0, Math.floor((-1 * deltaX + column / 2) / column));
          width = Math.max(1, width - span);
        }
        break;
      case HANDLE_LEFT:
        if (deltaX > 0) {
          // shrinking
          span = Math.max(0, Math.floor((deltaX + column / 2) / column));
          if (width - span >= 1) {
            x += span;
            width -= span;
          }
        } else {
          // growing
          span = Math.max(0, Math.floor((-1 * deltaX + column / 2) / column));
          if (x - span >= 1) {
            x -= span;
            width += span;
          }
        }

        break;
      default:
        break;
    }
    //
    onResize(childDescriptor, x, y, width, height, target as HTMLElement);
  };

  const handleDragHandleChange = (
    type: TDirectionHandleType,
    e: HammerInput
  ): void => {
    console.log('handleDragHandleChange');
    const {
      center: { x: cx, y: cy },
      target: {
        offsetLeft: ox,
        offsetTop: oy,
        offsetHeight,
        offsetWidth,
        offsetParent,
      },
      deltaX,
      deltaY,
    } = e;
    const {
      offsetHeight: oh,
      offsetWidth: ow,
    } = (offsetParent as HTMLElement) || {
      offsetHeight: -1,
      offsetWidth: -1,
    };
    if (e.type === 'panend' || e.type === 'pancancel') {
      dispatch(resetDragging());
      if (e.type === 'pancancel') {
        onResize(childDescriptor);
      } else {
        updateResize(
          type,
          childDescriptor,
          deltaX,
          deltaY,
          ow,
          oh,
          offsetParent
        );
      }
    } else if (e.type === 'panstart') {
      dispatch(blockDragging());
    } else {
      // updateResize(type, childDescriptor, deltaX, deltaY, ow, oh, offsetParent);
    }
  };

  const Wrapper = draggable ? ReactHammer : React.Fragment;
  const props: ReactHammerProps | undefined = draggable
    ? {
        direction: 'DIRECTION_ALL',
        options: {
          recognizers: {
            pan: {
              threshold: 10,
            },
          },
        },
        onPanStart: (event: HammerInput) => {
          if (state.blocked) {
            return;
          }
          const { target, center, deltaX, deltaY } = event;

          const offsetX = center.x - target.offsetLeft - deltaX;
          const offsetY = center.y - target.offsetTop - deltaY;

          dispatch(
            startDragging(
              center.x - target.offsetLeft - offsetX,
              center.y - target.offsetTop - offsetY,
              center.x - target.offsetLeft - deltaX,
              center.y - target.offsetTop - deltaY
            )
          );

          onStartDrag(childDescriptor.id);
          onUpdateDrag(
            childDescriptor.id,
            center.x /*  - target.offsetLeft - offsetX*/,
            center.y /*  - target.offsetTop - offsetY*/,
            target
          );
        },
        onPanEnd: (event: HammerInput) => {
          if (state.blocked) {
            return;
          }
          if (!state.dragging) {
            return;
          }
          const { target, center } = event;
          dispatch(
            stopDragging(
              center.x - target.offsetLeft - state.offsetX,
              center.y - target.offsetTop - state.offsetY
            )
          );
          onUpdateDrag(
            childDescriptor.id,
            center.x /*  - target.offsetLeft - state.offsetX */,
            center.y /*  - target.offsetTop - state.offsetY */,
            target
          );
          dispatch(resetDragging());
          onStopDrag(
            childDescriptor.id,
            center.x /* - target.offsetLeft - state.offsetX */,
            center.y /*  - target.offsetTop  - state.offsetY */,
            target
          );
        },
        onPanCancel: (event: HammerInput) => {
          if (state.blocked) {
            return;
          }
          if (!state.dragging) {
            return;
          }
          dispatch(stopDragging());
          onStopDrag(childDescriptor.id, -1, -1, undefined);
        },
        onPan: (event: HammerInput) => {
          if (state.blocked) {
            return;
          }
          if (!state.dragging) {
            return;
          }
          const { target, center } = event;
          dispatch(
            updateDragging(
              center.x - target.offsetLeft - state.offsetX,
              center.y - target.offsetTop - state.offsetY
            )
          );
          onUpdateDrag(
            childDescriptor.id,
            center.x /* - target.offsetLeft   - state.offsetX*/,
            center.y /*  - target.offsetTop  - state.offsetY*/,
            target
          );
        },
      }
    : undefined;
  return (
    <Wrapper {...(props || {})}>
      <div
        className={`GridViewItem${draggable ? ' GridViewItem--draggable' : ''}${
          state.dragging ? ' GridViewItem--dragged' : ''
        }
        ${state.blocked ? ' GridViewItem--with-handle' : ''}`}
        key={childDescriptor.id}
        style={
          draggable
            ? {
                backgroundColor: childDescriptor.color,
                ...(childDescriptor.left > 0
                  ? {
                      gridColumn: `${childDescriptor.left} / span ${childDescriptor.cols}`,
                      gridRow: `${childDescriptor.top} / span ${childDescriptor.rows}`,
                    }
                  : {}),
                ...(state.translateY === undefined ||
                state.translateX === undefined
                  ? {}
                  : {
                      transform: `translate3d(${state.translateX}px,${state.translateY}px,0px)`,
                    }),
              }
            : {
                ...(childDescriptor.left > 0
                  ? {
                      gridColumn: `${childDescriptor.left} / span ${childDescriptor.cols}`,
                      gridRow: `${childDescriptor.top} / span ${childDescriptor.rows}`,
                    }
                  : {}),
              }
        }>
        <DragHandle type={HANDLE_PAN} />
        <DragHandle type={HANDLE_TL} onChange={handleDragHandleChange} />
        <DragHandle type={HANDLE_TR} onChange={handleDragHandleChange} />
        <DragHandle type={HANDLE_BL} onChange={handleDragHandleChange} />
        <DragHandle type={HANDLE_BR} onChange={handleDragHandleChange} />

        <DragHandle type={HANDLE_TOP} onChange={handleDragHandleChange} />
        <DragHandle type={HANDLE_BOTTOM} onChange={handleDragHandleChange} />

        <DragHandle type={HANDLE_RIGHT} onChange={handleDragHandleChange} />
        <DragHandle type={HANDLE_LEFT} onChange={handleDragHandleChange} />
        {childDescriptor.id}
      </div>
    </Wrapper>
  );
};

export default GridViewItem;
