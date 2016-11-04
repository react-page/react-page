/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import Plugin from './index'

jest.mock('react-dom')

describe('plugins/content/image/Component', () => {
  it('should render', () => {
    const { Component } = new Plugin()
    const component = renderer.create(<Component state={{ src: 'foo', caption: 'bar' }} />)
    expect(component).toMatchSnapshot()
  })
})
