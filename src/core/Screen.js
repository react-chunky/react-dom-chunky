import React, { Component } from 'react'
import {
  Badge,
  Header,
  Layout,
  Drawer,
  Content,
  Navigation
} from 'react-mdl'
import 'react-mdl/extra/material'
import TransitionGroup from 'react-addons-transition-group'

export default class Screen extends Component {

  constructor(props) {
    super(props)
     this.handleWidth = 100
     this.state = { height: 0, width: 0}
     this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
   }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  renderComponentWithTransition(Component) {
    return (
      <TransitionGroup>
        { Component }
      </TransitionGroup>
    )
  }

  menu (drawer) {
   const menuItemStyle = styles[drawer ? 'reversedMenuItem' : 'menuItem']

    if (!this.props.menu) {
      return [<a key={"menu/back"} style={menuItemStyle}> Back </a>]
    }

    return this.props.menu.map(menuItem => {
      const badge = (menuItem.badge ? { text: menuItem.badge } : {})
      return (<a key={menuItem.id} href={menuItem.link} style={menuItemStyle}> <Badge {...badge} >{ menuItem.title }</Badge> </a>)
    })
  }

  renderHeader() {
    return (<Header transparent style={styles.header}>
      <Navigation style={styles.menu}>
        { this.menu() }
      </Navigation>
      { this.actionMenu}
    </Header>)
  }

  renderDrawer() {
    return (<Drawer>
      <Navigation>
        { this.menu(true) }
      </Navigation>
    </Drawer>)
  }

  renderScreen() {
    return (<div/>)
  }

  render () {
    return (<Layout fixedHeader>
            { this.renderHeader() }
            { this.renderDrawer() }
            <Content>
              <div style={styles.container}>
                { this.renderScreen()}
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    color: '#424242',
    background: '#0288D1',
    backgroundColor: '#6BBCF4'
  },

  menu: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  },

  menuItem: {
    color: '#ffffff'
  },

  reversedMenuItem: {
    color: '#6BBCF4'
  }
}
