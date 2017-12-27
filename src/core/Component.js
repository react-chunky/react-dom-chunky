import React, { PureComponent } from 'react'
import uuid from 'uuid'
import { renderResponsive } from '../utils/responsive'

export default class Component extends PureComponent {

  constructor (props) {
    super(props)
    this._id = `chunky-${uuid.v1()}`
    this._type = `${this.constructor.name.toLowerCase()}`
    this._name = props.name || `${this.id}`
    this.triggerEvent = (event, data) => this.onEvent.bind(this, event, data)
  }

  onEvent (event, data) {
    this.props.onEvent && this.props.onEvent(
      Object.assign({}, {id: `${this.type}/${this.name}/${event}`}, data && data)
    )
  }

  get type () {
    return this._type
  }

  get name () {
    return this._name
  }

  get id () {
    return this._id
  }

  get width () {
    return this.props.width
  }

  get height () {
    return this.props.height
  }

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

  renderComponentCompact () {
    return this.renderComponent()
  }

  renderComponent () {
    return (<div />)
  }

  render () {
    return (<div style={styles.container} ref={c => this.container = c}>
      { renderResponsive(this.id, this.renderComponentCompact(), this.renderComponent()) }
    </div>)
  }
}

const styles = {
  container: {
  }
}
