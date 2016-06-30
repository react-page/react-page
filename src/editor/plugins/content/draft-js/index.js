import React, { PropTypes } from 'react'

const DraftJS = ({ importFromHtml }) => (
  <div>
    <textarea>{importFromHtml}</textarea>
  </div>
)

DraftJS.propTypes = {
  importFromHtml: PropTypes.string
}

export default {
  Component: DraftJS,
  name: 'ory/content/draft-js',
  version: '0.0.1'
}
