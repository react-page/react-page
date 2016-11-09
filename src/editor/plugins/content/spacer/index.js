// @flow
import React from 'react'
import Component from './Component'
import AspectRatio from 'material-ui/svg-icons/action/aspect-ratio'
import { ContentPlugin } from 'src/editor/service/plugin/classes'

class SpacerPlugin extends ContentPlugin {
  Component = Component
  name = 'ory/editor/core/content/spacer'
  version = '0.0.1'
  icon = <AspectRatio />
  text = 'Spacer'
}

export default SpacerPlugin
