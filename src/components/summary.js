import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'

export default class Summary extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderBlob () {
    return renderResponsive('blob',
      <Text blob={this.props.blob} style={{
        width: `90vw`,
        padding: '10px',
        paddingBottom: '60px'
      }} />,
      <Text blob={this.props.blob} style={{
        width: `70vw`,
        paddingBottom: '60px'
      }} />)
  }

  renderComponent () {
    return (<div style={{
      color: this.props.textColor,
      position: 'relative',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center' }}>
      <img src={`/assets/${this.props.image}`} style={{
        width: '200px',
        marginTop: '20px',
        marginBottom: '-20px'
      }} />
      { this.renderBlob() }
    </div>)
  }
}
