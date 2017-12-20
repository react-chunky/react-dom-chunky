import React from 'react'
import Component from '../core/Component'
import Text from './Text'

export default class Summary extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderComponent () {
    const width = this.isLargeScreen ? 800 : this.width - 40

    return (<div style={{ color: '#607D8B', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: `${width}px`, margin: 80 }}>
        <Text blob={this.props.blob} />
      </div>
    </div>)
  }
}
