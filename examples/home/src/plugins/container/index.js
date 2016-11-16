import React from 'react'
import Reorder from 'material-ui/svg-icons/action/reorder'
import Slate from 'src/editor/plugins/content/slate'
import uuid from 'node-uuid'

type Props = {
  children: Node,
  readOnly: boolean,
  state: {style: string },
  onChange(state: Object): void
}

const Container = ({ children }: Props) => (
  <div className="container">
    {children}
  </div>
)

const defaultPlugin = new Slate()

Container.config = {
  name: 'home/layout/container',
  version: '0.0.1',
  icon: <Reorder />,
  text: 'Centered container',

  createInitialChildren: () => ({
    id: uuid.v4(),
    rows: [{
      id: uuid.v4(),
      cells: [{
        content: { plugin: defaultPlugin, state: defaultPlugin.createInitialState() },
        id: uuid.v4(),
      }]
    }]
  })
}

export default Container
