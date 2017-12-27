import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import Ionicon from 'react-ionicons'
import {
  Icon,
  Button,
  Typography
} from 'rmwc'

export default class Feature extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  content () {
    return <div style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      { this.blob()}
      { this.button()}
    </div>
  }

  blob () {
    return renderResponsive('blob',
      <Text blob={this.props.blob} style={{
        width: `90vw`,
        marginBottom: '60px',
        color: this.props.textColor
      }} />,
      <Text blob={this.props.blob} style={{
        width: `40vw`,
        color: this.props.textColor
      }} />)
  }

  button () {
    return <Button onClick={this.triggerEvent('primary')} raised> {this.props.actionTitle} </Button>
  }

  // onAction (action, aaaa) {
    // console.log('AC3333TION:', action, aaaa)
  // }

  image () {
    return renderResponsive('image', <img src={`/assets/${this.props.image}`} style={{
      width: '90vw',
      marginTop: '60px',
      marginBottom: '-30px'
    }} />,
      <img src={`/assets/${this.props.image}`} style={{
        width: '40vw',
        marginTop: '60px',
        marginBottom: '60px'
      }} />)
  }

  renderBlock (block, index) {
    return <div
      key={`block${index}`}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
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
      this.content()
    ], compact)
  }

  renderReversed (compact) {
    return this.renderBlocks([
      this.content(),
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
