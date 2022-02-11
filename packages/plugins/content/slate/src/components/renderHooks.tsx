import propisValid from '@emotion/is-prop-valid';
import { lazyLoad } from '@react-page/editor';
import isObject from 'lodash.isobject';
import type { DependencyList } from 'react';
import React, { useCallback } from 'react';
import type { RenderElementProps, RenderLeafProps } from 'slate-react';
import type { SlatePlugin } from '../types/SlatePlugin';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';
import { getTextContents } from '../utils/getTextContent';
import {
  useComponentMarkPlugins,
  useComponentNodePlugins,
} from './pluginHooks';

// lazy load as it uses slate library. We don't want to bundle that in readonly mode
const VoidEditableElement = lazyLoad(() => import('./VoidEditableElement'));

type Data = {
  [key: string]: unknown;
};
const pickNativeProps = (data?: Data): Data => {
  if (!isObject(data)) {
    return {};
  }
  return Object.keys(data).reduce((acc, key) => {
    if (propisValid(key)) {
      return {
        ...acc,
        [key]: data[key],
      };
    }
    return acc;
  }, {});
};
type Injections = {
  useSelected: () => boolean;
  useFocused: () => boolean;
  readOnly: boolean;
};
const STATIC_INJECTIONS = {
  useFocused: () => false,
  useSelected: () => false,
  readOnly: true,
};

export const useRenderElement = (
  {
    plugins,
    defaultPluginType,
    injections = STATIC_INJECTIONS,
  }: {
    plugins: SlatePlugin[];
    defaultPluginType: string;
    injections?: Injections;
  },
  deps: DependencyList
) => {
  const componentPlugins = useComponentNodePlugins({ plugins }, deps);

  return useCallback(
    ({ element, children, attributes }: RenderElementProps) => {
      const { type, data = {}, children: childNodes } = element;
      const matchingPlugin =
        componentPlugins.find((plugin) => plugin.type === type) ??
        componentPlugins.find((plugin) => plugin.type === defaultPluginType);

      if (matchingPlugin) {
        const { Component, getStyle } = matchingPlugin;

        const style = getStyle ? getStyle(data || {}) : undefined;
        const baseProps = {
          children,
          style,
        };

        if (typeof Component === 'string' || Component instanceof String) {
          const nativePropsInData = pickNativeProps(data as Data);
          // simple component like "p"
          return (
            <Component {...attributes} {...baseProps} {...nativePropsInData} />
          );
        }

        Component.displayName = 'SlatePlugin(' + matchingPlugin.type + ')';
        // usefull in certain cases
        const additionalProps = {
          childNodes,
          getTextContents: () =>
            getTextContents(childNodes, {
              slatePlugins: plugins,
            }),
          ...injections,
        };
        const component = (
          <Component
            {...baseProps}
            {...data}
            // attributes have to be spread in manually because of ref problem
            attributes={attributes}
            {...additionalProps}
          />
        );
        const isVoid =
          (matchingPlugin.object === 'inline' ||
            matchingPlugin.object === 'block') &&
          matchingPlugin.isVoid;

        // if block is void, we still need to render children due to some quirks of slate

        if (isVoid && !injections.readOnly) {
          return (
            <VoidEditableElement
              component={component}
              element={element}
              plugin={matchingPlugin as SlatePluginDefinition<unknown>}
            >
              {children}
            </VoidEditableElement>
          );
        }

        return component;
      }
      return <p>unknown component {type}</p>;
    },
    deps
  );
};

export const useRenderLeave = (
  {
    plugins,
    injections = STATIC_INJECTIONS,
    readOnly = false,
  }: { plugins: SlatePlugin[]; injections?: Injections; readOnly?: boolean },

  deps: DependencyList
) => {
  const markPlugins = useComponentMarkPlugins({ plugins }, deps);

  return useCallback(
    ({
      leaf: { text, ...leaveTypes },
      attributes,
      children,
    }: RenderLeafProps) => {
      // we reduce number of dom elements by avoiding having another span. Its required in edit mode though for slate to work
      const Wrapper = readOnly ? React.Fragment : 'span';
      return (
        <Wrapper {...attributes}>
          {Object.keys(leaveTypes).reduce((el, type) => {
            const matchingPlugin = markPlugins.find(
              (plugin) => plugin.type === type
            );
            if (matchingPlugin) {
              const { Component, getStyle } = matchingPlugin;
              const dataRaw = leaveTypes[type]; // usually boolean
              const data = isObject(dataRaw) ? dataRaw : {};

              const style = getStyle ? getStyle(data) : undefined;
              if (
                typeof Component === 'string' ||
                Component instanceof String
              ) {
                const nativePropsInData = pickNativeProps(data as Data);
                return (
                  <Component {...nativePropsInData} style={style}>
                    {el}
                  </Component>
                );
              }
              return (
                <Component
                  childNodes={[{ text }]}
                  getTextContents={() => [text]}
                  useSelected={injections.useSelected}
                  useFocused={injections.useFocused}
                  style={style}
                  {...data}
                >
                  {el}
                </Component>
              );
            }
            return el;
          }, children)}
        </Wrapper>
      );
    },
    deps
  );
};
