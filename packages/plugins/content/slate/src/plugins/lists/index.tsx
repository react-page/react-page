import { lazyLoad } from '@react-page/core';
import React from 'react';
import { createListItemPlugin } from '../../pluginFactories';
import createIndentionPlugin from '../../pluginFactories/createListIndentionPlugin';
import createListsPlugin from '../../pluginFactories/createListPlugin';

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
  allListTypes: [UL, OL],
  icon: <OrderedListIcon />,
  tagName: 'ol',
  listItem: {
    tagName: 'li',
    type: LI,
  },
});

const ul = createListsPlugin({
  type: UL,
  allListTypes: [UL, OL],
  icon: <ListIcon />,
  tagName: 'ul',
  listItem: {
    tagName: 'li',
    type: LI,
  },
});

// only used for easier access on createInitialSlateState
const li = createListItemPlugin({
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
