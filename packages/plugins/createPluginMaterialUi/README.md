# createPluginMaterialUi

With `@react-page/create-plugin-materialui` its easy to create new plugins with custom properties.
It uses [uniforms](https://uniforms.tools) to create the form based on a JSONSchema you provide and will show it in a bottomToolbar similar to the other plugins.

Notice: It is in active development and its api might change, but we would love to get your feedback about it!

_It will only load the form-libraries, if the Editor is in edit mode (See section in the readme about lazy load)! So don't worry about bundle size!_

## Example

```
import { createContentBase} from '@react-page/create-plugin-materialui';
import React from 'react';

const yourCustomPlugin = createContentPlugin({
    Renderer: ({ state }) => (
      <div>
        <p>I am a custom plugin</p>
        <p>this is my configuration:</p>
        <p>Firstname: {state.firstName}</p>
        <p>Lastname: {state.lastName}</p>
        <p>Age: {state.age}</p>
      </div>
    ),
    name: 'custom-content-plugin',
    text: 'Custom content plugin',
    description: 'Some custom content plugin',
    version: '0.0.1',
    // see uniforms for more information on these schemas
    schema: {
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        age: {
          description: 'Age in years',
          type: 'integer',
          minimum: 0,
        },
      },
      required: ['firstName', 'lastName'],
    },
  });
```

## Custom form control fields

If you have a property that is more complicated like e.g. an ImageUploadField,
you can pass your components to the schema, see this section on uniforms: https://uniforms.tools/docs/tutorials-creating-custom-field

Make sure that you lazy-load your custom components:

```
import { lazyLoad } from "@react-page/core"

const MyCustomImageUploadField = lazyLoad(() => import("./path/to/MyCustomImageUploadField));

const yourCustomPlugin = createContentPlugin({
    schema: {
      properties: {
        pictureUrl: {
            type: 'string',
            uniforms: {
                component: MyCustomImageUploadField
            }
        }
      },
    },
  });
```

If you don't lazy load your form components, you might increase your bundle size.

## create layout plugins

its also possible to create layout plugins:

```
import { createLayoutPlugin } from '@react-page/create-plugin-materialui';
```
