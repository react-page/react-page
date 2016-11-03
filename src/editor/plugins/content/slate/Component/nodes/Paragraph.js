import React, { Component } from 'react'
import { Placeholder } from 'slate'
import { placeholder } from '../../const.js'
import shallowEqual from 'fbjs/lib/shallowEqual'
import cssModules from 'react-css-modules'

import styles from './index.scoped.css'

class Paragraph extends Component {
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps)
  }

  props: {
    children: any,
    state: any,
    node: any,
    attributes: any
  }

  render() {
    const { node, state, children, attributes } = this.props
    const align = this.props.node.data.get('align')
    return (
      <p {...attributes} style={{ textAlign: align }}>
        <Placeholder
          styleName="placeholder"
          node={node}
          parent={state.document}
          state={state}
          style={{ top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >{placeholder}</Placeholder>
        {children}
      </p>
    )
  }
}

export default cssModules(Paragraph, styles)
