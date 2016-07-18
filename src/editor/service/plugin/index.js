import { satisfies } from 'semver'
import missing from 'src/editor/plugins/content/missing'
import draft from 'src/editor/plugins/content/draft-js'
import image from 'src/editor/plugins/content/image'
import placeholder from 'src/editor/plugins/content/placeholder'
import spacer from 'src/editor/plugins/content/spacer'
import spoiler from 'src/editor/plugins/layout/spoiler'
import alert from 'src/editor/plugins/layout/alert'

export const defaultContentPlugins = [
  image,
  spacer,
  draft,
  placeholder
]
export const defaultLayoutPlugins = [spoiler, alert]

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

  getRegisteredNames() {
    return [
      ...this.plugins.content.map((p) => p.name),
      ...this.plugins.layout.map((p) => p.name)
    ]
  }
}
