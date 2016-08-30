// @flow
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'
import Announcement from 'material-ui/svg-icons/action/announcement'
import Slate from 'src/editor/plugins/content/slate'
import { LayoutPlugin } from 'src/editor/service/plugin/classes'
import uuid from 'node-uuid'

import styles from './index.scoped.css'

type Props = {
  children: Node,
  readOnly: boolean,
  state: { title: string, subtitle: string },
  onChange(state: Object): void
}

const Title = ({ title = '', onChange, readOnly, name }: {title: string, onChange: Function, readOnly: boolean, name: string }) => readOnly
  ? <span>{title}</span>
  : (
  <input
    type="text"
    value={title}
    onChange={(e: Event) => onChange({ [name]: e.target.value })}
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

  createInitialState = () => ({
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
