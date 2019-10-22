import paragraphs from './paragraphs';
import links from './links';

import emphasize from './emphasize';

import headings from './headings';
import { SlatePluginCollection } from '../types/SlatePlugin';
import alignment from './alignment';
import quotes from './quotes';
import code from './code';
import lists from './lists';

const defaultPlugins: SlatePluginCollection = {
  headings,
  links,
  lists,
  emphasize,
  alignment,
  paragraphs,
  quotes,
  code,
};

export default defaultPlugins;
