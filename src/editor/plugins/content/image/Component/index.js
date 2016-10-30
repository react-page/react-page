// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import styles from './index.scoped.css'
import Display from './Display'
import Form from './Form'
import type { ContentPluginProps } from 'src/editor/service/plugin/classes'

export type PropTypes = ContentPluginProps<{ src: string, caption: string }>

const Image = (props: PropTypes) => props.readOnly ? (
  <Display {...props} />
) : (
  <Form {...props} />
)

export default cssModules(Image, styles, { allowMultiple: true })
