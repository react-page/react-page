/* eslint-env mocha */
import unexpected from 'unexpected'
import PluginRepository from './index'
import { content } from 'src/editor/service/content/adapter/debug'
import { hydrate } from 'src/editor/service/content'

const expect = unexpected.clone()

const plugins = new PluginRepository()

describe('PluginRepository', () => {
  it('serialize and unserialize should work', () => {
    const c = hydrate(content['1'])
    expect(plugins.serialize(plugins.unserialize(c)), 'to be', c)
  })
})
