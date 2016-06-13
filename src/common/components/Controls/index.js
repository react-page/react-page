import React from 'react'

const Controls = ({ controls }) => (
    <div>
        { controls.map(controls, ({ Control, props }) => <Control {{ ...props }} />) }
    </div>
)

export default Controls