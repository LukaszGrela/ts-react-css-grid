import React, { ReactNode } from 'react';

import './styles/index.scss';
import { ICSSGridStyle } from '../../store/Grid/types';
import { IGridItemDescriptor } from '../../store/GridItems/types';

export interface IProps {
  columns: number;
  rows: number;

  gridStyle: ICSSGridStyle;
  gridContent: IGridItemDescriptor[];
}

const GridView: React.FC<IProps> = ({
  columns,
  rows,
  gridStyle,
  gridContent,
}: IProps): JSX.Element => (
  <div className="GridView" style={{ ...gridStyle }}>
    {gridContent.map(
      (childDescriptor): ReactNode => {
        return (
          <div
            className="GridView_child"
            key={childDescriptor.id}
            style={{ backgroundColor: childDescriptor.color }}>
            {childDescriptor.id}
          </div>
        );
      }
    )}
  </div>
);

export default GridView;
