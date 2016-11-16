// @flow
/* eslint-disable no-duplicate-imports */
import React from 'react'
import Panorama from 'material-ui/svg-icons/image/panorama'
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

Image.config = {
  name: 'ory/editor/core/content/image',
  version: '0.0.1',
  Icon: <Panorama />,
  text: 'Image',
  inlineable: true,
  handleRemoveHotKey: (_: Event, __: ContentPluginProps<*>): Promise<*> => Promise.reject(),

  // We need this because otherwise we lose hotkey focus on elements like spoilers.
  // This could probably be solved in an easier way by listening to window.document?
  //
  onFocus: (props: any, source: any, ref: HTMLElement) => {
    if (!ref) {
      return
    }
    setTimeout(() => ref.focus())
  }
}

export default cssModules(Image, styles, { allowMultiple: true })
