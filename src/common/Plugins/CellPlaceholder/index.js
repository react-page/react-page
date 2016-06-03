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

export const EditView = () => (
  <div style={style}>
    Drop here
  </div>
)

export const RenderView = () => (
  <div style={style}>
    Drop here
  </div>
)

export default {
  EditView,
  RenderView
}