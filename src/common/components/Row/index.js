import React from 'react'

const inner = ({ cells }) => (
    cells.map((cell) => <Cell {{...cell}} />)
)

const Row = ({ Wrap, ...props }) => (
    Boolean(Wrap) ? <Wrap>{inner(props)}</Wrap> : <div>inner(props)</div>
)

export default Row
