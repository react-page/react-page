import React from 'react'
import FilterFrames from 'material-ui/svg-icons/image/filter-frames'
import { createRowPlaceholder } from 'src/editor/plugins/content/placeholder'
import { LayoutPlugin } from 'src/editor/service/plugin/classes'

const Spoiler = ({ children, state }) => (
  <div style={{ border: '1px solid grey' }}>
    <div {...state}>
      {children}
    </div>
  </div>
)

Spoiler.propTypes = {}

export default class SpoilerPlugin extends LayoutPlugin {
  Component = Spoiler
  name = 'ory/layout/spoiler'
  version = '0.0.1'
  icon = <FilterFrames />
  text = 'Spoiler'

  createInitialState = createRowPlaceholder
}
