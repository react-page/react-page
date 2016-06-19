import React, {Component} from "react";
import {connect} from "react-redux";
import Row from "src/common/components/Row";
import {rows} from "src/common/selectors/rows";
import {createPlaceholders} from "src/common/actions/placeholders";
import {bindActionCreators} from "redux";
import {setMode} from "src/common/actions/mode";
import {isLayoutMode} from "src/common/selectors/mode";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import "./editable.css"

class Editable extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.toggleLayoutMode = this.toggleLayoutMode.bind(this)
    this.lastClick = new Date()
  }

  onClick() {
    if (this.lastClick.getTime() + 450 > (new Date()).getTime()) {
      this.props.setMode('layout')
      return
    }

    this.props.setMode('edit')
    this.lastClick = new Date()
  }

  toggleLayoutMode() {
    this.props.setMode(this.props.isLayoutMode ? 'edit' : 'layout')
  }

  render() {
    const {rows, isLayoutMode} = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <div className="editable-actions">
            <FloatingActionButton secondary={isLayoutMode} onClick={this.toggleLayoutMode}>
              <Dashboard />
            </FloatingActionButton>
            <FloatingActionButton>
              <ContentAdd />
            </FloatingActionButton>
          </div>
          <div>
            { rows.map((row) => <Row level={1} key={row.id} {...row} />) }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  rows: rows(state),
  isLayoutMode: isLayoutMode(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createPlaceholders,
  setMode
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Editable)
