import React, { Component } from 'react'
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

export default class Screen extends Core.Screen {

  constructor(props) {
     super(props)
     this.handleWidth = 100
     this.state = { ...this.state, progress: false, progressTitle: this.progressTitle, height: 0, width: 0, scroll: 0 }
     this._updateWindowDimensions = this.updateWindowDimensions.bind(this)
     this._updateScroll = this.updateScroll.bind(this)
     this._logout = this.logout.bind(this)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    super.componentDidMount()
    this.updateWindowDimensions();
    window.addEventListener('resize', this._updateWindowDimensions)
    window.addEventListener('scroll', this._updateScroll)
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

  userDidLogin(account) {
    this.props.onUserLogin && this.props.onUserLogin(account)
  }

  renderProgress() {
    return (<Spinner singleColor />)
  }

  renderComponent(Component, index) {
    var props = Object.assign({
      width: this.state.width,
      height: this.state.height,
    }, this.props)

    const ComponentContainer = React.cloneElement(Component, props)
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
    var menuItemStyle = {...this.styles[drawer ? 'reversedMenuItem' : 'menuItem'], color: drawer ? this.props.theme.primaryColor : "#ffffff" }

    if (!this.mainMenu) {
      return [<a key={"menu/back"} style={menuItemStyle}> Back </a>]
    }

    return this.mainMenu.map(menuItem => {
      const badge = (menuItem.badge ? { text: menuItem.badge } : {})
      return (<a key={menuItem.id} href={menuItem.link} style={{ ...menuItemStyle, color: "#444444"}}>
                  <Badge {...badge} >{ menuItem.title }</Badge>
        </a>)
    })
  }

  get actionMenu() {
    if (!this.isLoggedIn) {
      return
    }

    return(<IconButton id="bold" name="exit_to_app" style={{ color: "#ffffff" }} onClick={this._logout}/>)
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

  renderContent() {
    return (<Content>
      <div style={this.styles.container}>
        { this.renderComponents() }
      </div>
    </Content>)
  }

  renderHero() {
    const cover = { background: 'url(/assets/cover4.jpg) center / cover', boxShadow: 'inset 0 0 0 1600px rgba(0,0,0,.3)' }

    return (<div style={{ ...cover, color: "#ffffff", height: `${this.height-100}px`, position: 'relative', padding: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{textAlign: 'center', marginTop: 0 }}> Hello </h1>
        <h3 style={{marginTop: 0, textAlign: 'center'}}> Subtitle </h3>
        <Button style={{margin: 20}} raised colored> Action </Button>
      </div>)
  }

  renderFooter() {
    return (<Footer size="mega">
              <FooterSection type="middle">
                  <FooterDropDownSection title="Features">
                      <FooterLinkList>
                          <a href="#">About</a>
                          <a href="#">Terms</a>
                          <a href="#">Partners</a>
                          <a href="#">Updates</a>
                      </FooterLinkList>
                  </FooterDropDownSection>
                  <FooterDropDownSection title="Details">
                      <FooterLinkList>
                          <a href="#">Specs</a>
                          <a href="#">Tools</a>
                          <a href="#">Resources</a>
                      </FooterLinkList>
                  </FooterDropDownSection>
                  <FooterDropDownSection title="Technology">
                      <FooterLinkList>
                          <a href="#">How it works</a>
                          <a href="#">Patterns</a>
                          <a href="#">Usage</a>
                          <a href="#">Products</a>
                          <a href="#">Contracts</a>
                      </FooterLinkList>
                  </FooterDropDownSection>
                  <FooterDropDownSection title="FAQ">
                      <FooterLinkList>
                          <a href="#">Questions</a>
                          <a href="#">Answers</a>
                          <a href="#">Contact Us</a>
                      </FooterLinkList>
                  </FooterDropDownSection>
              </FooterSection>
              <FooterSection type="bottom" logo="Title">
                  <FooterLinkList>
                      <a href="#">Help</a>
                      <a href="#">Privacy & Terms</a>
                  </FooterLinkList>
              </FooterSection>
          </Footer>)
  }

  renderHeader(scroll) {
    return (<Header transparent={false} scroll={scroll} style={{...this.styles.header, backgroundColor: "#ffffff" }}>
      <div style={{ alignSelf: "center", alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', flex: 1}}>
        <MediaQuery query='(min-device-width: 500px)'>
          <div>
            <a href="/"><img src='/assets/logo-light.png' height="60"/></a>
          </div>
        </MediaQuery>

        <MediaQuery query='(min-device-width: 500px)'>
          <Navigation style={this.styles.menu}>
          { this.menu() }
          </Navigation>
        </MediaQuery>

        <MediaQuery query='(max-device-width: 500px)'>
          <div style={{ backgroundColor: "#ffff00" }}>
            <a href="/"><img src='/assets/logo.png' height="50"/></a>
          </div>
        </MediaQuery>

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

    return (
          <div style={{height, position: 'relative'}}>
          <Layout fixedHeader>
              { this.renderHeader() }
              <MediaQuery query='(max-device-width: 500px)'>
                { this.renderDrawer() }
              </MediaQuery>
              <Content style={{ }}>
                { this.renderHero() }

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
    width: 80,
    justifyContent: 'flex-end'
  },

  drawer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start'
  },

  menuItem: {
    fontSize: 14,
    color: '#333333'
  },

  reversedMenuItem: {
    fontSize: 14,
    color: '#333333'
  }
}
