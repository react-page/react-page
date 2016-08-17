import React, { PropTypes, Component } from 'react'
import { Placeholder } from 'slate'
import { placeholder } from '../../const.js'
import shallowEqual from 'fbjs/lib/shallowEqual'
import cssModules from 'react-css-modules'

import styles from './index.scoped.css'

class Paragraph extends Component {
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps)
  }

  render() {
    const { node, state, children, attributes } = this.props
    return (
      <p {...attributes}>
        <Placeholder
          styleName="placeholder"
          node={node}
          parent={state.document}
          state={state}
        >{placeholder}</Placeholder>
        {children}
      </p>
    )
  }
}

Paragraph.propTypes = {
  children: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired
}

export default cssModules(Paragraph, styles)
