import paragraph from './paragraph';
import link from './link';

import emphasize from './emphasize';

import headings from './headings';
import { SlatePluginOrCollection } from '../types/SlatePlugin';
import alignment from './alignment';
import blockquote from './blockquote';
import code from './code';
import lists from './lists';

const defaultPlugins: SlatePluginOrCollection[] = [
  headings.h1(),
  headings.h2(),
  headings.h3(),
  headings.h4(),
  headings.h5(),
  headings.h6(),
  link(),
  lists.ul(),
  lists.ol(),
  lists.indention(),
  emphasize.em(),
  emphasize.strong(),
  emphasize.underline(),
  alignment.left(),
  alignment.center(),
  alignment.right(),
  alignment.justify(),
  paragraph(),
  blockquote(),
  code.mark(),
  code.block(),

  /*
  new ListsPlugin(),
 
  */
];

export default defaultPlugins;
