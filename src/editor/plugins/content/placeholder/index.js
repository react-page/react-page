// @flow
import Component from './Component'
import placeholder from 'src/editor/plugins/content/placeholder'
import uuid from 'node-uuid'
import { ContentPlugin } from 'src/editor/service/plugin/classes'

export const createRowPlaceholder = (): Object => ({
  id: uuid.v4(),
  rows: [{
    id: uuid.v4(),
    cells: [{
      plugin: placeholder,
      id: uuid.v4(),
    }]
  }]
})

export default class PlaceholderPlugin extends ContentPlugin {
  Component = Component
  name = 'ory/content/placeholder'
  version = '0.0.1'
}
