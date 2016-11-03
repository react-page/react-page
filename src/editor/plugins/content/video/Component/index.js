// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import styles from './index.scoped.css'
import type { ContentPluginProps } from 'src/editor/service/plugin/classes'
import Display from './Display'
import Form from './Form'

export type PropTypes = ContentPluginProps<{ src: string, caption: string }>

const Image = (props: PropTypes) => props.readOnly ? (
  <Display {...props} />
) : (
  <Form {...props} />
)

export default cssModules(Image, styles, { allowMultiple: true })
