import React from 'react';
import { Data, Editor } from 'slate';
import {
  RenderBlockProps,
  RenderInlineProps,
  RenderMarkProps
} from 'slate-react';
import { NextType } from '../types/next';
import SlatePlugin from '../types/SlatePlugin';
import {
  MapLike,
  SlateComponentPluginDefinition,
  SlateNodeObjectType
} from '../types/slatePluginDefinitions';
import createSlateBasePlugin from './createBasePlugin';

function createComponentPluginWithDefinition<T extends {}>(
  pluginDefinition: SlateComponentPluginDefinition<T>
): SlatePlugin {
  return {
    ...createSlateBasePlugin({ ...pluginDefinition, pluginType: 'component' }),

    deserialize: pluginDefinition.deserialize
      ? // tslint:disable-next-line:no-any
        (el: HTMLElement, next: (childnodes: any) => any) => {
          const tagName = el.tagName.toLowerCase();
          if (tagName !== pluginDefinition.deserialize.tagName) {
            return;
          }
          return {
            object: pluginDefinition.object,
            type: pluginDefinition.type,
            nodes: next(el.childNodes),
            data: pluginDefinition.deserialize.getData
              ? Data.create(pluginDefinition.deserialize.getData(el))
              : undefined,
          };
        }
      : null,
    serialize: (
      // tslint:disable-next-line:no-any
      node: { type: string; object: SlateNodeObjectType; data: any },
      // tslint:disable-next-line:no-any
      children: any[]
    ) => {
      if (node.object !== pluginDefinition.object) {
        return;
      }
      if (node.type !== pluginDefinition.type) {
        return;
      }
      const { Component } = pluginDefinition;
      return <Component data={node.data} children={children} />;
    },

    renderMark: (props: RenderMarkProps, editor: Editor, next: NextType) => {
      const { attributes, children, mark } = props;
      if (mark.type !== pluginDefinition.type) {
        return next();
      }
      if (mark.object !== pluginDefinition.object) {
        return next();
      }

      const { Component } = pluginDefinition;
      return (
        <Component
          data={mark.data as MapLike<T>}
          children={children}
          attributes={attributes}
        />
      );
    },

    renderBlock: (props: RenderBlockProps, editor: Editor, next: NextType) => {
      const { children, node } = props;

      if (node.type !== pluginDefinition.type) {
        return next();
      }
      if (node.object !== pluginDefinition.object) {
        return next();
      }

      const { Component } = pluginDefinition;
      return <Component data={node.data as MapLike<T>} children={children} />;
    },
    renderInline: (
      props: RenderInlineProps,
      editor: Editor,
      next: NextType
    ) => {
      const { children, node } = props;
      if (node.type !== pluginDefinition.type) {
        return next();
      }
      if (node.object !== pluginDefinition.object) {
        return next();
      }

      const { Component } = pluginDefinition;
      return <Component data={node.data as MapLike<T>} children={children} />;
    },
  };
}

export type CustomizeFunction<T, CT> = (
  def: SlateComponentPluginDefinition<T>
) => SlateComponentPluginDefinition<T & CT>;

function createComponentPlugin<T>(
  definition: SlateComponentPluginDefinition<T>
) {
  return function<CT>(customize?: CustomizeFunction<T, CT>) {
    if (customize) {
      return createComponentPluginWithDefinition<T & CT>(customize(definition));
    }
    return createComponentPluginWithDefinition<T>(definition);
  };
}

export default createComponentPlugin;
