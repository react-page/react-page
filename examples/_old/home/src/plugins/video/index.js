import React from 'react'
import OnDemandVideo from 'material-ui/svg-icons/notification/ondemand-video'
import Slate from 'src/editor/plugins/content/slate'
import uuid from 'uuid'

type Props = {
  children: Node,
  readOnly: boolean,
  state: {style: string },
  onChange(state: Object): void
}

const VideoComponent = ({ children }: Props) => (
  <div>
    <div className="header-title-background">
      <div className="header-title-video">
        <video playsInline autoPlay muted loop className="background-video">
          <source src="https://storage.googleapis.com/ory.am/bokeh2.mp4" type="video/mp4" />
        </video>
        <div className="background-video-overlay" />
      </div>
      <div className="header-overlay">
        <nav className="navbar">
          <div className="navbar-wrapper">
            <div className="navbar-header">
              <a className="navbar-brand" href="http://ory.am">ORY</a>
            </div>
            <div id="navbar" className="navbar-right">
              <ul className="nav navbar-nav">
                <li><a href="https://github.com/ory-am/editor">GitHub</a></li>
                <li><a href="https://ory-am.gitbooks.io/ory-editor/content/">Docs</a></li>
                <li><a href="http://gitdeploy.us10.list-manage1.com/subscribe?u=ffb1a878e4ec6c0ed312a3480&id=f605a41b53">Newsletter</a></li>
              </ul>
            </div>
            <div className="clearfix" />
          </div>
        </nav>
        <div className="header-title">
          {children}
        </div>
      </div>
    </div>
  </div>
)

const defaultPlugin = new Slate()

export default {
  Component: VideoComponent,
  name: 'home/layout/video',
  version: '0.0.1',
  IconComponent: <OnDemandVideo />,
  text: 'Video header',

  createInitialChildren: () => ({
    id: uuid(),
    rows: [{
      id: uuid(),
      cells: [{
        content: { plugin: defaultPlugin, state: defaultPlugin.createInitialState() },
        id: uuid(),
      }]
    }]
  }),
}
