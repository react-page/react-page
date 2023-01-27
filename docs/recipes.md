## Add additional controls to all cell plugins

Consider you want to add custom styling to all plugins. Because a `CellPlugin` is just an object, its easy to customize it.
You can use a map function to customize a list of plugings:

```tsx
import { CellPlugin } from '@react-page/editor';

const rawCellPlugins = [slate(), image, background, myPlugin];

type Styling = {
  padding?: number;
};

const myCellPlugins = rawCellPlugins.map<CellPlugin<Styling>>((plugin) => {
  return {
    ...plugin,
    // customize cellStyle
    // you could also wrap `Renderer` in an additional Component
    cellStyle: (data) => ({
      padding: data.padding,
    }),
    controls: [
      {
        title: 'Main',
        controls: p.controls,
      },
      {
        title: 'Styling',
        controls: {
          type: 'autoform',
          schema: {
            properties: {
              padding: {
                type: 'number',
              },
            },
          },
        },
      },
    ],
  };
});
```

Full Example:

[See working example here](//demo/examples/decorateplugins)

<details>
  <summary>Show example (click to expand)</summary>

[decorateplugins.tsx](examples/pages/examples/decorateplugins.tsx ':include :type=code typescript')

</details>
