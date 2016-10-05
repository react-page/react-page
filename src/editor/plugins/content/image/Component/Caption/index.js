// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import styles from './index.scoped.css'
import type { PropTypes } from '../index.js'

const Caption = ({ state: { caption } }: PropTypes) => caption ? (
  <p styleName="caption">
    <small>{caption}</small>
  </p>
) : (
  null
)
export default cssModules(Caption, styles, { allowMultiple: true })
