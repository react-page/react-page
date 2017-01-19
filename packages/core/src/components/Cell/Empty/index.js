// @flow
import React, { PropTypes } from 'react'

// logger.error('Got empty cell: ', props)
const Empty = ({ id = 'no id given', ...props }: { id: string }) => (
  <div className="ory-cell-empty">
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

Empty.propTypes = {
  id: PropTypes.string
}

export default Empty
