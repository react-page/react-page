import Editor from 'src/editor'
import VideoPlugin from './plugins/video'
import ContainerPlugin from './plugins/container'
import { PluginService, defaultLayoutPlugins, defaultContentPlugins } from 'src/editor/service'
import content from './content.js'

const editor = new Editor({
  plugins: new PluginService(defaultContentPlugins, [
    ...defaultLayoutPlugins,
    new VideoPlugin(),
    new ContainerPlugin()
  ])
})

// editor.renderToHtml()

const elements = document.querySelectorAll('.editable')

editor.renderControls()
for (const element of elements) {
  editor.render(element, content[element.dataset.editable])
}
