import React from 'react';

import './styles/index.scss';

export const ADD = 1;
export const REMOVE = -1;
export const NONE = 0;

export type TDirection = typeof ADD | typeof NONE | typeof REMOVE;

export interface IProps {
  disableNext: boolean;
  disablePrev: boolean;

  value: number;

  onChange: (value: number, dir: TDirection) => void;
}
const NumberSpinner: React.FC<IProps> = ({
  disableNext,
  disablePrev,
  value,
  onChange,
}: IProps): JSX.Element => {
  return (
    <div className="NumberSpinner">
      <button
        className="NumberSpinner_button"
        disabled={disablePrev}
        onClick={(): void => {
          onChange(value - 1, REMOVE);
        }}>
        -
      </button>
      <span className="NumberSpinner_label">{value || 0}</span>
      <button
        className="NumberSpinner_button"
        disabled={disableNext}
        onClick={(): void => {
          onChange(value + 1, ADD);
        }}>
        +
      </button>
    </div>
  );
};

export default NumberSpinner;
