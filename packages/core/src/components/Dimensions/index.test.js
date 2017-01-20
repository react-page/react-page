import { shallow } from 'enzyme'
import React from 'react'

import dimensions from './index.js'

describe('components/Dimensions', () => {
  xit('renders the children it gets', () => {
    const Inner = () => <p>foo</p>
    const WrappedInner = dimensions()(Inner)
    const wrapper = shallow(<WrappedInner />)
    expect(wrapper.find('p')).toHaveLength(1)
  })
})
