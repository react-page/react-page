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

### `cellStyle`

`cellStyle` can be a style object (`CSSProperties`) or a function that returns a style object. This function receives the `data` of the plugin as argument.

This style will be applied to the outermost div of the cell, not to the Component specified in `Renderer`.

This is useful to customize paddings of a cell or similar.

### `controls`

one of three types:

- `{ type: 'autoform' }`,
- `{ type: 'custom' }`:
- an Array of `{ title: string, controls: {...} }`:

See the following chapter.

## Autoform controls

`controls: { type: 'autoform' }` automagically generates the controls for your defined by the `schema` you provide. It uses [uniforms](https://github.com/vazco/uniforms) under the hood. \
 It takes these additional properties:

- `schema`: a `JsonSchema` that defines the `data` that you expect.
  If you are using typescript, the expected type is derived from the `Data` type of your plugin, so you can autocomplete your way to get the right schema in your IDE!
- columnCount: the number of columns that the generated form will use

It supports strings, date and ints, nested objects and arrays. You can also use custom components, for example for an image field that uploads the image to an S3 bucket and return the url, a select field that uses a graphql query to fetch the options, etc.

### Custom field components example

Consider a plugin that has a title and an image.
You want the plugin to render a file input where the user can upload a file to a S3 bucket or similar:

```tsx
const myPlugin: CellPlugin<{
  title: string;
  imageUrl: string;
  description: string;
}> = {
  Renderer: (props) => (
    <div>
      <h1>{props.data.title}</h1>
      <img style={{ width: 300 }} src={props.data.imageUrl} />
      <p>{props.data.description}</p>
    </div>
  ),
  id: '',
  version: 1,

  title: 'Something with a title and an image',
  controls: {
    type: 'autoform',
    schema: {
      properties: {
        title: {
          type: 'string',
        },
        imageUrl: {
          type: 'string',
          uniforms: {
            // you can pass additional props to uniforms, e.g. the component to use to render the field
            component: ImageUploadField,
          },
        },
        description: {
          type: 'string',
          uniforms: {
            // you can also pass other props.
            // refer to the official uniforms documentation
            multiline: true,
            rows: 4,
          },
        },
      },
    },
  },
};
```

The `ImageUploadField` might be something like this:

```tsx
import { connectField } from 'uniforms';

const ImageUploadField = connectField(({ value, onChange }) => {
  return (
    <div>
      {value ? (
        /* show preview*/ <img style={{ width: 150 }} src={value} />
      ) : null}

      <input
        type="file"
        onChange={async (e) => {
          // imagine you have a function that takes a file and returns a url once it is uploaded, e.g. to s3
          const url = await uploadFile(e.target.files[0]);

          onChange(url);
        }}
      />
    </div>
  );
});
```

See the official [uniforms documentation](https://uniforms.tools/) for more information.

Also checkout the [nice playground](https://uniforms.tools/playground#?N4IgDgTgpgzlAuIBcICCATd0YwAQAoApAZQHkA5YgYwAsoBbAQwEoQAacCAezBmVEYBXeFxiMAblGQAzRgBs4HISLGSAIlDmMAnsgCMABgMd0ASzEAjOVHQz5ikFoubk8CIKgcwWqlBpc5dCgIOwVPEGhGdFIAOzldJFkwjhhaBkZkEHx8ZlwAXgA-XGAAHRjcXCouGJh4XEYAK3F83BioAHdcVCb8YHq5OQBRCG4IGCRcNw82XEE4DVlBOXhxyfdPXABrKG12rgh0VYBtEpBBGNNpffoYU4BdXABfZgBuMoqqmrrUuiYW0vKFUmpng1gmAHIMFhYDBwWx3kD4NowFAIVwLA0oFR4HCERVIDxgvBTLAJgCgUCqCDtGTJsjUbhwbUIKYYgBzcFPeGAim1RjwBl9JEoiHM1kcrl4oHMqAIWnChlMtzizmPbkUioAL1MYHl9NFyvZcNwYH5AogMQhRwMAFoAJx3YAAVkeqvVQLVUugAEdBKZoOgJkcldAEMbwdqwOG-QLwXd3Y83jEEdJztjTNVKpEBQA1eSmdD8_b4H7pXLkynVWq4cT5wsiCAtRriAB0VXoYFM1hLaSYrzKXoQggtBHoXCCclyhWKUoqtbkBaLEHwY4n_eTPKBlwI88XDZbwVGeAAZMea3WlweRvsYC3rOz4DRy7OgdB4MPyn0gvBGF3Vrv632K8jyeJMNSeKVEwRR4B0BT5q1LJg8wXQDGzyLMoH5KBkL3YtEJYJMETfD9Wg6XASAoahfkYAAhFl0DZKAe2omZ8Jw1D12eHJ2BAGB_HaABJOJWSgYZRlCBxGBgbQYioWJiEECx6BBCTwikmS5JidisNUtUQEfBgpBQJhzVMeQQEeIA) to see whats possble

## Custom Controls

`controls: { type: 'custom' }` enables you to provide a completly custom component that is used to edit your cell plugin. This component will be shown in the `BottomToolbar` when a cell with this plugin is selected.

Use this if `type: "autoform"` is not suitable, e.g. if you either already have good form components or if you have very special requirements.
Feel free to open an issue with your usecase as we want to make `type: "autoform"` as powerful as possible.

`controls: { type: 'custom' }` takes these options:

- `Component`: the custom component you want to use for editing. It receives the same props as `Renderer` and an `onChange` property. Call this function to pass new data to the plugin. The current data is passed in as `data`.

## Multiple Controls

You can specify multiple controls each with a title. Plugin with multiple controls will show additional Tabs in the Toolbar
to switch between the controls:

```tsx
const customContentPlugin: CellPlugin<{
  title: string;
  advancedProperty: string;
}> = {
  id: 'my-plugin',
  controls: [
    {
      title: 'Basse config',
      controls: {
        type: 'autoform',
        schema: {
          properties: {
            title: {
              type: 'string',
            },
          },
          required: [],
        },
      },
    },
    {
      title: 'Advanced',
      controls: {
        type: 'autoform',
        schema: {
          type: 'object',
          required: [],
          properties: {
            advancedProperty: {
              type: 'string',
            },
          },
        },
      },
    },
  ],
};
```

[See working example here](//demo/examples/multicontrols)

<details>
  <summary>Show example (click to expand)</summary>

[customContentPlugin.tsx](examples/plugins/customContentPlugin.tsx ':include :type=code typescript')

</details>

## Advanced props

For advanced use cases, there are some additional properties:

### `cellPlugins`

Define the plugins that are allowed inside this cell. Is either an array of `CellPlugin` or a function that receives
the parent's `CellPlugin`s and the current cell's data.

Example:

```tsx
const yourPlugin: CellPlugin = {
  id: 'some-plugin',
  title: 'Some plugin with different cellPlugins',
  Renderer: (props) => (
    <div style={{ border: '5px solid black' }}>{props.children}</div>
  ),
  cellPlugins: [slate, image], // as array
  version: 1,
};

const anotherPlugin: CellPlugin = {
  id: 'some-plugin-2',
  title: 'Some plugin that takes the parent plugins',
  Renderer: (props) => (
    <div style={{ border: '5px solid black' }}>{props.children}</div>
  ),
  cellPlugins: (plugins) => [
    slate,
    ...plugins.filter((p) => p.id !== 'some-plugin-1'), // e.g. remove a plugin
  ],
  version: 1,
};
```

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

### `childConstraints` (experimental)

Takes an object:

```ts

childConstraints: {
  maxChildren: number,
}

```

it will only show the (+) button to add new cells/rows when it has less than `maxChildren` rows in the current cell.

It currently just controls whether the button is shown, but its still possible to add new cells by dragging.
it will be revisited in the future and is therefore considered experimental.
