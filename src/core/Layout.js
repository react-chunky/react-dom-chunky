import React, { PureComponent } from 'react'
import 'node_modules/material-components-web/dist/material-components-web.css'
import css from 'styled-jsx/css'
import Cover from '../components/Cover'
import Drawer from '../components/Drawer'
import Media from '../components/Media'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import { CSSTransitionGroup } from 'react-transition-group'

/**
 *
 */
export default class Layout extends PureComponent {

  constructor (props) {
    super(props)
    this.state = { menuOpened: false, fixed: false }
    this._onPrimaryAction = this.onPrimaryAction.bind(this)
  }

  get isLargeScreen () {
    return (this.props.width >= this.breakpoints.main)
  }

  get styles () {
    return styles
  }

  get cover () {
    return Object.assign({}, this.props.cover, {})
  }

  get hasCover () {
    return (this.props.cover !== undefined)
  }

  get navigationHeight () {
    return (this.isLargeScreen ? 64 : 56)
  }

  get coverOffset () {
    if (this.hasCover && !this.cover.navigation && this.props.layout.fixed) {
      return this.navigationHeight
    }

    if (this.hasCover && this.cover.navigation && !this.props.layout.fixed) {
      return -this.navigationHeight
    }

    return 0
  }

  get navigationUncover () {
    if (this.hasCover && this.cover.navigation && !this.props.layout.fixed) {
      return true
    }

    return (this.hasCover && this.cover.navigation && this.props.scroll < 10)
  }

  onPrimaryAction () {
    this.props.onPrimaryAction && this.props.onPrimaryAction()
  }

  renderDrawer () {
    return (<Drawer
      open={this.state.menuOpened}
      menu={this.props.menu}
      />)
  }

  get theme () {
    const navigationColor = (this.navigationUncover ? `rgba(0,0,0,0)` : this.props.theme.navigationColor)
    const navigationTintColor = (this.navigationUncover ? '#FFFFFF' : this.props.theme.navigationTintColor)

    return Object.assign({}, this.props.theme, {
      navigationColor, navigationTintColor
    })
  }

  renderNavigation () {
    return (<Navigation
      layout={this.props.layout}
      navigationUncover={this.navigationUncover}
      theme={this.theme}
      menu={this.props.menu}
      />)
  }

  renderCover () {
    if (!this.hasCover) {
      return
    }

    const coverStyle = { width: '100%', height: '100vh', objectFit: 'cover', objectPosition: 'center center' }
    const coverPlaying = (this.props.scroll < 200)
    const midY = (this.props.height / 2)
    const height = this.props.height

    return (<div style={{
      backgroundColor: this.cover.backgroundColor,
      marginTop: `${this.coverOffset}px`,
      height: `${height}px`,
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Media cache={this.props.cache} video={this.cover.video} image={this.cover.image} playing={coverPlaying} style={coverStyle} />
      <Cover {...this.props.cover} onPrimaryAction={this._onPrimaryAction} />
    </div>)
  }

  renderFooter () {
    return <Footer
      info={this.props.info}
      footer={this.props.footer}
      theme={this.props.theme}
    />
  }

  renderComponent (component, index) {
    return (<div key={`component${index}`} style={this.styles.component}>
      { component }
    </div>)
  }

  renderComponents () {
    var components = this.props.children || []
    var index = 0
    const marginTop = (this.props.layout.fixed && !this.hasCover ? this.navigationHeight : 0)

    return (<main style={{
      marginTop: `${marginTop}px`
    }}>
      { components.map(c => this.renderComponent(c, index++)) }
    </main>)
  }

  render () {
    return (<div style={this.styles.container} ref={c => this.container = c}>
      { this.renderDrawer() }
      { this.renderNavigation() }
      { this.renderCover() }
      { this.renderComponents() }
      { this.renderFooter() }

      <style jsx global>{`{
        :root {
          --mdc-theme-primary: ${this.props.theme.primaryColor};
        }

        html {
          font-weight: 300;
          font-family: Roboto Condensed, sans-serif;
          color: #ffffff;
        }
      }`}
      </style>
    </div>)
  }
}

const styles = {
  component: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#455A64'
  }
}
