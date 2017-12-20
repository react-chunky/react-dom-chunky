import React, { PureComponent } from 'react'
import Text from './Text'
import {
  Icon,
  Button,
  Typography
} from 'rmwc'
import Media from './Media'

export default class Cover extends PureComponent {

  constructor (props) {
    super(props)
    this._onPrimaryAction = this.onPrimaryAction.bind(this)
  }

  componentDidMount () {
  }

  onPrimaryAction () {
    this.props.onPrimaryAction && this.props.onPrimaryAction()
  }

  renderContent () {
    return (<div style={{
      position: 'absolute',
      backgroundColor: `rgba(0,0,0,${this.props.opacity})`,
      width: '100vw',
      height: '100vh',
      top: 0,
      left: 0,
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Typography use='display2' style={{margin: '20px'}}> {this.props.title} </Typography>
      <Typography use='display1' style={{margin: '20px'}}> {this.props.subtitle} </Typography>
      <Button onClick={this._onPrimaryAction} raised style={{margin: '20px'}}> {this.props.primaryActionTitle} </Button>
      <div style={{
        bottom: '10px',
        position: 'absolute',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Icon style={{fontSize: '30px'}} use='keyboard_arrow_down' />
      </div>
    </div>)
  }

  renderDefault () {
    const coverStyle = { width: '100%', height: '100vh', objectFit: 'cover', objectPosition: 'center center' }
    const coverPlaying = (this.props.scroll < 200)
    const midY = (this.props.height / 2)
    const height = this.props.height

    return (<div style={{
      backgroundColor: this.props.backgroundColor,
      marginTop: `${this.props.offset}px`,
      height: `${height}px`,
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Media cache={this.props.cache} video={this.props.video} image={this.props.image} playing={coverPlaying} style={coverStyle} />
      { this.renderContent() }
    </div>)
  }

  render () {
    return this.renderDefault()
  }

}
