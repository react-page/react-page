import React from 'react'

const style = {
  backgroundColor: '#eee',
  borderRadius: '4px',
  width: '100%',
  padding: '4px',
  margin: '4px',
  textAlign: 'center',
  opacity: 0.8
}

export const EditView = ({id}) => (
  <div style={style}>
    Drop here {id}
  </div>
)

export const RenderView = ({id}) => (
  <div style={style}>
    Drop here {id}
  </div>
)

export default {
  EditView,
  RenderView
}