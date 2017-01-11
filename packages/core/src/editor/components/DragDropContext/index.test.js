import { shallow } from 'enzyme'
import React from 'react'

import Component from './index.js'

describe('components/DragDropContext', () => {
  it('renders a single div', () => {
    const wrapper = shallow(<Component />)
    expect(wrapper.find('div')).toHaveLength(1)
  })
})
