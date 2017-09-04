// @flow
import React from 'react'
import Resize from 'material-ui/svg-icons/action/settings-overscan'
import { connect } from 'react-redux'
import { resizeMode } from 'ory-editor-core/lib/actions/display'
import { isResizeMode } from 'ory-editor-core/lib/selector/display'
import { createStructuredSelector } from 'reselect'

import Button from '../Button'

const Inner = ({
  isResizeMode,
  resizeMode
}: {
  isResizeMode: boolean,
  resizeMode: Function
}) => (
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
