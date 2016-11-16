// @flow
import uuid from 'node-uuid'
import React from 'react'
import cssModules from 'react-css-modules'

import styles from './index.scoped.css'

const Placeholder = () => (
  <div styleName="placeholder">
    Drop items above, below, left of or right of here.
  </div>
)

Placeholder.config = {
  name: 'ory/editor/core/content/placeholder',
  version: '0.0.1'
}

export const createRowPlaceholder = (): Object => ({
  id: uuid.v4(),
  rows: [{
    id: uuid.v4(),
    cells: [{
      content: { plugin: Placeholder },
      id: uuid.v4(),
    }]
  }]
})


export default cssModules(Placeholder, styles)
