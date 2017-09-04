// @flow
import React from 'react'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Button from '../Button'

import { connect } from 'react-redux'

import { insertMode } from 'ory-editor-core/lib/actions/display'
import { isInsertMode } from 'ory-editor-core/lib/selector/display'
import { createStructuredSelector } from 'reselect'

const Inner = ({
  isInsertMode,
  insertMode
}: {
  isInsertMode: boolean,
  insertMode: Function
}) => (
  <Button
    icon={<ContentAdd />}
    description="Add things"
    active={isInsertMode}
    onClick={insertMode}
  />
)

const mapStateToProps = createStructuredSelector({ isInsertMode })
const mapDispatchToProps = { insertMode }

export default connect(mapStateToProps, mapDispatchToProps)(Inner)
