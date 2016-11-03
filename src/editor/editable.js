import React from 'react'
import ReactDOMServer from 'react-dom/server'
import EditorComponent from 'src/editor/components/Editor'
import ContentService from 'src/editor/service/content'
import ServerContext from 'src/editor/components/ServerContext'

type Props = {
  store: any,
  id: string,
  content: ContentService,
  listeners: Function[]
}

class Editable {
  props: Props

  constructor(props: Props) {
    this.props = {
      listeners: [],
      ...props
    }
  }

  serialize = () => new Promise((res: (o: any) => void) => res(this.props.content.serialize(this.props.store.getState())))

  notify = (next: any) => {
    this.props.listeners.forEach((l) => l(next))
  }

  onChange = (l: (next: any) => void) => {
    this.props.listeners.push(l)
  }

  renderToHtml = () => new Promise((res: (o: any) => void) => {
    // console.log('hydration', this.props.store.getState())
    res(ReactDOMServer.renderToStaticMarkup(
      <ServerContext>
        <EditorComponent store={this.props.store} id={this.props.id} />
      </ServerContext>
    ))
  })
}

export default Editable
