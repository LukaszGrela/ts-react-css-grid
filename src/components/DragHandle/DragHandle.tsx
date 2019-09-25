import React from 'react';
import './styles/index.scss';
import ReactHammer, { ReactHammerProps } from 'react-hammerjs';

export const HANDLE_PAN = 'pan';
export const HANDLE_TL = 'tl';
export const HANDLE_BL = 'bl';
export const HANDLE_TR = 'tr';
export const HANDLE_BR = 'br';
export const HANDLE_TOP = 'top';
export const HANDLE_BOTTOM = 'bottom';
export const HANDLE_RIGHT = 'right';
export const HANDLE_LEFT = 'left';

export type TDirectionHandleType =
  | typeof HANDLE_PAN
  | typeof HANDLE_TOP
  | typeof HANDLE_BOTTOM
  | typeof HANDLE_RIGHT
  | typeof HANDLE_LEFT
  | typeof HANDLE_TL
  | typeof HANDLE_BL
  | typeof HANDLE_TR
  | typeof HANDLE_BR;

type TDirection =
  | 'DIRECTION_NONE'
  | 'DIRECTION_LEFT'
  | 'DIRECTION_RIGHT'
  | 'DIRECTION_UP'
  | 'DIRECTION_DOWN'
  | 'DIRECTION_HORIZONTAL'
  | 'DIRECTION_VERTICAL'
  | 'DIRECTION_ALL';
export interface IProps {
  type: TDirectionHandleType;

  onChange?: (type: TDirectionHandleType, e: HammerInput) => void;
}

const getDirection = (type: TDirectionHandleType): TDirection => {
  switch (type) {
    case HANDLE_PAN:
      return 'DIRECTION_ALL';
    case HANDLE_TOP:
    case HANDLE_BOTTOM:
      return 'DIRECTION_VERTICAL';
    case HANDLE_RIGHT:
    case HANDLE_LEFT:
      return 'DIRECTION_HORIZONTAL';
    case HANDLE_TL:
    case HANDLE_TR:
    case HANDLE_BL:
    case HANDLE_BR:
      return 'DIRECTION_ALL';
    default:
      return 'DIRECTION_NONE';
  }
};
const DragHandle: React.FC<IProps> = (props: IProps): JSX.Element => {
  const Wrapper = props.onChange ? ReactHammer : React.Fragment;
  const settings: ReactHammerProps = props.onChange
    ? {
        direction: getDirection(props.type),
        onPanStart: (e: HammerInput): void => {
          if (props.onChange) {
            props.onChange(props.type, e);
          }
        },
        onPan: (e: HammerInput): void => {
          if (props.onChange) {
            props.onChange(props.type, e);
          }
        },
        onPanCancel: (e: HammerInput): void => {
          if (props.onChange) {
            props.onChange(props.type, e);
          }
        },
        onPanEnd: (e: HammerInput): void => {
          if (props.onChange) {
            props.onChange(props.type, e);
          }
        },
      }
    : {};
  return (
    <Wrapper {...settings}>
      <div className={`DragHandle DragHandle--${props.type}`}></div>
    </Wrapper>
  );
};

export default DragHandle;
