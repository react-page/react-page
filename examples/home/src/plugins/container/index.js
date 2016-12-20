import React from 'react'
import Reorder from 'material-ui/svg-icons/action/reorder'
import Slate from 'src/editor/plugins/content/slate'
import uuid from 'uuid/v4'

type Props = {
  children: Node,
  readOnly: boolean,
  state: {style: string },
  onChange(state: Object): void
}

const ContainerComponent = ({ children }: Props) => (
  <div className="container">
    {children}
  </div>
)

const defaultPlugin = new Slate()

export default {
  Component: ContainerComponent,
  name: 'home/layout/container',
  version: '0.0.1',
  IconComponent: <Reorder />,
  text: 'Centered container',

  createInitialChildren: () => ({
    id: uuid(),
    rows: [{
      id: uuid(),
      cells: [{
        content: { plugin: defaultPlugin, state: defaultPlugin.createInitialState() },
        id: uuid(),
      }]
    }]
  })
}
