import React from 'react'
import Component from '../core/Component'
import Blob from './blob'

export default class SummaryComponent extends Component {

  constructor(props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount() {
    super.componentDidMount()
  }

  renderComponent() {
    const width = this.isLargeScreen ? 800 : this.width

    return (<div style={{ color: "#607D8B", position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: `${width}px`, margin: 80 }}>
          <Blob blob={this.props.blob}/>
      </div>
   </div>)
  }
}
