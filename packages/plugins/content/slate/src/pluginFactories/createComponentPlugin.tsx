import {
  RenderMarkProps,
  RenderInlineProps,
  RenderBlockProps
} from 'slate-react';
import { Data, Editor } from 'slate';
import React from 'react';
import { NextType } from '../types/next';
import SlatePlugin from '../types/SlatePlugin';
import createSlateBasePlugin from './createBasePlugin';
import {
  SlateNodeObjectType,
  SlateComponentPluginDefinition,
  MapLike
} from '../types/slatePluginDefinitions';

function createComponentPluginWithDefinition<T extends {}>(
  pluginDefintion: SlateComponentPluginDefinition<T>
): SlatePlugin {
  return {
    ...createSlateBasePlugin({ ...pluginDefintion, pluginType: 'component' }),
    // tslint:disable-next-line:no-any
    deserialize: (el: HTMLElement, next: (childnodes: any) => any) => {
      const tagName = el.tagName.toLowerCase();
      if (tagName !== pluginDefintion.deserialize.tagName) {
        return;
      }
      return {
        object: pluginDefintion.object,
        type: pluginDefintion.type,
        nodes: next(el.childNodes),
        data: pluginDefintion.deserialize.getData
          ? Data.create(pluginDefintion.deserialize.getData(el))
          : undefined,
      };
    },
    serialize: (
      // tslint:disable-next-line:no-any
      node: { type: string; object: SlateNodeObjectType; data: any },
      // tslint:disable-next-line:no-any
      children: any[]
    ) => {
      if (node.object !== pluginDefintion.object) {
        return;
      }
      if (node.type !== pluginDefintion.type) {
        return;
      }
      const { Component } = pluginDefintion;
      return <Component data={node.data} children={children} />;
    },

    renderMark: (props: RenderMarkProps, editor: Editor, next: NextType) => {
      const { attributes, children, mark } = props;
      if (mark.type !== pluginDefintion.type) {
        return next();
      }
      if (mark.object !== pluginDefintion.object) {
        return next();
      }

      const { Component } = pluginDefintion;
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

      if (node.type !== pluginDefintion.type) {
        return next();
      }
      if (node.object !== pluginDefintion.object) {
        return next();
      }

      const { Component } = pluginDefintion;
      return <Component data={node.data as MapLike<T>} children={children} />;
    },
    renderInline: (
      props: RenderInlineProps,
      editor: Editor,
      next: NextType
    ) => {
      const { children, node } = props;
      if (node.type !== pluginDefintion.type) {
        return next();
      }
      if (node.object !== pluginDefintion.object) {
        return next();
      }

      const { Component } = pluginDefintion;
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
