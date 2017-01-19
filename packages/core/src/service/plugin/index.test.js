import React from 'react'
import unexpected from 'unexpected'

import PluginService from './index'

const expect = unexpected.clone()
const content = [{ name: 'foo', version: '0.0.1', Component: <div /> }]
const layout = [{ name: 'bar', version: '0.0.2', Component: <div /> }]

const plugins = new PluginService({ content, layout })

describe('PluginService', () => {
  content.forEach((p) => {
    it(`should find plugin ${p.name} ${p.version}`, () => {
      expect(plugins.findContentPlugin(p.name, p.version).name, 'to equal', p.name)
    })
  })

  layout.forEach((p) => {
    it(`should find plugin ${p.name} ${p.version}`, () => {
      expect(plugins.findLayoutPlugin(p.name, p.version).name, 'to equal', p.name)
    })
  })
})
