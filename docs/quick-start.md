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

React-page uses [Material UI](https://material-ui.com/) under the hood. The following packages need to be installed, if they are not already installed:
1. `@material-ui/core`
2. `@material-ui/styles`
3. `@material-ui/icons`

These packages are lazy loaded and do not directly increase your bundle size.

```bash
$ yarn add @material-ui/core @material-ui/styles @material-ui/icons
# OR
$ npm i --save @material-ui/core @material-ui/styles @material-ui/icons
```

## Modes of operation
### Editing

React-page editor together with various plugins can be used to create and subsequently edit pages in a “WYSIWYG” mode. The editing UI code is lazy loaded in this case.

### Viewing

The React-page editor can seamlessly be used to view the pages created by it in a "readonly" mode. The bundle size is reduced in this mode.
