/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import Plugin from './index'

describe('plugins/content/placeholder/Component', () => {
  it('should render', () => {
    const { Component } = new Plugin()
    const component = renderer.create(<Component />)
    expect(component).toMatchSnapshot()
  })
})
