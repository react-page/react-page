import React, { lazy } from 'react';
import { createListItemPlugin } from '../../pluginFactories';
import createIndentionPlugin from '../../pluginFactories/createListIndentionPlugin';
import createListPlugin from '../../pluginFactories/createListPlugin';
import { LI, OL, UL } from './constants';

const ListIcon = lazy(
  () => import('@mui/icons-material/FormatListBulleted')
);
const OrderedListIcon = lazy(
  () => import('@mui/icons-material/FormatListNumbered')
);

const IncreaseIndentIcon = lazy(
  () => import('@mui/icons-material/FormatIndentIncrease')
);
const DecreaseIndentIcon = lazy(
  () => import('@mui/icons-material/FormatIndentDecrease')
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
