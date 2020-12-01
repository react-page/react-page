

The `<Editor />` component is the only Component you have to use. 
It's used both for editing and displaying content (with `readOnly` set to true)



## Props

### `value: Value`

this is the value that the editor should display. You will usually load that from a database.
It has the type `Value`, but should generally considered to be "opaque", so don't rely on its internal structure.

### `onChange: (newValue: Value) => void`

this function is called whenever the editor has new data. You would usually store the new data back to the database in this function.
This is not required when `readOnly` is `true`

### `readOnly: boolean`

if set to `true`, the content cannot be edited. You need to set this if you want to just isplay your content.
Any code that is only used for editing won't be loaded if you using webpack or similar bundlers, so you don't have to worry about bundle size!

If you set it to `false` during runtime, the editing ui will be loaded and display. 

E.g. you can have editing capabilities directly on the public facing page, where you normaly just show the content. 
Simply check whether the current user is a publisher, display a button that will set `readOnly` to false and provide an `onChange` function to save the content

### `cellPlugins: CellPlugin[]`

an array of `CellPlugin`s that can be used in this editor.

We provide both some ready-to-use plugins and an api to create custom cell plugins to display anything you want.

You will usually need the [`slate`](/slate.md) plugin for rich text editing and some custom plugins.

Refer to the following docs to see what is possible:

- [Rich text editing](/slate.md)
- [Custom Cell plugins](/custom-cell-plugins.md)
- [Builtin Cell Plugins](/builtin_plugins.md)

### `lang`

if the content to edit should be multi-language, you can pass a language id (e.g. `"en"`) here. Use together with `languages`

### `languages`

should be an array of `{lang: string, label: string}` and contain all languages that can be used:

```

const LANGUAGES = [
  {
    lang: 'en',
    label: 'English',
  },
  {
    lang: 'de',
    label: 'Deutsch',
  },
];
```

That way an editing user can select the language at any time. Any cell will allways show the default language content unless another version in that language has been made. This is per cell so users can avoid the "copy everything to another language" problem that many CMS have! Users can just translate what needs to be translated.

Additionaly cells can be hidden *per language*.