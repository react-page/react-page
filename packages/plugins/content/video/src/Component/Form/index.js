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
        hintText="https://www.youtube.com/watch?v=ER97mPHhgtM"
        floatingLabelText="Video location (YouTube / Vimeo)"
        inputStyle={{ color: 'white' }}
        floatingLabelStyle={{ color: 'white' }}
        hintStyle={{ color: 'grey' }}
        style={{ width: '512px' }}
        value={props.state.src || ''}
        onChange={handleChange(props.onChange)}
      />
    </BottomToolbar>
  </div>
)

export default Form
