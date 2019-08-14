import * as React from 'react';

import { lazyLoad } from '@react-page/core';
import {
  LayoutPluginConfig,
  LayoutPluginProps
} from '@react-page/core/lib/service/plugin/classes';
import { CreateLayoutPluginConfig } from './types';
const Controls = lazyLoad(() => import('./Controls'));

function createPlugin<T extends {}>({
  schema,
  Renderer,
  ...pluginSettings
}: CreateLayoutPluginConfig<T>): LayoutPluginConfig<T> {
  return {
    Component: (props: LayoutPluginProps<T>) => {
      return (
        <>
          {!props.readOnly ? (
            <Controls schema={schema} Renderer={Renderer} {...props} />
          ) : (
            <Renderer {...props} />
          )}
        </>
      );
    },
    ...pluginSettings,
  };
}
export default createPlugin;
