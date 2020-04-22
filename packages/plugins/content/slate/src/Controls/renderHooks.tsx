import isObject from 'lodash.isobject';
import React, { DependencyList, useCallback } from 'react';
import {
  RenderElementProps,
  RenderLeafProps,
  useSelected,
  useFocused
} from 'slate-react';
import { SlatePlugin } from '../types/SlatePlugin';
import {
  useComponentMarkPlugins,
  useComponentNodePlugins
} from './pluginHooks';
import { getTextContents } from '../utils/getTextContent';

export const useRenderElement = (
  {
    plugins,
    defaultPluginType,
  }: { plugins: SlatePlugin[]; defaultPluginType: string },
  deps: DependencyList
) => {
  const componentPlugins = useComponentNodePlugins({ plugins }, deps);

  return useCallback(
    ({
      element: { type, data = {}, children: childNodes },
      children,
      attributes,
    }: RenderElementProps) => {
      const matchingPlugin =
        componentPlugins.find(plugin => plugin.type === type) ??
        componentPlugins.find(plugin => plugin.type === defaultPluginType);

      if (matchingPlugin) {
        const { Component } = matchingPlugin;
        Component.displayName = 'SlatePlugin(' + matchingPlugin.type + ')';

        return (
          <Component
            {...data}
            attributes={attributes}
            children={children}
            childNodes={childNodes}
            getTextContents={() => getTextContents(childNodes)}
            useSelected={useSelected}
            useFocused={useFocused}
          />
        );
      }
      return <p>unknown component {type}</p>;
    },
    deps
  );
};

export const useRenderLeave = (
  { plugins }: { plugins: SlatePlugin[] },
  deps: DependencyList
) => {
  const markPlugins = useComponentMarkPlugins({ plugins }, deps);

  return useCallback(
    ({
      leaf: { text, ...leaveTypes },
      attributes,
      children,
    }: RenderLeafProps) => {
      return (
        <span {...attributes}>
          {Object.keys(leaveTypes).reduce((el, type) => {
            const matchingPlugin = markPlugins.find(
              plugin => plugin.type === type
            );
            if (matchingPlugin) {
              const { Component } = matchingPlugin;
              const value = leaveTypes[type]; // usually boolean
              const props = isObject(value) ? value : {};

              return (
                <Component
                  childNodes={[{ text }]}
                  getTextContents={() => [text]}
                  useSelected={useSelected}
                  useFocused={useFocused}
                  {...props}
                >
                  {el}
                </Component>
              );
            }
            return el;
          }, children)}
        </span>
      );
    },
    deps
  );
};
