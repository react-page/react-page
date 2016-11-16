import React, { Component } from 'react'
import OnDemandVideo from 'material-ui/svg-icons/notification/ondemand-video'
import Slate from 'src/editor/plugins/content/slate'
import { LayoutPlugin } from 'src/editor/service/plugin/classes'
import uuid from 'node-uuid'

type Props = {
  children: Node,
  readOnly: boolean,
  state: {style: string },
  onChange(state: Object): void
}

class Video extends Component {
  render() {
    const { children } = this.prpos
    return (
      <div>
        <div className="header-title-background">
          <div className="header-title-video">
            <video playsInline autoPlay muted loop className="background-video">
              <source src="https://storage.googleapis.com/ory.am/bokeh2.mp4" type="video/mp4"/>
            </video>
            <div className="background-video-overlay"></div>
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
                  </ul>
                </div>
                <div className="clearfix"></div>
              </div>
            </nav>
            <div className="header-title">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const defaultPlugin = new Slate()

Video.config = {
  name: 'home/layout/video',
  version: '0.0.1',
  icon: <OnDemandVideo />,
  text: 'Video header',

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

export default Video
