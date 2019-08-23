import createSimpleHtmlBlockPlugin from './createSimpleHtmlBlockPlugin';

type ListItemDef = {
  type: string;
  tagName: string;
  defaultNode: string;
};

export default (def: ListItemDef) => {
  return createSimpleHtmlBlockPlugin({
    noButton: true,
    tagName: def.tagName,
    type: def.type,
  });
};
