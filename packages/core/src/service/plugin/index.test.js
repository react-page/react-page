/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import React from 'react'
import unexpected from 'unexpected'

import PluginService from './index'

const expect = unexpected.clone()
const content = [{ name: 'foo', version: '0.0.1', Component: <div /> }]
const layout = [{ name: 'bar', version: '0.0.2', Component: <div /> }]

const plugins = new PluginService({ content, layout })

describe('PluginService', () => {
  content.forEach(p => {
    it(`should find plugin ${p.name} ${p.version}`, () => {
      expect(
        plugins.findContentPlugin(p.name, p.version).name,
        'to equal',
        p.name
      )
    })
  })

  layout.forEach(p => {
    it(`should find plugin ${p.name} ${p.version}`, () => {
      expect(
        plugins.findLayoutPlugin(p.name, p.version).name,
        'to equal',
        p.name
      )
    })
  })

  const np = { name: 'baz', version: '0.0.1', Component: <div /> }
  it('should add a content plugin', () => {
    plugins.addContentPlugin(np)
    expect(
      plugins.findContentPlugin(np.name, np.version).name,
      'to equal',
      np.name
    )
    expect(plugins.plugins.content.length, 'to equal', 3)
  })

  it('should remove a content plugin', () => {
    plugins.removeContentPlugin(np.name)
    expect(plugins.plugins.content.length, 'to equal', 2)
  })

  it('should set content plugins', () => {
    plugins.setContentPlugins([np])
    expect(
      plugins.findContentPlugin(np.name, np.version).name,
      'to equal',
      np.name
    )
    expect(plugins.plugins.content.length, 'to equal', 2)
  })

  it('should add a layout plugin', () => {
    plugins.addLayoutPlugin(np)
    expect(
      plugins.findLayoutPlugin(np.name, np.version).name,
      'to equal',
      np.name
    )
    expect(plugins.plugins.layout.length, 'to equal', 2)
  })

  it('should remove a layout plugin', () => {
    plugins.removeLayoutPlugin(np.name)
    expect(plugins.plugins.layout.length, 'to equal', 1)
  })

  it('should set layout plugins', () => {
    plugins.setLayoutPlugins([np])
    expect(
      plugins.findLayoutPlugin(np.name, np.version).name,
      'to equal',
      np.name
    )
    expect(plugins.plugins.layout.length, 'to equal', 1)
  })

  it('should tell me when no native plugin is set', () => {
    expect(plugins.hasNativePlugin(), 'to be falsy')
  })

  it('should tell me when no native plugin is set', () => {
    const plugins = new PluginService({
      content,
      layout,
      native: () => ({
        Component: () => <div />,
        name: 'ory/editor/core/content/default-native',
        version: '0.0.1',
        createInitialState: () => ({})
      })
    })
    expect(plugins.hasNativePlugin(), 'to be truthy')
    expect(plugins.createNativePlugin(), 'to be defined')
  })
})
