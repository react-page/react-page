import IconButton from 'material-ui/IconButton'
import React from 'react'

export const makeTagNode = Tag => {
  const NodeComponent = ({
    attributes,
    children,
    node
  }: {
    attributes: Object,
    children: any,
    node: any
  }) => {
    const align = node.data.get('align')
    return (
      <Tag {...attributes} style={{ textAlign: align }}>
        {children}
      </Tag>
    )
  }

  NodeComponent.displayName = `${Tag}-node`

  return NodeComponent
}

export const makeTagMark = Tag => {
  const MarkComponent = ({ children }: { children: any }) => (
    <Tag>{children}</Tag>
  )

  MarkComponent.displayName = `${Tag}-mark`

  return MarkComponent
}

export const ToolbarButton = ({
  icon,
  isActive,
  onClick
}: {
  icon: string,
  isActive: string,
  onClick(): void
}) => (
  <IconButton
    onTouchTap={onClick}
    iconStyle={isActive ? { color: 'rgb(0, 188, 212)' } : { color: 'white' }}
  >
    {icon}
  </IconButton>
)
