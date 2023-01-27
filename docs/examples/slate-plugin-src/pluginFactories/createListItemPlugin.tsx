import createSimpleHtmlBlockPlugin from './createSimpleHtmlBlockPlugin';

type ListItemDef = {
  type: string;
  tagName: keyof JSX.IntrinsicElements;
};

export default function <T>(def: ListItemDef) {
  return createSimpleHtmlBlockPlugin<T>({
    noButton: true,
    tagName: def.tagName,
    type: def.type,
  });
}
