/* eslint-env mocha */
import unexpected from 'unexpected'
import PluginService, { defaultContentPlugins, defaultLayoutPlugins } from './index'

const expect = unexpected.clone()

const plugins = new PluginService()

describe('PluginService', () => {
  it('should find plugins', () => {
    defaultContentPlugins.forEach((p) => {
      expect(plugins.findContentPlugin(p.name, p.version), 'to be', p)
    })

    defaultLayoutPlugins.forEach((p) => {
      expect(plugins.findLayoutPlugin(p.name, p.version), 'to be', p)
    })
  })
})
