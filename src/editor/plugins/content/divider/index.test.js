/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import Divider from './index'

describe('plugins/content/missing', () => {
  it('should render', () => {
    const { Component } = Divider
    const component = renderer.create(<Component />)
    expect(component).toMatchSnapshot()
  })
})
