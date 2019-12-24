# Tutorials

## React Example

In this section, we will create a minimalistic react app that uses the React Page.
Before we skip ahead, make sure that [node.js](https://nodejs.org/en/) is installed on your system.

### [React](https://facebook.github.io/react/)

Our goal is to create a React app that uses the editor.
To scaffold the react app for the purpose of this tutorial, we use [create-react-app](https://github.com/facebookincubator/create-react-app)

```
$ npm i -g create-react-app
$ create-react-app .
```

and install the editor using npm or yarn:

```
$ yarn add @react-page/react-page
$ npm i --save @react-page/react-page
```

Next, open the file _src/components/App.js_ and include the React Page:

```jsx
import React, { useState } from "react";

// The editor core
import Editor from "@react-page/editor";
import "@react-page/core/lib/index.css"; // we also want to load the stylesheets
// Require editor ui stylesheet
import "@react-page/ui/lib/index.css";

// Load some exemplary plugins:
import slate from "@react-page/plugins-slate"; // The rich text area plugin
import "@react-page/plugins-slate/lib/index.css"; // Stylesheets for the rich text area plugin
import background from "@react-page/plugins-background"; // A plugin for background images
import "@react-page/plugins-background/lib/index.css"; // Stylesheets for  background layout plugin

// Define which plugins we want to use. We only have slate and background available, so load those.
const plugins = {
  content: [slate()], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
  layout: [background({ defaultPlugin: slate() })] // Define plugins for layout cells
};

const App = () => {
  const [editorValue, setEditorValue] = useState(initialState);
  // save the state somewhere
  const saveToDatabase = useCallback(() => {
    return fetch("/my/save/url", { method: "POST", body: editorvalue });
  }, []);
  return (
    <div>
      <Editor plugins={plugins} value={editorValue} onChange={setEditorValue} />
      <toolbar>
        <button onClick={saveToDatabase}>Save</button>
      </toolbar>
    </div>
  );
};

export default App;
```

That's it, congratulations! You should see something like this now:

![Example app](/docs/images/react-example-app.png)

## Rendering without editor-ui

`@react-page/editor` also can be used with `readOnly={true}`, which does not load the editor-ui. We use code-splitting for that using `import()` functions. That works only, if your bundler supports that (e.g. webpack):

```jsx
import React, { useState } from "react";

// The editor core
import Editor from "@react-page/editor";
import "@react-page/core/lib/index.css"; // we also want to load the stylesheets

// Load some exemplary plugins:
import slate from "@react-page/plugins-slate"; // The rich text area plugin
import "@react-page/plugins-slate/lib/index.css"; // Stylesheets for the rich text area plugin
import background from "@react-page/plugins-background"; // A plugin for background images
import "@react-page/plugins-background/lib/index.css"; // Stylesheets for  background layout plugin

// Define which plugins we want to use. We only have slate and background available, so load those.
const plugins = {
  content: [slate()], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
  layout: [background({ defaultPlugin: slate() })] // Define plugins for layout cells
};

const App = () => {
  return (
    <div>
      <Editor value={yourSavedValue} plugins={plugins} readOnly />
    </div>
  );
};

export default App;
```
