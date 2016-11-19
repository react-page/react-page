import React from 'react'
import Component from './Component'
import Panorama from 'material-ui/svg-icons/toggle/star'

export default {
  Component,
  name: 'example/content/fa-icon',
  version: '0.0.1',
  IconComponent: <Panorama />,
  text: 'Icon',
  inlineable: true,
  onRemoveHotKey: () => Promise.reject()
}
