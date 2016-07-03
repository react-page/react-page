import React, { Component, PropTypes } from 'react'
import KaTeX from './KaTeX'

const dataShape = PropTypes.shape({
  src: PropTypes.string.isRequired
}).isRequired

const BlockMath = ({ data }) => <KaTeX src={data.src} displayMode />

BlockMath.propTypes = {
  data: dataShape
}

export default BlockMath

export class BlockMathEditor extends Component {
  constructor(props) {
    super(props)

    this.onChange = (e) => props.onChange({ src: e.target.value })
    this.focus = () => this.refs.editor.focus()
  }

  render() {
    const { autoFocus, data, onBlur } = this.props

    return (
      <div>
        <BlockMath data={data} />
        <textarea autoFocus={autoFocus}
                  onChange={this.onChange}
                  onBlur={onBlur}
                  style={{
                    width: '100%',
                    height: '3em'
                  }}
                  value={data.src}
                  ref="editor" />
      </div>
    )
  }
}

BlockMathEditor.propTypes = {
  autoFocus: PropTypes.bool,
  data: dataShape,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}
