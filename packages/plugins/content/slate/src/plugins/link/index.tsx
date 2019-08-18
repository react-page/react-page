/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

/* eslint-disable no-alert, prefer-reflect, default-case, react/display-name */
import * as React from 'react';

import Plugin, { PluginGetComponent, PluginButtonProps } from '../Plugin';

import { Data, Editor } from 'slate';

import { RenderNodeProps } from 'slate-react';
import { NextType } from '../../types/next';
import { SlatePluginSettings } from '../../types/plugin';

import { lazyLoad } from '@react-page/core';

const LinkButton = lazyLoad(() => import('./LinkButton'));

export const A = 'LINK/LINK';

const ALLOWED_TYPES = [A];

const DEFAULT_MAPPING = {
  [A]: 'a',
};

// tslint:disable-next-line:no-any
const defaultGetComponent: PluginGetComponent = ({ type }) =>
  DEFAULT_MAPPING[type];

export interface LinkButtonState {
  open: boolean;
  href: string;
  title: string;
  hadLinks: boolean;
  wasExpanded: boolean;
}

export default class LinkPlugin extends Plugin {
  name = 'link';

  /*schema = {
    nodes: { [A]: Link },
  };*/

  hoverButtons: React.ComponentType<PluginButtonProps>[] = [LinkButton];
  toolbarButtons: React.ComponentType<PluginButtonProps>[] = [LinkButton];

  constructor(props: SlatePluginSettings = {}) {
    super();

    this.getComponent = props.getComponent || defaultGetComponent;
  }

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'a':
        return {
          object: 'inline',
          type: A,
          nodes: next(el.childNodes),
          data: Data.create({
            href: el.getAttribute('href') || '',
          }),
        };
      default:
        return;
    }
  }

  serialize = (
    // tslint:disable-next-line:no-any
    object: { type: string; object: string; data: any },
    // tslint:disable-next-line:no-any
    children: any[]
  ) => {
    if (object.object !== 'inline') {
      return;
    }
    const Component = this.getComponent({
      type: object.type,
      object: 'inline',
      data: object.data,
    });

    if (!Component) {
      return null;
    }
    return <Component href={object.data.get('href')}>{children}</Component>;
  }

  renderNode = (props: RenderNodeProps, editor: Editor, next: NextType) => {
    if (!ALLOWED_TYPES.includes(props.node.type)) {
      return next();
    }
    const Component = this.getComponent({
      type: props.node.type,
      object: 'inline',
      data: props.node.data,
    });
    if (Component) {
      return (
        <Component href={props.node.data.get('href')}>
          {props.children}
        </Component>
      );
    }

    return next();
  }
}
