// @flow
import React from 'react'
import Resize from 'material-ui/svg-icons/action/settings-overscan'
import Button from '../Button'

import { connect } from 'react-redux'

import { resizeMode } from 'ory-editor/lib/actions/display'
import {  isResizeMode } from 'ory-editor/lib/selector/display'
import { createStructuredSelector } from 'reselect'

const Inner = ({ isResizeMode, resizeMode }: { isResizeMode: bool, resizeMode: Function }) => (
  <Button
    icon={<Resize />}
    description="Resize things"
    active={isResizeMode}
    onClick={resizeMode}
  />
)

const mapStateToProps = createStructuredSelector({ isResizeMode })
const mapDispatchToProps = { resizeMode }

export default connect(mapStateToProps, mapDispatchToProps)(Inner)
