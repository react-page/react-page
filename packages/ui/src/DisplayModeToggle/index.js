// @flow
import React from 'react'

import Provider from '../Provider'
import ToggleEdit from './ToggleEdit'
import ToggleInsert from './ToggleInsert'
import ToggleLayout from './ToggleLayout'
import TogglePreview from './TogglePreview'
import ToggleResize from './ToggleResize'

const Inner = (props: any) => (
  <Provider {...props}>
    <div className="ory-controls-mode-toggle-control-group">
      <div className="ory-controls-mode-toggle-control">
        <ToggleEdit />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleInsert />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleLayout />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleResize />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <TogglePreview />
        <div className="ory-controls-mode-toggle-clearfix" />
      </div>
    </div>
  </Provider>
)

export default Inner
