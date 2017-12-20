import React, { PureComponent } from 'react'
import 'node_modules/material-components-web/dist/material-components-web.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Cover from '../components/Cover'
import Drawer from '../components/Drawer'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

/**
 *
 */
export default class Layout extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { menuOpened: false, fixed: false }
    this._onPrimaryAction = this.onPrimaryAction.bind(this)
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

  get theme () {
    const navigationColor = (this.navigationUncover ? `rgba(0,0,0,0)` : this.props.theme.navigationColor)
    const navigationTintColor = (this.navigationUncover ? '#FFFFFF' : this.props.theme.navigationTintColor)

    return Object.assign({}, this.props.theme, {
      navigationColor, navigationTintColor
    })
  }

  renderDrawer () {
    return (<Drawer
      open={this.state.menuOpened}
      menu={this.props.menu}
      />)
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

    return (<Cover
      {...this.props}
      {...this.props.cover}
      onPrimaryAction={this._onPrimaryAction}
      offset={this.coverOffset}
    />)
  }

  renderFooter () {
    return <Footer {...this.props} />
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
    return (<div style={this.styles.container} ref={c => { this.container = c }}>
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

        .animation-fadeIn-appear {
          opacity: 0.01;
        }

        .animation-fadeIn-appear.animation-fadeIn-appear-active {
          opacity: 1;
          transition: opacity .5s ease-in;
        }
      }`}
      </style>
    </div>)
  }
}

const styles = {
  container: {

  },
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