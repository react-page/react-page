## Installation

To install the react-page editor, use:

```bash
$ yarn add @react-page/editor
# OR
$ npm i --save @react-page/editor
```

usually you'll also want to have the default rich text editor (slate):

```bash
$ yarn add @react-page/plugins-slate
# OR
$ npm i --save @react-page/plugins-slate
```

## Dependencies

**IMPORTANT**: use react 17 at the moment, react 18 is not yet supported. Follow this milestone: https://github.com/react-page/react-page/milestone/14

React-page uses [MUI](https://mui.com/) for the Editor UI. It is lazy loaded and do not directly increase your bundle size.

If you want to override the theme, please add these packages as well: `@emotion/react`, `@emotion/styled`

```bash
$ yarn add @emotion/react @emotion/styled
# OR
$ npm i --save @emotion/react @emotion/styled
```

Make sure to import the css file as well somewhere in your app:

```
import '@react-page/editor/lib/index.css';
```

## Using material-ui 4 in parallel

MUI 5 conflicts with material-ui version 4 which results in glitches. To fix this, follow this guide: https://mui.com/x/react-data-grid/migration-v4/#using-mui-core-v4-with-v5

tldr:

wrap your app with this:

```tsx
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  // By enabling this option, if you have non-MUI elements (e.g. `<div />`)
  // using MUI classes (e.g. `.MuiButton`) they will lose styles.
  // Make sure to convert them to use `styled()` or `<Box />` first.
  disableGlobal: true,
  // Class names will receive this seed to avoid name collisions.
  seed: 'mui-jss',
});

// ....

const App = () => (
  <StylesProvider generateClassName={generateClassName}>
    {/* Your component tree. */}
  </StylesProvider>
);
```

## Simple example

To get off the ground as soon as possible, simply create a component like so:

[simple.tsx](examples/pages/examples/simple.tsx ':include :type=code typescript')

That's it, congratulations!

[You should see something like this now (click for the demo)](//demo/simple)

## Modes of operation

### Editing

React-page editor together with various plugins can be used to create and subsequently edit pages in a “WYSIWYG” mode. The editing UI code is lazy loaded in this case.

### Viewing

The React-page editor can seamlessly be used to view the pages created by it in a "readonly" mode. The bundle size is reduced in this mode.

Simply pass `readOnly` to the Editor and omit the `onChange`:

[readonly.tsx](examples/pages/examples/readonly.tsx ':include :type=code typescript')

(see demo here)](//demo/examples/readonly)
