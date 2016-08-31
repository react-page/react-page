// @flow
import { Card, CardHeader, CardText } from 'material-ui/Card'
import React from 'react'
import cssModules from 'react-css-modules'
import Announcement from 'material-ui/svg-icons/action/announcement'
import Slate from 'src/editor/plugins/content/slate'
import { LayoutPlugin } from 'src/editor/service/plugin/classes'
import uuid from 'node-uuid'
import TypeException from 'src/editor/exceptions/TypeException'

import styles from './index.scoped.css'

type Props = {
  children: Node,
  readOnly: boolean,
  state: { title: string, subtitle: string },
  onChange(state: Object): void
}

const handleChange = (onChange: Function, name: string) => (e: Event) => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    onChange({ [name]: target.value })
    return
  }

  throw new TypeException('target', 'HTMLInputElement', target)
}

const Title = ({ title = '', onChange, readOnly, name }: {title: string, onChange: Function, readOnly: boolean, name: string }) => readOnly
  ? <span>{title}</span>
  : (
  <input
    type="text"
    value={title}
    onChange={handleChange(onChange, name)}
    placeholder={`Enter a ${name} (optional)`}
  />
)

const CardComponent = ({ children, state: { title, subtitle }, ...props }: Props) => {
  const { readOnly } = props

  return (
    <Card>
      {readOnly && !title && !subtitle ? null : (
        <CardHeader
          title={<Title {...props} title={title} name="title" />}
          subtitle={<Title {...props} title={subtitle} name="subtitle" />}
        />
      )}
      <CardText>
        <div>
          {children}
        </div>
      </CardText>
    </Card>
  )
}

const defaultPlugin = new Slate()

export default class CardPlugin extends LayoutPlugin {
  Component = cssModules(CardComponent, styles)
  name = 'ory/layout/card'
  version = '0.0.1'
  icon = <Announcement />
  text = 'Card'

  createInitialChildren = () => ({
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
