import React, { PureComponent } from 'react'
import Text from './Text'
import {
  Icon,
  Button,
  Typography
} from 'rmwc'

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
      width: '100%',
      height: '100%',
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

  render () {
    return this.renderContent()
  }

}
