import React from 'react'

const TextArea = ({ inner }) => (
    <input type="textarea">
        { inner }
    </input>
)

const Render = ({ inner }) => (
    <div>{ inner }</div>
)

export const {
    EditView: TextArea,
    RenderView: Render
}
