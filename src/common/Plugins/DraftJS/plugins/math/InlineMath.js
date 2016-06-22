import React, { Component, PropTypes } from "react";
import KaTeX from "./KaTeX";

const dataShape = PropTypes.shape({
  src: PropTypes.string.isRequired
}).isRequired

const InlineMath = ({ data }) => <KaTeX src={data.src}/>

InlineMath.propTypes = {
  data: dataShape
}

export default InlineMath

export class InlineMathEditor extends Component {
  constructor(props) {
    super(props)

    this.onChange = (e) => props.onChange({ src: e.target.value })
    this.focus = () => this.refs.editor.focus()
  }

  render() {
    const { data } = this.props

    return (
      <div>
        <InlineMath data={data}/>
        <textarea onChange={this.onChange}
                  style={{
                    width: '100%',
                    height: '3em'
                  }}
                  value={data.src}
                  ref="editor"/>
      </div>
    )
  }
}

InlineMathEditor.propTypes = {
  data: dataShape,
  onChange: PropTypes.func.isRequired
}
