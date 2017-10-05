import React from 'react'
import {
  Badge,
  Header,
  Button,
  Layout,
  Icon,
  IconButton,
  Drawer,
  Spinner,
  Footer,
  FooterSection,
  FooterLinkList,
  FooterDropDownSection,
  Content,
  Navigation
} from 'react-mdl'
import 'react-mdl/extra/material'
import TransitionGroup from 'react-addons-transition-group'
import { Core } from 'react-chunky'
import { Redirect } from 'react-router'
import MediaQuery from 'react-responsive'
import { AppBar } from 'material-ui'
import { default as Component } from './Component'

export default class Screen extends Core.Screen {

  constructor(props) {
     super(props)
     this.handleWidth = 100
     this.state = { ...this.state, progress: false, progressTitle: this.progressTitle, height: 0, width: 0, scroll: 0 }
     this._updateWindowDimensions = this.updateWindowDimensions.bind(this)
     this._updateScroll = this.updateScroll.bind(this)
     this._logout = this.logout.bind(this)
     this._login = this.login.bind(this)
     this._coverAction = this.coverActionExec.bind(this)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    super.componentDidMount()

    this.updateWindowDimensions()
    window.addEventListener('resize', this._updateWindowDimensions)
    window.addEventListener('scroll', this._updateScroll)

    this.setupTheme()
  }

  isColorLight(c) {
    var c = c.substring(1)
    const rgb = parseInt(c, 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >>  8) & 0xff
    const b = (rgb >>  0) & 0xff

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return (luma > 210)
  }

  get isLightNavigation() {
    return this._isLightNavigation
  }

  get isLightFooter() {
    return this._isLightFooter
  }

  get navigationLogo() {
    return (this.isLightNavigation ? `/assets/logo.png` : `/assets/logo-light.png`)
  }

  get footerLogo() {
    return (this.isLightFooter ? `/assets/logo.png` : `/assets/logo-light.png`)
  }

  get navigationTintColor() {
    return this._navigationTintColor
  }

