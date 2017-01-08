// @flow
import React from 'react'
import ToggleEdit from './ToggleEdit'
import ToggleInsert from './ToggleInsert'
import ToggleLayout from './ToggleLayout'
import TogglePreview from './TogglePreview'
import ToggleResize from './ToggleResize'

import './index.css'

const Inner = () => (
    <div className="ory-controls-mode-toggle-control-group">
      <div className="ory-controls-mode-toggle-control">
        <ToggleEdit />
        <div className="clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleInsert />
        <div className="clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleLayout />
        <div className="clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <ToggleResize />
        <div className="clearfix" />
      </div>

      <div className="ory-controls-mode-toggle-control">
        <TogglePreview />
        <div className="clearfix" />
      </div>
    </div>
)

export default Inner
