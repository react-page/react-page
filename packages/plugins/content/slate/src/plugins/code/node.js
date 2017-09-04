import React from 'react'

const Code = ({ attributes, children }: { attributes: any, children: any }) => (
  <pre {...attributes} style={{ overflow: 'scroll' }}>
    <code>{children}</code>
  </pre>
)

export default Code
