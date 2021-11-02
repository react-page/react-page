import React, { useState } from 'react';

// The editor core
import type { CellPlugin, Value } from '@react-page/editor';

import Editor from '@react-page/editor';

import PageLayout from '../../components/PageLayout';

const customPlugin: CellPlugin<{
  withImage: boolean;
  imageUrl?: string;
}> = {
  id: 'mycustomplugin',
  title: 'my custom plugin with conditional form',
  Renderer: ({ data }) => (
    <div>
      {data.withImage ? (
        <p>
          with image: <img src={data.imageUrl} />
        </p>
      ) : (
        <p>without image</p>
      )}
    </div>
  ),
  version: 1,
  controls: {
    type: 'autoform',
    schema: {
      properties: {
        withImage: {
          type: 'boolean',
        },
        imageUrl: {
          type: 'string',
          uniforms: {
            showIf: (data) => data.withImage,
          },
        },
      },
    },
  },
};
const cellPlugins = [customPlugin];

export default function SimpleExample() {
  const [value, setValue] = useState<Value>(null);

  return (
    <PageLayout>
      <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />
    </PageLayout>
  );
}
