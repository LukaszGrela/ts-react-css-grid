import React from 'react';

import './styles/index.scss';
import NumberSpinner from '../NumberSpinner/NumberSpinner';

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';

export type TAction = typeof ADD | typeof REMOVE;
export interface IProps {
  modifyColumn: (action: TAction) => void;
  modifyRow: (action: TAction) => void;
  addGridItem: () => void;
  clearGridItems: () => void;

  changeRowGap: (newValue: number) => void;
  changeColumnGap: (newValue: number) => void;

  columns: number;
  rows: number;
  rowGap: number;
  columnGap: number;
  gridItemsLength: number;
}

const Toolbox: React.FC<IProps> = ({
  modifyColumn,
  modifyRow,
  columns,
  rows,
  addGridItem,
  clearGridItems,
  gridItemsLength,
  rowGap,
  changeRowGap,
  columnGap,
  changeColumnGap,
}: IProps): JSX.Element => {
  const addColumn = (): void => modifyColumn(ADD);
  const removeColumn = (): void => modifyColumn(REMOVE);
  const addRow = (): void => modifyRow(ADD);
  const removeRow = (): void => modifyRow(REMOVE);

  return (
    <div className="Toolbox">
      <div className="Toolbox_wrapper">
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
        <hr className="Toolbox_spacer" />
        <button
          className="Toolbox_button"
          disabled={columns * rows <= gridItemsLength && gridItemsLength !== 0}
          onClick={addGridItem}>
          Add grid item
        </button>
        <button
          className="Toolbox_button"
          disabled={gridItemsLength === 0}
          onClick={clearGridItems}>
          Remove all items
        </button>
        <hr className="Toolbox_spacer" />
        <span className="Toolbox_label">Set row gap (px)</span>
        <NumberSpinner
          disableNext={false}
          disablePrev={rowGap <= 0}
          value={rowGap}
          onChange={changeRowGap}
        />
        <span className="Toolbox_label">Set column gap (px)</span>
        <NumberSpinner
          disableNext={false}
          disablePrev={columnGap <= 0}
          value={columnGap}
          onChange={changeColumnGap}
        />
      </div>
    </div>
  );
};

export default Toolbox;
