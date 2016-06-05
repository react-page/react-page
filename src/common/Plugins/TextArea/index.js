import React from 'react'

const EditView = ({content, id}) => (
  <textarea readOnly className="form-control" value={ `${content} ${id}` } />
)

const RenderView = ({content, id}) => (
  <div>
    { content } {id}
  </div>
)

export default {
  EditView,
  RenderView
}