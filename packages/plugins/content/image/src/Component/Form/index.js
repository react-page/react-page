// @flow
import React from 'react'
import Display from '../Display'
import TextField from 'material-ui/TextField'
import type { PropTypes } from '../index.js'

import { BottomToolbar } from 'ory-editor-ui'

const handleChange = (onChange: Function) => (e: Event) => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    onChange({ src: target.value })
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
        style={{ width: '512px' }}
        value={props.state.src}
        onChange={handleChange(props.onChange)}
      />
    </BottomToolbar>
  </div>
)

export default Form
