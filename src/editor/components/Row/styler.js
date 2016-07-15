import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'

const inner = (styles) => cssModules(({ children }) => (
  <div styleName="row" className="editor-row">
    {children}
  </div>
), styles)
