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
     this.state = { ...this.state, progress: false, progressTitle: this.progressTitle, height: 0, width: 0}
     this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
     this._logout = this.logout.bind(this)
 }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    super.componentDidMount()
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
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
    var props = Object.assign({ width: this.state.width, height: this.state.height })
      //  this.props.account ? { account: this.props.account } : {})
    const ComponentContainer = React.cloneElement(Component, props)
    return (
      <TransitionGroup key={`${index}`}>
        { ComponentContainer }
      </TransitionGroup>
    )
  }

  menu (drawer) {
    var menuItemStyle = {...styles[drawer ? 'reversedMenuItem' : 'menuItem'], color: drawer ? this.props.theme.primaryColor : "#ffffff" }

    if (!this.props.menu) {
      return [<a key={"menu/back"} style={menuItemStyle}> Back </a>]
    }

    return this.props.menu.map(menuItem => {
      const badge = (menuItem.badge ? { text: menuItem.badge } : {})
      return (<a key={menuItem.id} href={menuItem.link} style={menuItemStyle}> <Badge {...badge} >{ menuItem.title }</Badge> </a>)
    })
  }

  get actionMenu() {
    if (!this.isLoggedIn) {
      return
    }

    return(<IconButton id="bold" name="exit_to_app" style={{ color: "#ffffff" }} onClick={this._logout}/>)
  }

  renderHeader() {
    return (<Header transparent style={{...styles.header, backgroundColor: this.props.theme.primaryColor }}>
      <MediaQuery query='(min-device-width: 500px)'>
      <div>
      <a href="/"><img src='/assets/logow.png' height="70"/></a>
      </div>
      </MediaQuery>
      <MediaQuery query='(min-device-width: 500px)'>
        <Navigation style={styles.menu}>
        { this.menu() }
        </Navigation>
      </MediaQuery>
      <MediaQuery query='(max-device-width: 500px)'>
      <div style={{ flex: 1, textAlign: "center" }}>
      <a href="/"><img src='/assets/logow.png' height="70"/></a>
      </div>
      </MediaQuery>
      <div style={this.isLargeScreen ? {} : styles.action}>
      { this.actionMenu }
      </div>
    </Header>)
  }

  renderDrawer() {
    return (<Drawer>
      <Navigation style={styles.drawer}>
        { this.menu(true) }
      </Navigation>
    </Drawer>)
  }

  get components() {
    return []
  }

  renderComponents() {
    var index = -1
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

  render () {
    if (this.state.redirect) {
      const { transition, data, push, pathname } = this.state.redirect
      return this.redirect(pathname, push)
    }

    return (<Layout fixedHeader>
            { this.renderHeader() }
            <MediaQuery query='(max-device-width: 500px)'>
              { this.renderDrawer() }
            </MediaQuery>
            <Content>
              <div style={styles.container}>
                { this.renderComponents() }
              </div>
            </Content>
      </Layout>)
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    padding: '10px',
    minHeight: 300,
    backgroundColor: "#ffffff",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
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
    color: '#ffffff'
  },

  reversedMenuItem: {
    fontSize: 14
  }
}
