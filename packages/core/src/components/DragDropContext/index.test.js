import { shallow } from 'enzyme'
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext as dragDropContext } from 'react-dnd'

import component from './index.js'

const Component = component(dragDropContext(HTML5Backend))

describe('components/DragDropContext', () => {
  it('renders a single div', () => {
    const wrapper = shallow(
      <Component>
        <div className="foo" />
      </Component>
    )
    expect(wrapper.find('.foo')).toHaveLength(1)
  })
})
