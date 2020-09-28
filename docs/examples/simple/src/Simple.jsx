import React, { useState } from "react";

// The editor core
import Editor from "@react-page/editor";

// we also want to load the stylesheets
import "@react-page/core/lib/index.css"; 
// Require editor ui stylesheet
import "@react-page/ui/lib/index.css";

// Load some exemplary plugins:

// The rich text area plugin
import slate from "@react-page/plugins-slate";
// Stylesheets for the rich text area plugin
import "@react-page/plugins-slate/lib/index.css";

// A plugin for background images
import background from "@react-page/plugins-background";
// Stylesheets for  background layout plugin
import "@react-page/plugins-background/lib/index.css"; 

// Define which plugins we want to use. 
// We only have slate and background available, so load those.
const plugins = {
  // Define plugins for content cells. 
  // To import multiple plugins, use [slate(), image, spacer, divider]
  content: [slate()],
  
  // Define plugins for layout cells
  layout: [background({ defaultPlugin: slate() })] 
};

const Simple = () => {
  const [editorValue, setEditorValue] = useState(null);
  return (
    <Editor 
      plugins={plugins} 
      defaultPlugin={slate()}
      value={editorValue} 
      onChange={setEditorValue} />
  );
};
export default Simple;
