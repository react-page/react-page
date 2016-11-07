import React from 'react'

export type PropTypes = {
  state: { src: string, caption: string },
  onChange(): void,
  readOnly: boolean,
  focused: boolean
}

const FaIcon = (props: PropTypes) => {
  const { state: { icon, style }, readOnly } = props
  return (
    <div>
      {
        readOnly ? (
          <ul className="major-icons">
            <li><span className={`icon style${style} major ${icon}`} /></li>
          </ul>
        ) : (
          <ul className="major-icons">
            <li><span className={`icon style${style} major ${icon}`} /></li>
          </ul>
        )
      }
    </div>
  )
}

export default FaIcon
