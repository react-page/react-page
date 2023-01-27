/* eslint-disable @typescript-eslint/ban-types */

import { getAlignmentFromElement } from '../plugins/paragraphs';
import type { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
import createComponentPlugin from './createComponentPlugin';

type Def<T extends Record<string, unknown>> = Pick<
  SlateComponentPluginDefinition<HtmlBlockData<T>>,
  | 'type'
  | 'icon'
  | 'label'
  | 'customAdd'
  | 'customRemove'
  | 'isDisabled'
  | 'hotKey'
  | 'onKeyDown'
  | 'getInitialData'
  | 'controls'
  | 'getStyle'
> & {
  replaceWithDefaultOnRemove?: boolean;
  tagName: keyof JSX.IntrinsicElements;
  getData?: (el: HTMLElement) => T | void;
  noButton?: boolean;
};

export type DefaultBlockDataType = {
  align: 'left' | 'right' | 'center' | 'justify';
};

export type HtmlBlockData<T> = T & DefaultBlockDataType;

function createSimpleHtmlBlockPlugin<T = {}>(def: Def<HtmlBlockData<T>>) {
  return createComponentPlugin<HtmlBlockData<T>>({
    type: def.type,
    object: 'block',
    hotKey: def.hotKey,
    replaceWithDefaultOnRemove: def.replaceWithDefaultOnRemove,
    icon: def.icon,
    label: def.label,
    onKeyDown: def.onKeyDown,
    addToolbarButton: !def.noButton,
    customAdd: def.customAdd,
    customRemove: def.customRemove,
    controls: def.controls,
    addHoverButton: false,
    deserialize: {
      tagName: def.tagName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getData: def.getData || (getAlignmentFromElement as any),
    },
    getStyle: (data) => ({
      textAlign: data.align,
      ...(def.getStyle?.(data) ?? {}),
    }),

    Component: def.tagName,
  });
}

export default createSimpleHtmlBlockPlugin;
