import { lazyLoad } from '@react-page/core';
import React from 'react';
import createComponentPlugin from '../../pluginFactories/createComponentPlugin';

const LinkIcon = lazyLoad(() => import('@material-ui/icons/Link'));

export type LinkData = {
  href: string;
  openInNewWindow?: boolean;
};

export default {
  link: createComponentPlugin<LinkData>({
    type: 'LINK/LINK',
    object: 'inline',
    icon: <LinkIcon />,
    label: 'Link',
    addHoverButton: true,
    addToolbarButton: true,
    schema: {
      type: 'object',
      required: ['href'],
      properties: {
        href: {
          type: 'string',
        },
        openInNewWindow: {
          type: 'boolean',
        },
      },
    },
    deserialize: {
      tagName: 'a',
      getData: el => ({
        href: el.getAttribute('href') || '',
        openInNewWindow: el.getAttribute('target') === '_blank',
      }),
    },
    Component: ({ children, openInNewWindow, href }) => {
      return (
        <a target={openInNewWindow ? '_blank' : undefined} href={href}>
          {children}
        </a>
      );
    },
  }),
};
