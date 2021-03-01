import React from 'react';
import Editor, { Options, Value } from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import { demo } from '../../sampleContents/demo';

const cellPlugins = [slate(), image];

const customMissingPlugin = () => {
  const [value] = React.useState<Value>(demo);

  // make sure that you memoize custom components property to avoid unnesseary rerenders
  const components = React.useMemo<Options['components']>(
    () => ({
      CellPluginMissing: (props) => (
        <p style={{ color: 'red' }}>
          sorry, plugin {props.pluginId} not found 😢{' '}
        </p>
      ),
    }),
    []
  );

  return (
    <>
      <Editor cellPlugins={cellPlugins} value={value} components={components} />
    </>
  );
};

export default customMissingPlugin;
