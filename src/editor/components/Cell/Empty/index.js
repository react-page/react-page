// @flow
import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'
import logger from 'src/editor/service/logger'

import styles from './index.scoped.css'

const Empty = ({ id = 'no id given', ...props }: { id: string }) => {
  // logger.error('Got empty cell: ', props)
  return (
    <div styleName="empty">
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
  )
}

Empty.propTypes = {
  id: PropTypes.string
}

export default cssModules(Empty, styles)
