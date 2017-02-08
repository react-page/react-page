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

  const np = { name: 'baz', version: '0.0.1', Component: <div /> }
  it('should register a content plugin', () => {
    plugins.registerContentPlugin(np)
    expect(plugins.findContentPlugin(np.name, np.version).name, 'to equal', np.name)
    expect(plugins.plugins.content.length, 'to equal', 3)
  })

  it('should deregister a content plugin', () => {
    plugins.deregisterContentPlugin(np.name)
    expect(plugins.plugins.content.length, 'to equal', 2)
  })

  it('should register a layout plugin', () => {
    plugins.registerLayoutPlugin(np)
    expect(plugins.findLayoutPlugin(np.name, np.version).name, 'to equal', np.name)
    expect(plugins.plugins.layout.length, 'to equal', 2)
  })

  it('should deregister a layout plugin', () => {
    plugins.deregisterLayoutPlugin(np.name)
    expect(plugins.plugins.layout.length, 'to equal', 1)
  })
})
