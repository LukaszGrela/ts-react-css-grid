import React from 'react';

import './styles/index.scss';
import { ICSSGridStyle } from '../../store/Grid/types';

export interface IProps {
  columns: number;
  rows: number;

  gridStyle: ICSSGridStyle;
}

const GridView: React.FC<IProps> = ({
  columns,
  rows,
  gridStyle,
}: IProps): JSX.Element => (
  <div className="GridView" style={{ ...gridStyle }}>
    <div className="GridView_child">1</div>
    <div className="GridView_child">2</div>
    <div className="GridView_child">3</div>
    <div className="GridView_child">4</div>
  </div>
);

export default GridView;
