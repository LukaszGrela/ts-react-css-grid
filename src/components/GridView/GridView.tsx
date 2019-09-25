import React, { ReactNode } from 'react';

import './styles/index.scss';
import { ICSSGridStyle } from '../../store/Grid/types';
import { IGridItemDescriptor } from '../../store/GridItems/types';
import GridViewItem from '../GridViewItem/GridViewItem';

export interface IProps {
  className?: string;

  enableDragging?: boolean;

  columns: number;
  rows: number;

  gridStyle: ICSSGridStyle;
  gridContent: IGridItemDescriptor[];

  onStartDrag: (id: string) => void;
  onUpdateDrag: (
    id: string,
    x: number,
    y: number,
    columns: number,
    rows: number,
    target: HTMLElement
  ) => void;
  onStopDrag: (
    id: string,
    x?: number,
    y?: number,
    columns?: number,
    rows?: number,
    target?: HTMLElement
  ) => void;
  onResize: (
    descriptor: IGridItemDescriptor,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    target?: HTMLElement | null
  ) => void;
}

const GridView: React.FC<IProps> = ({
  className,
  enableDragging,
  columns,
  rows,
  gridStyle,
  gridContent,
  onStartDrag,
  onUpdateDrag,
  onStopDrag,
  onResize,
}: IProps): JSX.Element => (
  <div
    className={`GridView${className ? ` GridView${className}` : ''}`}
    style={{ ...gridStyle }}>
    {gridContent.map(
      (childDescriptor): ReactNode => {
        return (
          <GridViewItem
            key={childDescriptor.id}
            childDescriptor={childDescriptor}
            draggable={enableDragging === true}
            onStartDrag={onStartDrag}
            onUpdateDrag={(
              id: string,
              x: number,
              y: number,
              target: HTMLElement
            ) => {
              onUpdateDrag(id, x, y, columns, rows, target);
            }}
            onStopDrag={(
              id: string,
              x?: number,
              y?: number,
              target?: HTMLElement
            ) => {
              onStopDrag(id, x, y, columns, rows, target);
            }}
            onResize={(
              descriptor: IGridItemDescriptor,
              x?: number,
              y?: number,
              width?: number,
              height?: number,
              target?: HTMLElement | null
            ): void => {
              console.log(descriptor.id, x, y, width, height, target);
              onResize(descriptor, x, y, width, height, target);
            }}
          />
        );
      }
    )}
  </div>
);

export default GridView;
