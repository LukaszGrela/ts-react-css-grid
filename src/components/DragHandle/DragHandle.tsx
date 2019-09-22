import React from 'react';
import './styles/index.scss';

export const HANDLE_PAN = 'pan';
export const HANDLE_TL = 'tl';
export const HANDLE_BL = 'bl';
export const HANDLE_TR = 'tr';
export const HANDLE_BR = 'br';
export const HANDLE_TOP = 'top';
export const HANDLE_BOTTOM = 'bottom';
export const HANDLE_RIGHT = 'right';
export const HANDLE_LEFT = 'left';

export interface IProps {
  type:
    | typeof HANDLE_PAN
    | typeof HANDLE_TOP
    | typeof HANDLE_BOTTOM
    | typeof HANDLE_RIGHT
    | typeof HANDLE_LEFT
    | typeof HANDLE_TL
    | typeof HANDLE_BL
    | typeof HANDLE_TR
    | typeof HANDLE_BR;
}

const DragHandle: React.FC<IProps> = (props: IProps): JSX.Element => (
  <div className={`DragHandle DragHandle--${props.type}`}></div>
);

export default DragHandle;
