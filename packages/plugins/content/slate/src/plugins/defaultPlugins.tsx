import paragraphs from './paragraphs';
import links from './links';

import emphasize from './emphasize';

import headings from './headings';
import alignment from './alignment';
import quotes from './quotes';
import code from './code';
import lists from './lists';

const defaultPlugins = {
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
