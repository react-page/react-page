// @flow
import React from 'react'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Button from '../Button'

import { connect } from 'react-redux'

import {    insertMode} from 'src/editor/actions/display'
import {  isInsertMode} from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'

const Inner = ({ isInsertMode, insertMode }: { isInsertMode: bool, insertMode: Function }) => (
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
