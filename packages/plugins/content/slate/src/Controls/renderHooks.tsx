import isObject from 'lodash.isobject';
import React, { DependencyList, useCallback } from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { SlatePlugin } from '../types/SlatePlugin';
import {
  useComponentMarkPlugins,
  useComponentNodePlugins
} from './pluginHooks';

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
      element: { type, ...elementProps },
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
            {...elementProps}
            attributes={attributes}
            children={children}
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
              return <Component {...props}>{el}</Component>;
            }
            return el;
          }, children)}
        </span>
      );
    },
    deps
  );
};
