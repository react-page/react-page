 // @flow
import Component from './Component'
import uuid from 'uuid'

const plugin = {
  Component,
  name: 'ory/editor/core/content/placeholder',
  version: '0.0.1'
}

export const createRowPlaceholder = (): Object => ({
  id: uuid.v4(),
  rows: [{
    id: uuid.v4(),
    cells: [{
      content: { plugin },
      id: uuid.v4(),
    }]
  }]
})

export default plugin
