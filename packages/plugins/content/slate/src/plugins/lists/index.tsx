import createListsPlugin from '../../pluginFactories/createListPlugin';
import { lazyLoad } from '@react-page/core';
import React from 'react';
import DEFAULT_NODE from '../DEFAULT_NODE';

import createIndentionPlugin from '../../pluginFactories/createListIndentionPlugin';
import { createListItemPlugin } from '../../pluginFactories';

const ListIcon = lazyLoad(() =>
  import('@material-ui/icons/FormatListBulleted')
);
const OrderedListIcon = lazyLoad(() =>
  import('@material-ui/icons/FormatListNumbered')
);

export const UL = 'LISTS/UNORDERED-LIST';
export const OL = 'LISTS/ORDERED-LIST';
export const LI = 'LISTS/LIST-ITEM';

const IncreaseIndentIcon = lazyLoad(() =>
  import('@material-ui/icons/FormatIndentIncrease')
);
const DecreaseIndentIcon = lazyLoad(() =>
  import('@material-ui/icons/FormatIndentDecrease')
);

const ol = createListsPlugin({
  type: OL,
  icon: <OrderedListIcon />,
  tagName: 'ol',
  listItem: {
    defaultNode: DEFAULT_NODE,
    tagName: 'li',
    type: LI,
  },
});

const ul = createListsPlugin({
  type: UL,
  icon: <ListIcon />,
  tagName: 'ul',
  listItem: {
    defaultNode: DEFAULT_NODE,
    tagName: 'li',
    type: LI,
  },
});

// only used for easier access on createInitialSlateState
const li = createListItemPlugin({
  defaultNode: DEFAULT_NODE,
  tagName: 'li',
  type: LI,
});

const indention = createIndentionPlugin({
  iconIncrease: <IncreaseIndentIcon />,
  iconDecrease: <DecreaseIndentIcon />,
  listItemType: LI,
  listTypes: [UL, OL],
});

export default {
  ol,
  ul,
  li,
  indention,
};
