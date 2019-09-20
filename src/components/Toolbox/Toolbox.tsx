import React from 'react';

import './styles/index.scss';

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';

export type TAction = typeof ADD | typeof REMOVE;
export interface IProps {
  modifyColumn: (action: TAction) => void;
  modifyRow: (action: TAction) => void;

  columns: number;
  rows: number;
}

const Toolbox: React.FC<IProps> = ({
  modifyColumn,
  modifyRow,
  columns,
  rows,
}: IProps): JSX.Element => {
  const addColumn = (): void => modifyColumn(ADD);
  const removeColumn = (): void => modifyColumn(REMOVE);
  const addRow = (): void => modifyRow(ADD);
  const removeRow = (): void => modifyRow(REMOVE);
  return (
    <div className="Toolbox">
      <span>
        {columns}, {rows}
      </span>
      <button className="Toolbox_button" disabled={false} onClick={addColumn}>
        Add Column
      </button>
      <button
        className="Toolbox_button"
        disabled={columns <= 1}
        onClick={removeColumn}>
        Delete Column
      </button>
      <button className="Toolbox_button" disabled={false} onClick={addRow}>
        Add Row
      </button>
      <button
        className="Toolbox_button"
        disabled={rows <= 1}
        onClick={removeRow}>
        Delete Row
      </button>
    </div>
  );
};

export default Toolbox;
