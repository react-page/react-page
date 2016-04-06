import { configure } from '@kadira/storybook'

const loadStories = () => {
  require('../src/common/components/App/stories')
}

configure(loadStories(), module)
