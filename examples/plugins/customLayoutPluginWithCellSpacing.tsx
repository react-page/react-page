import type { CellPlugin } from '@react-page/editor';
import React from 'react';

const customLayoutPlugin: CellPlugin<{
  backgroundColor: string;
  paddingX: number;
  paddingY: number;
  cellSpacingOverride?: boolean;
  cellSpacingX: number;
  cellSpacingY: number;
}> = {
  Renderer: ({ children, data }) => (
    <div
      style={{
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: data.backgroundColor,
        padding: `${data.paddingY}px ${data.paddingX}px`,
      }}
    >
      {children}
    </div>
  ),

  cellSpacing: (data) =>
    data.cellSpacingOverride
      ? { x: data.cellSpacingX, y: data.cellSpacingY }
      : null,

  createInitialData: () => ({
    backgroundColor: '#ffeeaa',
    paddingX: 12,
    paddingY: 12,
    cellSpacingOverride: false,
    cellSpacingX: 10,
    cellSpacingY: 10,
  }),

  id: 'custom-layout-plugin-with-cell-spacing',
  title: 'Background with Cell Spacing',
  description: 'Custom layout plugin with cell spacing support',
  version: 1,

  controls: {
    type: 'autoform',
    schema: {
      required: ['backgroundColor'],
      properties: {
        backgroundColor: { type: 'string', title: 'Background Color' },
        paddingX: { type: 'number', title: 'Horizontal Padding' },
        paddingY: { type: 'number', title: 'Vertical Padding' },
        cellSpacingOverride: {
          type: 'boolean',
          title: 'Override Cell Spacing',
        },
        cellSpacingX: {
          type: 'number',
          title: 'Horizontal Cell Spacing',
        },
        cellSpacingY: { type: 'number', title: 'Vertical Cell Spacing' },
      },
    },
  },
};

export default customLayoutPlugin;
