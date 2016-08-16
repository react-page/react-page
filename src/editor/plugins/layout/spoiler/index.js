import React from 'react'
import FilterFrames from 'material-ui/svg-icons/image/filter-frames'
import { createRowPlaceholder } from 'src/editor/plugins/content/placeholder'

const Spoiler = (props) => (
  <div style={{ border: '1px solid grey' }}>
    <div {...props} />
  </div>
)

Spoiler.propTypes = {}

const hooks = {
  createInitialState: createRowPlaceholder
}

export default {
  Component: Spoiler,
  name: 'ory/layout/spoiler',
  version: '0.0.1',
  icon: <FilterFrames />,
  text: 'Spoiler',
  hooks
}
