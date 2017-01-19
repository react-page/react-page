// @flow
import React from 'react'
import Display from './Display'
import Form from './Form'
import type { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes'

export type PropTypes = ContentPluginProps<{ src: string, caption: string }>

const Image = (props: PropTypes) => props.readOnly ? (
  <Display {...props} />
) : (
  <Form {...props} />
)

export default Image