  setupTheme() {
    this._isLightNavigation = this.isColorLight(this.props.theme.navigationColor)
    this._isLightFooter = this.isColorLight(this.props.theme.footerColor)
    this._navigationTintColor = (this.isLightNavigation ? this.props.theme.navigationTintColor : "#ffffff")

    var css = `.mdl-layout__header .mdl-layout__drawer-button i { color: ${this.navigationTintColor}; }`,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style')

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css))
    }

    head.appendChild(style)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateWindowDimensions)
    window.removeEventListener('scroll', this._updateScroll)
  }

  updateScroll() {
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    const scroll = document.body.scrollTop
    this.setState({ scroll })
  }

  pushTransition(transition, data) {
    var pathname = (transition.data.path.charAt(0) === ':' ? (data[transition.data.path.substring(1)] || transition.data.path) : transition.data.path)

    this.setState({ redirect: { transition, data, push: true, pathname }})
  }

  replaceTransition(transition, data) {
    var pathname = (transition.data.path.charAt(0) === ':' ? (data[transition.data.path.substring(1)] || transition.data.path) : transition.data.path)

    this.setState({ redirect: { transition, data, push: false, pathname }})
  }

  coverActionExec() {
    this.coverAction && this[this.coverAction] && this[this.coverAction]()
  }

  goBack() {
  }

  get account() {
    return this.props.account
  }

  get isLoggedIn() {
    return this.account
  }

  get isLargeScreen() {
    return (this.state.width > 500)
  }

  get width() {
    return this.state.width
  }

  get height() {
    return this.state.height
  }

  get scroll() {
    return this.state.scroll
  }

  logout() {
    this.props.onUserLogout && this.props.onUserLogout()
  }

  login() {
  }

  userDidLogin(account) {
    this.props.onUserLogin && this.props.onUserLogin(account)
  }

  renderProgress() {
    return (<Spinner singleColor />)
  }

  renderComponent(OriginalComponent, index) {
    var props = Object.assign({}, {
      width: this.state.width,
      height: this.state.height,
    }, this.props)

    var ComponentContainer = React.cloneElement(OriginalComponent, props)

    if ("string" === (typeof OriginalComponent.type)) {
      ComponentContainer = OriginalComponent
    }

    return (
      <TransitionGroup key={`${index}`} style={{ alignSelf: 'stretch' }}>
        { ComponentContainer }
      </TransitionGroup>
    )
  }

  get mainMenu() {
    return this.props.menu
  }

  menu (drawer) {
    var menuItemStyle = { ...this.styles.drawer['menuItem'], color: drawer ? this.props.navigationColor : this.navigationTintColor }

    if (!this.mainMenu) {
      return [<a key={"menu/back"} style={menuItemStyle}> Back </a>]
    }

    return this.mainMenu.map(menuItem => {
      const badge = (menuItem.badge ? { text: menuItem.badge } : {})
      return (<a key={menuItem.id} href={menuItem.link} style={ menuItemStyle }>
          <Badge {...badge} >{ menuItem.title }</Badge>
        </a>)
    })
  }

  get actionMenu() {
    if (!this.isLoggedIn) {
      return(<IconButton id="bold" name="account_circle" style={{ color: this.navigationTintColor }} onClick={this._login}/>)
    }

    return(<IconButton id="bold" name="exit_to_app" style={{ color: this.navigationTintColor }} onClick={this._logout}/>)
  }

  renderDrawer() {
    return (<Drawer>
      <Navigation style={this.styles.drawer}>
        { this.menu(true) }
      </Navigation>
    </Drawer>)
  }

  get components() {
    return []
  }

  renderComponents() {
    var index = 1
    return this.components.map(component => {
      index = index + 1
      return this.renderComponent(component, index)
    })
  }

  redirect(pathname, push) {
    return (<Redirect push={push} to={{
       pathname
    }}/>)
  }

  get customStyles() {
    return {}
  }

  get styles () {
    return Object.assign({}, styles, this.customStyles)
  }

  get customFooter() {
    return {}
  }

  get footer() {
    return Object.assign({}, this.webProps.footer, this.customFooter)
  }

  get webProps () {
    return this.props.web || {}
  }

  get infoProps () {
    return this.props.info || {}
  }

  get links () {
    return this.infoProps.links || {}
  }

  get copyright() {
    return this.infoProps.copyright || ""
  }

  renderScreenContent() {
    return (<div style={this.styles.container}>
      { this.renderComponents() }
    </div>)
  }

  get cover() {
    return this.props.cover || {}
  }

  get coverImage() {
    if (this.isLargeScreen && this.coverImageLarge) {
      return this.coverImageLarge
    }

    return this.cover.image
  }

  get coverImageLarge() {
    return this.cover.imageLarge
  }

  get coverTitle() {
    if (!this.cover.title) {
      return
    }

    return this.props.strings[this.cover.title] || this.cover.title
  }

  get coverSubtitle() {
    if (!this.cover.subtitle) {
      return
    }

    return this.props.strings[this.cover.subtitle] || this.cover.subtitle
  }

  get coverActionTitle() {
    if (!this.cover.actionTitle) {
      return
    }

    return this.props.strings[this.cover.actionTitle] || this.cover.actionTitle
  }

  get coverAction() {
    if (!this.cover.action) {
      return
    }

    return this.cover.action
  }

  renderCoverTitle() {
    if (!this.coverTitle) {
      return
    }

    return (<h1 style={{textAlign: 'center', marginTop: 0 }}> { this.coverTitle } </h1>)
  }

  renderCoverSubtitle() {
    if (!this.coverSubtitle) {
      return
    }

    return (<h4 style={{textAlign: 'center', marginTop: 0 }}> { this.coverSubtitle } </h4>)
  }

  renderCoverAction() {
    if (!this.coverActionTitle) {
      return
    }

    return (<Button style={{ margin: 20, backgroundColor: this.props.theme.primaryColor }} raised colored onClick={this._coverAction}> { this.coverActionTitle } </Button>)
  }

  renderHero() {
    var cover = { backgroundColor: this.props.theme.primaryColor  }

    if (this.cover.backgroundColor) {
      cover = { backgroundColor: this.cover.backgroundColor  }
    }

    if (this.coverImage) {
      cover = Object.assign({}, cover, { background: `url(${this.coverImage}) center / cover`, boxShadow: 'inset 0 0 0 1600px rgba(0,0,0,.4)' })
    }

    return (<div style={{ ...cover, color: "#ffffff", height: `${this.coverHeight}px`, position: 'relative', padding: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        { this.renderCoverTitle() }
        { this.renderCoverSubtitle() }
        { this.renderCoverAction() }
      </div>)
  }

  get coverHeight() {
    return this.height - 100
  }

  renderFooterSection(section, type="left", style={}) {
    var links = section.elements.map(element => <a key={element.id} href={`${element.link}`}>{ element.title }</a>)
    return (<FooterSection type={type} key={section.id} title={""} style={{ marginRight: 80, marginTop: 40, ...style }}>
        <div style={{ fontSize: 14, color: this.props.theme.footerHeaderColor, marginBottom: 10 }}>
          { section.title }
        </div>
        <FooterLinkList>
          { links }
        </FooterLinkList>
    </FooterSection>)
  }

  renderFooter() {
    return (<div style={{ backgroundColor: this.props.theme.footerColor, color:  this.props.theme.footerTintColor, display: "flex", flex: 1, flexDirection: this.isLargeScreen ? "row" : "column" }}>
        <div style={{ display: "flex", flex: 1,  marginLeft: this.isLargeScreen ? 100 : 20, alignItems: "center", justifyContent: "flex-start"}}>
           <FooterSection type="top" style={{ }}>
             { this.footer.sections.map(section => this.renderFooterSection(section, this.isLargeScreen ? "left" : "bottom" )) }
           </FooterSection>
        </div>
        <div style={{ display: "flex", flex: 1, marginRight: this.isLargeScreen ? 100 : 0, marginLeft: this.isLargeScreen ? 0 : 20, alignItems: "center", justifyContent: this.isLargeScreen ? "flex-end" : "flex-start" }}>
            <div style={{ marginRight: 40, marginTop: 20 }}>
              <img src={this.footerLogo} height="60"/>
            </div>
            { this.renderFooterSection({
              title: this.copyright,
              id: "copyright",
              elements: [{
                "id": "terms",
                "title": "Terms",
                "link": this.links.terms || "/"
              },
              {
                "id": "privacy",
                "title": "Privacy",
                "link": this.links.privacy || "/"
              }]
            }, "bottom") }
      </div>
    </div>)
  }

  get smallScreenBreakPoint() {
    return this.webProps.smallScreenBreakPoint || 500
  }

  get largeScreenOnlyMediaQuery() {
    return `(min-device-width: ${this.smallScreenBreakPoint}px)`
  }

  get smallScreenOnlyMediaQuery() {
    return `(max-device-width: ${this.smallScreenBreakPoint}px)`
  }

  renderLargeScreenOnly(content) {
    return (<MediaQuery query={this.largeScreenOnlyMediaQuery}>
        { content }
    </MediaQuery>)
  }

  renderSmallScreenOnly(content) {
    return (<MediaQuery query={this.smallScreenOnlyMediaQuery}>
        { content }
    </MediaQuery>)
  }

  renderHeader(scroll) {
    return (<Header transparent={false} scroll={scroll} style={{...this.styles.header, backgroundColor: this.props.theme.navigationColor}}>
      <div style={{ alignSelf: "center", alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flex: 1}}>

        { this.renderLargeScreenOnly(
            <div>
              <a href="/"><img src={this.navigationLogo} height="60"/></a>
            </div>
        )}

        { this.renderLargeScreenOnly(
            <Navigation style={this.styles.menu}>
              { this.menu() }
            </Navigation>
        )}

        { this.renderSmallScreenOnly(
          <div style={{ display: 'flex', flex: 2, alignSelf: 'center', textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <a href="/"><img src={this.navigationLogo} height="50"/></a>
          </div>
        )}

        <div style={this.isLargeScreen ? {} : this.styles.action}>
          { this.actionMenu }
        </div>
      </div>
    </Header>)
  }

  render() {
    if (this.state.redirect) {
      const { transition, data, push, pathname } = this.state.redirect
      return this.redirect(pathname, push)
    }

    var height = `${this.height}px`

    return (<div style={{ height, position: 'relative' }}>
          <Layout fixedHeader>
              { this.renderHeader() }
              <MediaQuery query='(max-device-width: 500px)'>
                { this.renderDrawer() }
              </MediaQuery>
              <Content style={{}}>
                { this.renderHero() }
                { this.renderScreenContent() }
                { this.renderFooter() }
              </Content>
          </Layout>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    padding: '0px',
    minHeight: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    color: "#ffffff",
    backgroundColor: "#ffffff"
  },

  menu: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  },

  action: {
    display: 'flex',
    width: 55,
    justifyContent: 'flex-end'
  },

  drawer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start'
  },

  menuItem: {
    fontSize: 14
  }
}
