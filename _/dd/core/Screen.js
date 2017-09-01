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

export default class Screen extends Component {

  constructor(props) {
    super(props)
     this.handleWidth = 100;
     this.state = { height: 0, width: 0};
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

  get menu () {
    if (!this.props.menu) {
      return [<a key={"menu/back"} styleName="menuItem"> Back </a>]
    }

    return this.props.menu.map(menuItem => {
      const badge = (menuItem.badge ? { text: menuItem.badge } : {})
      return (<a key={menuItem.id} href={menuItem.link} styleName="menuItem"> <Badge {...badge} >{ menuItem.title }</Badge> </a>)
    })
  }

  renderHeader() {
    return (<Header transparent styleName="header">
      <Navigation styleName="menu">
        { this.menu }
      </Navigation>
      { this.actionMenu}
    </Header>)
  }

  renderDrawer() {
    return (<Drawer>
      <Navigation>
        { this.menu }
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
              <div styleName="container">
                { this.renderScreen()}
              </div>
            </Content>
      </Layout>)
  }
}