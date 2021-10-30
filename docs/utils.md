## `createValue`: create a `Value` object

`createValue` can be used to create a value for the editor. This is useful if you want to
populate an empty editor with a default value.

The advantage over writing a `Value` manually is that you don't need to write `id`s
and that it provides some shortcuts.

You need to pass in the language and your cellPlugins as second argument:

```ts
import { createValue } from '@react-page/editor';

const partialValue = {
  rows: [
    // a row with two cells:
    [
      {
        plugin: imagePlugin.id,
        data: {
          src: 'http://path/to/image',
        },
      },
      {
        plugin: imagePlugin.id,
        data: {
          src: 'http://path/to/other-image',
        },
      },
    ],
    // a row with one cell
    [
      // a cell with rich text
      {
        plugin: slatePlugin.id,
        data: slatePlugin.createData((def) => ({
          children: [
            {
              plugin: def.plugins.headings.h1,
              children: ['hello'],
            },
            {
              plugin: def.plugins.paragraphs.paragraph,
              children: ['Hello world'],
            },
          ],
        })),
      },
    ],
  ],
};

const value = createValue(partialValue, {
  lang: 'en',
  cellPlugins: yourCellPlugins,
});
```

## `getTextContents`: get raw text contents

Can be used to extract plaintext from the editors value.

You need to pass in the language and your cellPlugins as second argument:

```ts
import { getTextContents } from '@react-page/editor';

const contents = getTextContents(value, {
  lang: 'en',
  cellPlugins: yourCellPlugins,
});

// contents is an array of strings
```

Full example:

[extractTextContents.tsx](examples/pages/examples/extractTextContents.tsx ':include :type=code typescript')
