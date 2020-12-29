## Intro

cell plugins define what your users can add as _cells_ to a document.
A cell plugin is defined by some unique id, a title and a `Renderer` which is the react component
that gets displayed in that _cell_.

You define it like this:

```tsx
import { CellPlugin } from '@react-page/editor';
import React from 'react';

// use a type here, not an interface
type Data = {
  title: string
}

const myFirstcellPlugin: CellPlugin<Data> = {
  Renderer: ({ data }) => (
    <SomeCustomComponent title={data.title} />
  ),
  id: 'myFirstCellPlugin',
  title: 'My first cell plugin',
  description: 'My first cell plugin just displays a title',
  version: 1,
  controls: {
    type: 'autoform',
    schema: {
      properties: {
        title: {
          type: 'string',
          default: 'someDefaultValue',
        },
      },
      required: ['title'],
    },
  },
};


// and later add it as cellPlugins to your `<Editor />

import Editor from '@react-page/editor

const MyApp = () => {
  return (
    <Editor
      cellPlugins={[myFirstCellPlugin, ...otherplugins]}
      value={value}
      onChange={onChange}
    />
  )
}

```

## Basic props of a `CellPlugin`

Cell plugins can have these properties (as defined by `CellPlugin` type):

### `id`

a unique id for your plugin. Make sure that every plugin you use has a unique id

### `title`

the name of the plugin that will be used for displaying

### `description`

additional information for your plugin. It will be shown on the plugin drawer

### `icon`

a `ReactNode` that displays the icon on the plugin drawer. Best use material-ui icons for that.

### `version`

an integer that defines the current `data` version of your plugin. increase this number if you need to migrate the content for a newer version

### `Renderer`

The Component that renders the content of your plugin. It receives these props:

- `data` (object): the properties of the plugin. If you are using typescript, this has your `Data` type
- `children`: if you render children, then your plugin can have inner `Row`s and `Cell`s

in some cases you might require additional information:

- `readOnly` (boolean): true means the editor just shows the content.
- `onChange`: (function): You can call `onChange` to update the cell with new data

### `controls`

one of two types:

- `{ type: 'autoform' }`: \
  this type automagically generates the controls for your defined by the `schema` you provide. It uses [uniforms](https://github.com/vazco/uniforms) under the hood. \
  It takes these additional properties:
  - `schema`: a `JsonSchema` that defines the `data` that you expect.
    If you are using typescript, the expected type is derived from the `Data` type of your plugin, so you can autocomplete your way to get the right schema in your IDE!
  - columnCount: the number of columns that the generated form will use
- `{ type 'custom'}`: \
  this type allows you to provide a custom component that is used to edit your cell plugin. It will get shown in the `BottomToolbar` and takes these options:
  - `Component`: the custom component you want to use for editing. It receives the same props as `Renderer`. in particular `onChange` is importent here. You should call it with new `data` whenever the user wants to save the changes.

## Advanced props

For advanced use cases, there are some additional properties:

### `createInitialData`

this function is called when a new cell is added to the document your plugin. It should return an object with the `Data` type.

### `createInitialChildren`

if your `Renderer` receives children, you can create initial rows and cells that will be added when a new cell with your plugin is added.

`createInitialChildren` should return an array of rows, and every row itself is an array of cells. A cell can have these properties:

- `plugin`: a plugin id of a cell plugin that will be used to create this child cell
- `data`: any initial data of that cell
- `rows`: sub rows of that cell (same structure as mentioned)

### `migrations`

when you want to change the shape of your `Data`, you need to increase `version` and define a migration for it. Pass an array of `Migration` instances to `migrations`. (TODO: add more information here about migrations)

### `isInlinable`

whether this plugin can be added as floating inline element into another plugin. Typicall this allows users to add floating images inside rich text.

### `allowInlineNeighbours`

whether this cell can receive an `isInlinable` neighbour.

### `allowClickInside`

ReactPage prevents clicks and other events on your cell when in edit mode. This is to make sure that users always can select and resize any cell properly. In
particular iframes can cause troubles without that mechanism. You can set `allowClickInside` to `true` to disable that. E.g. the rich text editor sets that.

### `hideInMenu`

hide this plugin in the plugin drawer

### `Provider`

A component that wraps both your `Renderer` and the `BottomToolbar` that is shown when a cell is selected.

This is useful in cases where the controls of your plugin require some additional context that is shared with the `Renderer`.
E.g. the default rich text editor plugin ("slate") uses a provider to highlight the currently active format (bold, headings, etc.)
