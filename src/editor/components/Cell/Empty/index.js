import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'

import styles from './index.scoped.css'

const Empty = ({ id = 'no id given', plugin, props = {} }) => <div styleName="empty">
  <strong>An error occurred!</strong>
  <small>
    <dl>
      <dt>Cause:</dt>
      <dd>The content plugin could not be found. Check the console to investigate the cause.</dd>
      <dt>Cell:</dt>
      <dd>{id}</dd>
      <dt>Data:</dt>
      <dd><code>{JSON.stringify(props, null, 4)}</code></dd>
    </dl>
  </small>
</div>

Empty.propTypes = {
  id: PropTypes.string,
  props: PropTypes.object
}

export default cssModules(Empty, styles)
