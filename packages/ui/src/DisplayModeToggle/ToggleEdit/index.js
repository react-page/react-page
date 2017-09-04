// @flow
import React from 'react'
import Create from 'material-ui/svg-icons/content/create'
import Button from '../Button'

import { connect } from 'react-redux'

import { editMode } from 'ory-editor-core/lib/actions/display'
import { isEditMode } from 'ory-editor-core/lib/selector/display'
import { createStructuredSelector } from 'reselect'

const Inner = ({
  isEditMode,
  editMode
}: {
  isEditMode: boolean,
  editMode: Function
}) => (
  <Button
    icon={<Create />}
    description="Edit things"
    active={isEditMode}
    onClick={editMode}
  />
)

const mapStateToProps = createStructuredSelector({ isEditMode })
const mapDispatchToProps = { editMode }

export default connect(mapStateToProps, mapDispatchToProps)(Inner)
