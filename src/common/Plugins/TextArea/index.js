import React from 'react'

const EditView = ({content}) => (
  <textarea readOnly className="form-control" value={ content } />
)

const RenderView = ({content}) => (
  <div>
    { content }
  </div>
)

export default {
  EditView,
  RenderView
}