import React from "react";
import { pluginFactories } from "@react-page/plugins-slate";
import { BlockMath  } from 'react-katex'
import 'katex/dist/katex.min.css'

export default pluginFactories.createComponentPlugin<{
    color: string;
  }>({
  Component: props => {
    return(  
        <div data-slate-void="true">    
          <BlockMath  math={props.formula}/>
            {props.children}
        </div>
    ) 
  },
  addHoverButton: false,
  addToolbarButton: true,
  type: 'Katex',
  object: 'block',
  icon: <span>Katex</span>, // or add a fancy icon
  label: 'Katex',
  schema: {
      type: 'object',
      required: ['formula'],
      properties: {
        formula: {
          type: 'string',
        },
      },
    }
}
);