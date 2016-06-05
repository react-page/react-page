import React from 'react'

const EditView = ({content, id}) => (
  <textarea className="form-control" value={ `${content} ${id}` } />
)

const RenderView = ({content, id}) => (
  <div style={{backgroundColor: 'white'}}>
    { content } {id}
  </div>
)

export default {
  EditView,
  RenderView
}