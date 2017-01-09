// @flow
import React from 'react'
import type { ContentPluginProps } from 'src/editor/service/plugin/classes'
import Display from './Display'
import Form from './Form'

export type PropTypes = ContentPluginProps<{ src: string, caption: string }>

const Video = (props: PropTypes) => props.readOnly ? (
  <Display {...props} />
) : (
  <Form {...props} />
)

export default Video
