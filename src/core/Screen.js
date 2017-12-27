import React from 'react'
import TransitionGroup from 'react-addons-transition-group'
import { Core } from 'react-chunky'
import { Redirect } from 'react-router'
import { default as Component } from './Component'
import merge from 'deepmerge'
import { default as Layout } from './Layout'

export default class Screen extends Core.Screen {

  constructor (props) {
    super(props)
    this.state = { ...this.state, progress: false, progressTitle: this.progressTitle, height: 0, width: 0, scroll: 0 }
    this._updateScroll = this.updateScroll.bind(this)
    this._updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this._injectVariant()
  }

  componentDidMount () {
    super.componentDidMount()
    this._updateWindowDimensions()
    window.addEventListener('resize', this._updateWindowDimensions)
    window.addEventListener('scroll', this._updateScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._updateWindowDimensions)
    window.removeEventListener('scroll', this._updateScroll)
  }

  get layout () {
    return Layout
  }

  get expectsVariants () {
    return (this.props.path && this.props.path.indexOf(':path') >= 0)
  }

  updateWindowDimensions () {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  updateScroll () {
    const scroll = window.scrollY
    this.setState({ scroll })
  }

  handleRedirectEvent (fullPath) {
    this.triggerRedirect(fullPath)
  }

  handleDefaultEvent (fullPath) {
    this.triggerRawRedirect(fullPath)
  }

  _injectVariant () {
    if (!this.expectsVariants || !this.props.pathData) {
      return
    }

    try {
      // Try to load the variants
      const variants = require(`chunks/${this.props.chunkName}/data/${this.props.pathData}.json`)

      // Check the location
      const locationPath = this.props.location.pathname

      variants.forEach(variant => {
        if (variant.path === locationPath || locationPath === `/${variant.path}` ||
            locationPath === `/${variant.path}/` || locationPath === `${variant.path}/`) {
            // We've got a match
          this._variant = Object.assign({}, variant)
        }
      })
    } catch (e) {
      // Could not load variant path data
    }
  }

  get isVariantValid () {
    return (this.expectsVariants && this.variant)
  }

  get _props () {
    return (this.variant ? merge.all([this.props, this.variant]) : this.props)
  }

  get variant () {
    return this._variant
  }

  pushTransition (transition, data) {
    var pathname = (transition.data.path.charAt(0) === ':' ? (data[transition.data.path.substring(1)] || transition.data.path) : transition.data.path)

    this.setState({redirect: { transition, data, push: true, pathname }})
  }

  replaceTransition (transition, data) {
    var pathname = (transition.data.path.charAt(0) === ':' ? (data[transition.data.path.substring(1)] || transition.data.path) : transition.data.path)

    this.setState({redirect: { transition, data, push: false, pathname }})
  }

  get account () {
    return this.props.account
  }

  get isLoggedIn () {
    return this.account
  }

  get width () {
    return this.state.width
  }

  get height () {
    return this.state.height
  }

  get scroll () {
    return this.state.scroll
  }

  get path () {
    return this.props.location.pathname
  }

  get mainMenu () {
    return this.props.menu
  }

  get components () {
    return []
  }

  logout () {
    this.props.onUserLogout && this.props.onUserLogout()
  }

  userDidLogin (account) {
    this.props.onUserLogin && this.props.onUserLogin(account)
  }

  renderProgress () {}

  renderComponent (OriginalComponent, index) {
    var props = Object.assign({}, {
      cache: this.cache,
      onEvent: this._onEvent,
      width: this.state.width,
      height: this.state.height,
      smallScreenBreakPoint: this.smallScreenBreakPoint
    }, this.props)

    var ComponentContainer = React.cloneElement(OriginalComponent, props)

    if ((typeof OriginalComponent.type) === 'string') {
      ComponentContainer = OriginalComponent
    }

    return (
      <TransitionGroup key={`${index}`} style={{ alignSelf: 'stretch' }}>
        { ComponentContainer }
      </TransitionGroup>
    )
  }

  renderComponents () {
    if (!this.components || this.components.length === 0) {
      return
    }

    var index = 1
    return this.components.map(component => {
      index = index + 1
      return this.renderComponent(component, index)
    })
  }

  redirect (pathname) {
    return (<Redirect exact push to={{
      pathname
    }} />)
  }

  triggerRedirect (link) {
    this.setState({redirect: {push: true, pathname: link}})
  }

  triggerRawRedirect (link) {
    window.location.href = link
  }

  renderScreenLayout () {
    const ScreenLayout = this.layout
    return <ScreenLayout
      scroll={this.state.scroll}
      width={this.state.width}
      height={this.state.height}
      {...this.props}>
      {this.renderComponents()}
    </ScreenLayout>
  }

  render () {
    if (this.state.height === 0) {
      return <div />
    }

    if (this.state.redirect) {
      const { pathname, push } = this.state.redirect
      return this.redirect(pathname, push)
    }

    var height = `${this.height}px`

    return (<div style={{ height, position: 'relative' }}>
      { this.renderScreenLayout() }
      <style jsx>{`{
        :global(body){
            background-color: ${this.props.backgroundColor};
            margin: 0;
            padding: 0;
        }`}
      </style>
    </div>
    )
  }
}

const styles = {
}
