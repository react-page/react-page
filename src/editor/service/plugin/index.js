import { satisfies } from 'semver'
import missing from 'src/editor/plugins/content/missing'
import draft from 'src/editor/plugins/content/draft-js'
import image from 'src/editor/plugins/content/image'
import spacer from 'src/editor/plugins/content/spacer'
import grey from 'src/editor/plugins/layout/grey'
import spoiler from 'src/editor/plugins/layout/spoiler'

export const defaultContentPlugins = [
  missing,
  image,
  spacer,
  draft
]
export const defaultLayoutPlugins = [grey, spoiler]

const find = (name, version) => (plugin) => plugin.name === name && satisfies(plugin.version, version)

export default class PluginService {
  constructor(contentPlugins = defaultContentPlugins, layoutPlugins = defaultLayoutPlugins) {
    this.plugins = {
      content: contentPlugins,
      layout: layoutPlugins
    }

    this.find = this.find.bind(this)
  }

  findLayoutPlugin(name = '', version = '*') {
    return this.find(this.plugins.layout)(name, version) || null
  }

  findContentPlugin(name = '', version = '*') {
    return this.find(this.plugins.content)(name, version) || missing
  }

  find(plugins) {
    return (name, version) => plugins.find(find(name, version))
  }
}
