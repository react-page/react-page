import * as React from 'react';

import { lazyLoad } from '@react-page/core';
import {
  ContentPluginProps,
  ContentPluginConfig
} from '@react-page/core/lib/service/plugin/classes';
import { CreateContentPluginConfig } from './types';

const Controls = lazyLoad(() => import('./Controls'));
function createPlugin<T extends {}>({
  schema,
  Renderer,
  ...pluginSettings
}: CreateContentPluginConfig<T>): ContentPluginConfig<T> {
  return {
    Component: (props: ContentPluginProps<T>) => {
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
