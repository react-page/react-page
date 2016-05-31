import React from 'react'

const inner = ({Plugin, data}) => (
    <Plugin {{...data}} />
)

const Cell = ({ Wrap, ...props }) => (
    Boolean(Wrap) ? <Wrap>{inner(props)}</Wrap> : <div>inner(props)</div>
)

export default Cell
