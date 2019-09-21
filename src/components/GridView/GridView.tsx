import React, { ReactNode } from 'react';

import './styles/index.scss';
import { ICSSGridStyle } from '../../store/Grid/types';

export interface IProps {
  columns: number;
  rows: number;

  gridStyle: ICSSGridStyle;
  gridContent: string[];
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
            key={childDescriptor}
            style={{ backgroundColor: childDescriptor }}>
            {childDescriptor}
          </div>
        );
      }
    )}
  </div>
);

export default GridView;
