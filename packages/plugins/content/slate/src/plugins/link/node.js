import React, { PropTypes } from 'react'

const Link = ({ attributes, children, node }) => {
  const { data } = node
  const href = data.get('href')

  return <a {...attributes} href={href}>{children}</a>
}

Link.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired,
  node: PropTypes.shape({
    data: PropTypes.any
  })
}

export default Link
