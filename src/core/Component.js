import React, { PureComponent } from 'react'
import uuid from 'uuid'

export default class Component extends PureComponent {

  constructor (props) {
    super(props)
    this._id = `chunky-${uuid.v1()}`
  }

  // get smallScreenBreakPoint () {
  //   return this.props.smallScreenBreakPoint
  // }
  //
  // get isLargeScreen () {
  //   return (this.props.width > this.smallScreenBreakPoint)
  // }

  get id () {
    return this._id
  }

  get width () {
    return this.props.width
  }

  get height () {
    return this.props.height
  }

  // get cardWidth () {
  //   return (this.isLargeScreen ? this.smallScreenBreakPoint : this.width - 20)
  // }
  //
  // get cardHeight () {
  //   return (this.isLargeScreen ? 320 : 400)
  // }

  componentDidMount () {
  }

  componentWillAppear (callback) {
    callback()
  }

  componentDidAppear () {
  }

  componentDidEnter () {
  }

  componentDidLeave () {
  }

  componentWillUnmount () {
  }

  componentWillEnter (callback) {
    const el = this.container
    TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback})
  }

  componentWillLeave (callback) {
    const el = this.container
    TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback})
  }

  renderComponent () {
    return (<div />)
  }

  render () {
    return (<div style={styles.container} ref={c => this.container = c}>
      { this.renderComponent() }
    </div>)
  }
}

const styles = {
  container: {
  }
}
