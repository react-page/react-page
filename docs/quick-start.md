## Installation

To install the editor, use:

```bash
$ yarn add @react-page/react-page
$ npm i --save @react-page/react-page
```

## Simple example

To get off the ground as soon as possible, simply create a component like so:

[SimpleExample.tsx](https://raw.githubusercontent.com/react-page/react-page-examples/b8780b3fbbdc60f8337fea7cc0ec05b42da1a1f8/src/SimpleExample.tsx ':include :type=code typescript')

That's it, congratulations! You should see something like this now:

![Example app](images/react-example-app.png)

## Readonly

Simply provide a `readOnly={true}` prop to your editor from previous example.  
We will lazy load the unnecessary UI if you use this approach (using code splitting).

This can greatly decrease the size of this lib. Make sure to use this option if you don't require the editing capabilities of the editor and care about your app size (which you should!)

[SimpleReadonly.tsx](https://raw.githubusercontent.com/react-page/react-page-examples/b8780b3fbbdc60f8337fea7cc0ec05b42da1a1f8/src/SimpleReadonly.tsx ':include :type=code typescript')
