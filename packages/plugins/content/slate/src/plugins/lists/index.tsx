import { lazyLoad } from '@react-page/editor';
import React from 'react';
import { createListItemPlugin } from '../../pluginFactories';
import createIndentionPlugin from '../../pluginFactories/createListIndentionPlugin';
import createListPlugin from '../../pluginFactories/createListPlugin';
import { LI, OL, UL } from './constants';

const ListIcon = lazyLoad(
  () => import('@material-ui/icons/FormatListBulleted')
);
const OrderedListIcon = lazyLoad(
  () => import('@material-ui/icons/FormatListNumbered')
);

const IncreaseIndentIcon = lazyLoad(
  () => import('@material-ui/icons/FormatIndentIncrease')
);
const DecreaseIndentIcon = lazyLoad(
  () => import('@material-ui/icons/FormatIndentDecrease')
);

const ol = createListPlugin({
  type: OL,
  icon: <OrderedListIcon />,
  label: 'Ordered List',
  tagName: 'ol',
});

const ul = createListPlugin({
  type: UL,
  icon: <ListIcon />,
  label: 'Unordered List',
  tagName: 'ul',
});

// only used for easier access on createCata
const li = createListItemPlugin({
  tagName: 'li',
  type: LI,
});

const indention = createIndentionPlugin({
  iconIncrease: <IncreaseIndentIcon />,
  iconDecrease: <DecreaseIndentIcon />,
  listItemType: LI,
  labelIncrease: 'Increase Indentation',
  labelDecrease: 'Decrease Indentation',
});

export default {
  ol,
  ul,
  li,
  indention,
};
