// @flow
import React from 'react'
import Display from '../Display'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import type { PropTypes } from '../index.js'

import { BottomToolbar } from 'ory-editor-ui'

const handleChange = (onChange: Function) => (e: Event) => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    const change = {}

    if (target.name === 'target') {
      if (target.checked) {
        change.target = '_blank'
        // noopener is safer but not supported in IE, so noreferrer adds some security
        change.rel = 'noreferrer noopener'
      } else {
        change.target = null
        change.rel = null
      }
    } else {
      change[target.name] = target.value
    }

    onChange(change)
    return
  }
}

const Form = (props: PropTypes) => (
  <div>
    <Display {...props} />
    <BottomToolbar open={props.focused}>
      <TextField
        hintText="http://example.com/image.png"
        floatingLabelText="Image location (url)"
        inputStyle={{ color: 'white' }}
        floatingLabelStyle={{ color: 'white' }}
        hintStyle={{ color: 'grey' }}
        name="src"
        style={{ width: '512px' }}
        value={props.state.src}
        onChange={handleChange(props.onChange)}
      />
      <br/>
      <TextField
        hintText="http://example.com"
        floatingLabelText="Link location (url)"
        inputStyle={{ color: 'white' }}
        floatingLabelStyle={{ color: 'white' }}
        hintStyle={{ color: 'grey' }}
        name="href"
        style={{ width: '512px' }}
        value={props.state.href}
        onChange={handleChange(props.onChange)}
      />
      <br/>
      <br/>
      <Checkbox
        checked={props.state.target === '_blank'}
        iconStyle={{fill: 'white', textAlign: 'left'}}
        label="Open in new window"
        labelStyle={{color: 'white', textAlign: 'left'}}
        name="target"
        onCheck={handleChange(props.onChange)}
      />
    </BottomToolbar>
  </div>
)

export default Form
