// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import styles from './index.scoped.css'
import Notifier from 'src/editor/components/Notifier'
import Display from './Display'
import Form from './Form'

export type PropTypes = {
  state: { src: string, caption: string },
  onChange(): void,
  readOnly: boolean,
  focused: boolean
}

const Image = (props: PropTypes) => {
  const { focused, readOnly } = props

  return (
    <div>
      {
        readOnly ? (
          <Display {...props} />
        ) : (
          <div>
            <Form {...props} />
          </div>
        )
      }
    </div>
  )
}

export default cssModules(Image, styles, { allowMultiple: true })
