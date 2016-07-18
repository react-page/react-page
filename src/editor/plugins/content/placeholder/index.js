import React from 'react'
import Component from './Component'
import placeholder from 'src/editor/plugins/content/placeholder'
import uuid from 'node-uuid'

export const createRowPlaceholder = () => ({
  id: uuid.v4(),
  rows: [{
    id: uuid.v4(),
    cells: [{
      plugin: placeholder,
      id: uuid.v4(),
    }]
  }]
})

export default {
  Component,
  name: 'ory/content/placeholder',
  version: '0.0.1'
}
