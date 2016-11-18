/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import MissingPlugin from './index'

describe('plugins/content/missing', () => {
  it('should render', () => {
    const { Component } = MissingPlugin
    const component = renderer.create(<Component name="Foo" version="0.0.1" />)
    expect(component).toMatchSnapshot()
  })
})
