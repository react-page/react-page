import { lazyLoad } from '@react-page/editor';
import React from 'react';
import { createListItemPlugin } from '../../pluginFactories';
import createIndentionPlugin from '../../pluginFactories/createListIndentionPlugin';
import createListPlugin from '../../pluginFactories/createListPlugin';
import { LI, OL, UL } from './constants';
var ListIcon = lazyLoad(function () { return import('@mui/icons-material/FormatListBulleted'); });
var OrderedListIcon = lazyLoad(function () { return import('@mui/icons-material/FormatListNumbered'); });
var IncreaseIndentIcon = lazyLoad(function () { return import('@mui/icons-material/FormatIndentIncrease'); });
var DecreaseIndentIcon = lazyLoad(function () { return import('@mui/icons-material/FormatIndentDecrease'); });
var ol = createListPlugin({
    type: OL,
    icon: React.createElement(OrderedListIcon, null),
    label: 'Ordered List',
    tagName: 'ol',
});
var ul = createListPlugin({
    type: UL,
    icon: React.createElement(ListIcon, null),
    label: 'Unordered List',
    tagName: 'ul',
});
// only used for easier access on createCata
var li = createListItemPlugin({
    tagName: 'li',
    type: LI,
});
var indention = createIndentionPlugin({
    iconIncrease: React.createElement(IncreaseIndentIcon, null),
    iconDecrease: React.createElement(DecreaseIndentIcon, null),
    listItemType: LI,
    labelIncrease: 'Increase Indentation',
    labelDecrease: 'Decrease Indentation',
});
export default {
    ol: ol,
    ul: ul,
    li: li,
    indention: indention,
};
//# sourceMappingURL=index.js.map