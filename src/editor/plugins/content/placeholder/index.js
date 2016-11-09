// @flow
import Component from './Component'
import uuid from 'node-uuid'
import { ContentPlugin } from 'src/editor/service/plugin/classes'

export default class PlaceholderPlugin extends ContentPlugin {
  Component = Component
  name = 'ory/editor/core/content/placeholder'
  version = '0.0.1'
}

export const createRowPlaceholder = (): Object => ({
  id: uuid.v4(),
  rows: [{
    id: uuid.v4(),
    cells: [{
      content: { plugin: new PlaceholderPlugin() },
      id: uuid.v4(),
    }]
  }]
})
