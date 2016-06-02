import React from 'react'
import Cell from 'src/common/components/Cell'

const inner = ({cells}) => (
  cells.map((cell) => {
      return (<Cell key={cell.id} {...cell} />)
    }
  )
)

const Row = ({wrap, ...data}) => {
  if (Boolean(wrap)) {
    const {component: WrapComponent, props: wrapProps} = wrap
    return (
      <WrapComponent {...wrapProps}>
        {inner(data)}
      </WrapComponent>
    )
  }

  return (
    <div>
      {inner(data)}
    </div>
  )
}

export default Row