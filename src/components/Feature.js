import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import Ionicon from 'react-ionicons'

export default class Feature extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  blob () {
    return renderResponsive('blob',
      <Text blob={this.props.blob} style={{
        width: `90vw`,
        color: this.props.textColor
      }} />,
      <Text blob={this.props.blob} style={{
        width: `50vw`,
        color: this.props.textColor
      }} />)
  }

  image () {
    return renderResponsive('image', <img src={`/assets/${this.props.image}`} style={{
      width: '90vw'
    }} />,
      <img src={`/assets/${this.props.image}`} style={{
        width: '40vw'
      }} />)
  }

  renderBlock (block, index) {
    return <div
      key={`block${index}`}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100vw',
        justifyContent: 'center'
      }}>
      { block }
    </div>
  }

  renderBlocks (blocks, compact) {
    var index = 0
    return <div style={{
      color: '#607D8B',
      position: 'relative',
      display: 'flex',
      flex: 1,
      flexDirection: (compact ? 'column' : 'row'),
      alignItems: 'center',
      backgroundColor: this.props.backgroundColor,
      justifyContent: 'center' }}>
      { blocks.map(b => this.renderBlock(b, index++)) }
    </div>
  }

  renderDefault (compact) {
    return this.renderBlocks([
      this.image(),
      this.blob()
    ], compact)
  }

  renderReversed (compact) {
    return this.renderBlocks([
      this.blob(),
      this.image()
    ], compact)
  }

  renderComponentCompact () {
    return this.renderDefault(true)
  }

  renderComponent () {
    return (this.props.reversed ? this.renderReversed() : this.renderDefault())
  }
}
