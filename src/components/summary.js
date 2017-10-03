import React from 'react'
import Component from '../core/Component'

export default class SummaryComponent extends Component {

  constructor(props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount() {
    super.componentDidMount()
  }

  renderParagraph(text) {
    return (<p style={{ marginTop: 0, padding: 10, textAlign: 'justify', fontSize: 18 }}>
      { this.string(text) }
      </p>)
  }

  get header() {
    return this.props.header
  }

  get paragraphs() {
    return this.props.paragraphs
  }

  renderComponent() {
    const width = this.isLargeScreen ? 600 : this.width

    return (<div style={{ color: "#333333", position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: `${width}px`, margin: 80 }}>
        <h3 style={{textAlign: 'center', marginTop: 30 }}> { this.header }</h3>
        { this.paragraphs.map(p => this.renderParagraph(p)) }
      </div>
   </div>)
  }
}
