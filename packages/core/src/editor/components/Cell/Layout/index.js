// @flow
import React from 'react'
import { shouldPureComponentUpdate } from 'src/editor/helper/shouldComponentUpdate'
import Row from 'src/editor/components/Row'
import type { ComponentizedCell } from 'types/editable'
import { updateCellLayout } from 'src/editor/actions/cell'
import { isEditMode } from 'src/editor/selector/display'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import serverContext from 'src/editor/components/ServerContext/connect'

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
      isServerContext,
      isEditMode
    }: ComponentizedCell = this.props

    return (
      <div className="ory-cell-inner">
        <Component
          id={id}
          state={state}
          editable={editable}
          readOnly={!isEditMode || isServerContext}
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

export default serverContext()(connect(mapStateToProps, mapDispatchToProps)(Layout))
