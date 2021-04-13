// The editor core
import type { CSSProperties } from '@material-ui/styles';
import type { CellPlugin, Value } from '@react-page/editor';
import Editor from '@react-page/editor';

import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { cellPlugins } from '../../plugins/cellPlugins';
import { demo } from '../../sampleContents/demo';

type Styling = {
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  border?: CSSProperties['border'];
};
const pluginsWithMargin = cellPlugins.map<CellPlugin<Styling>>((p) => ({
  ...p,
  cellStyle: (data) => ({
    paddingLeft: data.paddingLeft,
    paddingRight: data.paddingRight,
    paddingTop: data.paddingTop,
    paddingBottom: data.paddingBottom,
    border: data.border,
  }),
  controls: [
    {
      title: 'Main',
      controls: p.controls,
    },
    {
      title: 'Styling',
      controls: {
        type: 'autoform',
        columnCount: 3,
        schema: {
          properties: {
            paddingLeft: {
              type: 'number',
            },
            paddingRight: {
              type: 'number',
            },
            paddingBottom: {
              type: 'number',
            },
            paddingTop: {
              type: 'number',
            },
            border: {
              type: 'string',
            },
          },
        },
      },
    },
  ],
}));
export default function DecoratedPlugins() {
  const [value, setValue] = useState<Value>(demo);

  return (
    <PageLayout>
      <Editor
        value={value}
        onChange={setValue}
        cellPlugins={pluginsWithMargin}
      />
    </PageLayout>
  );
}
