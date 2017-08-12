import React from 'react'

const Link = ({
  attributes,
  children,
  node
}: {
  attributes: any,
  children: any,
  node: { data: any }
}) => {
  const { data } = node
  const href = data.get('href')

  return (
    <a {...attributes} href={href}>
      {children}
    </a>
  )
}

export default Link
