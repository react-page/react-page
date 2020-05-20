## Create your own plugin with default material-ui controls

Because it can be tedious to implement controls for a plugin, we started to develop a plugin that make this much easier: `@react-page/create-plugin-materialui`

See [the readme of this library for more information](/packages/plugins/createPluginMaterialUi/README.md)

## Create your own plugins

A content plugin in its minimal form is described with this object:

```
{
  Component: YourComponent,
  name: 'some/unique/name',
  version: '0.0.1',
  IconComponent: <YourIcon />,
  text: "Name of the plugin",
  description: "description of the plugin
}
```

`Component` receives the Component that renders the content of your plugin and its controls (if any). It will receive the following props:

- `state` (object): the properties of the plugin. this is usually defined by the Controls of the plugin
- `readOnly` (boolean): true means the editor just shows the content. If false, the editor is in edit mode and you should allow users to configure your Component. Usually you will render the plugins controls if readOnly is false
- `focused` (boolean): whether the plugin is select in edit mode. You should reveal the controls if this property is true
- `onChange`: (function): Call this function with a new `state` to update the `state` of the plugin. This is usally the responsiblity of the controls

Most built-in plugins use a bottom toolbar with a form as Controls. See for example the image plugin which allows to define the image url and other properties.

Plugins have two parts, one plugin definition and a ReactJS component. A minimal plugin definition looks as followed

```jsx
import React, { Component } from "react";

// You are obviously not limited to material-ui, but we really enjoy
// the material-ui svg icons!
import StarIcon from "material-ui/svg-icons/toggle/star";

// This is the ReactJS component which you can find below this snippet
import InputTextField from "./Component";

export default {
  Component: InputTextField,
  IconComponent: <StarIcon />,
  name: "example/content/input-text-field",
  version: "0.0.1",
  text: "Input Text Field"
};
```

and a minimalistic plugin example could look like:

```jsx
import React from "react";

// A callback function for the input field
const onInput = onChange => {
  return e => {
    // Dispatch the onChange action with the new value
    onChange({
      value: e.target.value
    });
  };
};

const InputTextField = props => {
  const {
    state: { value },
    readOnly,
    onChange
  } = props;

  // If readOnly is false, it means that we are in edit mode!
  if (!readOnly) {
    return (
      <div className="my-plugin">
        <input type="text" onChange={onInput(onChange)} value={value} />
      </div>
    );
  }

  // If we are not in edit mode, remove the input field
  return <div className="my-plugin">{value}</div>;
};

export default InputTextField;
```

Of course, there are more settings and callbacks available. We encourage checking out the API docs on this topic!

Make sure the `onChange` prop is never passed through to an HTML element (eg via `{...props}`), as this will overwrite the state of your plugin with any change event emitted by that element. This applies to both content and layout plugins.

### Writing a layout plugin

A layout plugin will require an initial children, otherwise, it will automatically destroyed. A minimal layout plugin definition looks as follows

```jsx
import React from "react";
import slate from "@react-page/plugins-slate";

// You are obviously not limited to material-ui, but we really enjoy
// the material-ui svg icons!
import CropSquare from "material-ui/svg-icons/image/crop-square";

const BlackBorderPlugin = ({ children }) => (
  <div style={{ border: "1px solid black", padding: "16px" }}>{children}</div>
);

export default {
  Component: BlackBorderPlugin,
  IconComponent: <CropSquare />,
  name: "example/layout/black-border",
  version: "0.0.1",
  text: "Black border",
  createInitialChildren: () => [
    [
      {
        content: { plugin: slate() }
      }
    ]
  ]
};
```

On that example, the initial children is a slate plugin.

See [slate](./slate.md) for a more in-depth example

## Handling native drag events

The React Page is capable of handling native drag and drop events. Native events include dragging of links, text,
and images. Native drag support can be enabled by writing a `NativePlugin` and passing it during instantiation.
In this example, we will use the default plugin, and take a look at how you can create your own later.

```jsx
import native from "@react-page/plugins-default-native";

const editor = new Editor({
  plugins: {
    layout: [],
    content: [],
    native
  }
});
```

If native is undefined or null, native dragging wil be disabled. This is the default setting.

Writing a native plugin is like writing a content or layout plugin. The only difference is that our native plugin must
be wrapped in a factory that receives three arguments - `hover`, `monitor`, and `component`. Hover is the cell or row
that is currently being hovered. Monitor is the [DropTargetMonitor](https://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html)
coming from react-dnd and `component` is the React component of the cell or row that is currently being hovered.

In sum, an exemplary plugin looks like this:

```jsx
import React from "react";

const Native = () => <div>native</div>;

export default (hover, monitor, component) => ({
  Component: Native,
  name: "my-native-plugin",
  version: "0.0.1"
});
```

Because this plugin is wrapped in a factory, we are able to modify its behaviour based on the properties we receive.
One such example would be to add the item's data to the initial state for later use.

```jsx
export default (hover, monitor, component) => ({
  // ...
  createInitialState: () => ({
    item: monitor.getItem()
  })
});
```

Per default, the editor assumes that dropping the native element creates a content cell. To change this behaviour, use
the key `type`:

```jsx
export default (hover, monitor, component) => ({
  // ...
  type: "layout"
});
```
