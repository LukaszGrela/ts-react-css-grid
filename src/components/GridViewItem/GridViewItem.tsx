import React, { useState, useReducer } from 'react';
import { IGridItemDescriptor } from '../../store/GridItems/types';

import './styles/index.scss';
import ReactHammer, { ReactHammerProps } from 'react-hammerjs';

interface IState {
  dragging: boolean;
  translateX?: number;
  translateY?: number;
  offsetX: number;
  offsetY: number;
}
const START_DRAGGING = 'START_DRAGGING';
const STOP_DRAGGING = 'STOP_DRAGGING';
const DRAGGING = 'DRAGGING';
const RESET = 'RESET';
interface IStateAction {
  type:
    | typeof START_DRAGGING
    | typeof STOP_DRAGGING
    | typeof DRAGGING
    | typeof RESET;
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
}

const GridViewItem: React.FC<IProps> = ({
  childDescriptor,
  draggable,

  onStartDrag,
  onUpdateDrag,
  onStopDrag,
}: IProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
          dispatch(stopDragging());
          onStopDrag(childDescriptor.id, -1, -1, undefined);
        },
        onPan: (event: HammerInput) => {
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
        }`}
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
        <div className="GridViewItem_handles"></div>
        {childDescriptor.id}
      </div>
    </Wrapper>
  );
};

export default GridViewItem;
