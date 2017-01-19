import { shallow } from 'enzyme'
import React from 'react'
import plugin from './index.js'

describe('plugins/skeleton', () => {
  it('has a name', () => {
    expect(plugin.name).toBe('skeleton')
  })

  it('has a version', () => {
    expect(plugin.version).toBe('0.0.1')
  })

  describe('Component', () => {
    it('renders a single div', () => {
      const { Component } = plugin
      const wrapper = shallow(<Component />)
      expect(wrapper.find('div')).toHaveLength(1)
    })
  })
})
