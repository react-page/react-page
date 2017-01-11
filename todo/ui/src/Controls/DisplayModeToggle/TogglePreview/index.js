// @flow
import React from 'react'
import Devices from 'material-ui/svg-icons/device/devices'
import Button from '../Button'

import { connect } from 'react-redux'

import {   previewMode } from 'src/editor/actions/display'
import { isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'

const Inner = ({ isPreviewMode, previewMode }: { isPreviewMode: bool, previewMode: Function }) => (
  <Button
    icon={<Devices />}
    description="Preview result"
    active={isPreviewMode}
    onClick={previewMode}
  />
)

const mapStateToProps = createStructuredSelector({ isPreviewMode })
const mapDispatchToProps = { previewMode }

export default connect(mapStateToProps, mapDispatchToProps)(Inner)
