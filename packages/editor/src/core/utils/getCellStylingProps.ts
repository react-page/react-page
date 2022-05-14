import type { Cell, CellPlugin, DataTType } from '../types';

import classNames from 'classnames';

export const getCellInnerDivStyle = (
  cell: Cell | null,
  plugin: CellPlugin | null,
  data: DataTType
) =>
  cell && plugin?.cellStyle
    ? typeof plugin?.cellStyle === 'function'
      ? plugin?.cellStyle(data)
      : plugin?.cellStyle
    : undefined;

export const getCellInnerDivClassName = (
  cell: Cell | null,
  plugin: CellPlugin | null,
  data: unknown
) => {
  const additionalClass = plugin?.cellClassName
    ? typeof plugin?.cellClassName === 'function'
      ? plugin?.cellClassName(data)
      : plugin?.cellClassName
    : undefined;

  return (
    'react-page-cell-inner' +
    ((cell?.rows?.length ?? 0) > 0 ? '' : ' react-page-cell-inner-leaf') +
    (additionalClass ? ' ' + additionalClass : '')
  );
};

export const getCellInnerDivStylingProps = (
  cell: Cell | null,
  plugin: CellPlugin | null,
  data: DataTType
) => {
  return {
    style: getCellInnerDivStyle(cell, plugin, data),
    className: getCellInnerDivClassName(cell, plugin, data),
  };
};

export const gridClass = (size?: number): string => {
  return `react-page-cell-sm-${size || 12} react-page-cell-xs-12`;
};

export const getCellOuterDivClassName = ({
  size,
  hasInlineNeighbour,
  inline,
  hasChildren,
}: {
  size?: number;
  hasChildren: boolean;
  hasInlineNeighbour?: string;
  inline?: string | null;
}) => {
  return classNames('react-page-cell', gridClass(size), {
    'react-page-cell-has-inline-neighbour': hasInlineNeighbour,
    [`react-page-cell-inline-${inline || ''}`]: inline,
    'react-page-cell-leaf': !hasChildren,
  });
};
