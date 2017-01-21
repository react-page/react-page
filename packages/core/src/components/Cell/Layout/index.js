// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'
import Row from '../../Row'
import { updateCellLayout } from '../../../actions/cell'
import { isEditMode } from '../../../selector/display'

import type { ComponentizedCell } from '../../../types/editable'

class Layout extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponentizedCell

  render() {
    const {
      id,
      node: {
        rows = [],
        layout: {
          plugin: {
            Component
          },
          state = {}
        } = {}
      },
      editable,
      ancestors = [],
      updateCellLayout,
      isEditMode
    }: ComponentizedCell = this.props

    return (
      <div className="ory-cell-inner">
        <Component
          id={id}
          state={state}
          editable={editable}
          readOnly={!isEditMode}
          onChange={updateCellLayout}
        >
          {rows.map((r: string) => (
            <Row
              editable={editable}
              ancestors={[...ancestors, id]}
              key={r}
              id={r}
            />))}
        </Component>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({ isEditMode })

const mapDispatchToProps = (dispatch: Function, { id }: ComponentizedCell) => bindActionCreators({
  updateCellLayout: updateCellLayout(id)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
