// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import styles from './index.scoped.css'
import type { PropTypes } from '../index.js'
import TypeException from 'src/editor/exceptions/TypeException'

const handleChange = (onChange: Function) => (e: Event) => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    onChange({ caption: target.value })
    return
  }

  throw new TypeException('target', 'HTMLInputElement', target)
}

const Caption = ({ state: { caption }, onChange, focused, readOnly }: PropTypes) => caption || (focused && !readOnly) ? (
  <p styleName="caption">
    {readOnly ? (
      <small>{caption}</small>
    ) : (
      <small>
        <input styleName="caption" type="text" placeholder="Type caption for image (optional)"
               onChange={handleChange(onChange)} value={caption}
        />
      </small>
    )}
  </p>
) : (
  null
)

export default cssModules(Caption, styles, { allowMultiple: true })
