import React, { PureComponent } from 'react'
import marked from 'marked'

export default class Component extends PureComponent {

  constructor(props) {
    super(props)
  }

  get isLargeScreen() {
    return (this.props.width > 500)
  }

  get width() {
    return this.props.width
  }

  get height() {
    return this.props.height
  }

  get cardWidth() {
    return (this.isLargeScreen ? 500 : this.width - 20)
  }

  get cardHeight() {
    return (this.isLargeScreen ? 320 : 400)
  }

  markedString(key) {
    return marked(this.string(key))
  }

  string(key) {
    return (this.props.strings[key] || key)
  }

  componentDidMount() {
  }

  componentWillAppear(callback) {
    callback()
  }

  componentDidAppear() {
  }

  componentDidEnter() {
  }

  componentDidLeave() {
  }

  componentWillUnmount() {
  }

  componentWillEnter (callback) {
    const el = this.container
    TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback})
  }

  componentWillLeave (callback) {
    const el = this.container
    TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback})
  }

  renderComponent() {
    return (<div/>)
  }

  render() {
    return (<div style={styles.container} ref={c => this.container = c}>
      { this.renderComponent() }
    </div>)
  }
}

const styles = {
  container: {
  }
}
