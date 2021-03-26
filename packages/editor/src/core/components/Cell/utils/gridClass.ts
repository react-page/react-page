export const gridClass = (
  size: number,
  sizeClass: 'sm' | 'xs' = 'sm'
): string => {
  return `react-page-cell-${sizeClass}-${size || 12} react-page-cell-xs-12`;
};
