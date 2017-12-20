import React, { PureComponent } from 'react'
import { renderResponsive } from '../utils/responsive'
import {
  Icon,
  Theme,
  List,
  ListItem,
  ListItemText,
  Button,
  Toolbar,
  ToolbarRow,
  ToolbarIcon,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarSection,
  ToolbarFixedAdjust,
  Typography
} from 'rmwc'

export default class Navigation extends PureComponent {

  constructor (props) {
    super(props)
    this._onMenuToggle = this.onMenuToggle.bind(this)
  }

  renderNavigationMenuItem (item, index) {
    return renderResponsive(`menuItem${index++}`,
      <ToolbarIcon use={item.icon} style={{color: this.props.theme.navigationTintColor}} />,
      <Button style={{color: this.props.theme.navigationTintColor, marginRight: '20px'}}>
        { item.title }
      </Button>)
  }

  onMenuToggle () {
    this.props.onMenuToggle && this.props.onMenuToggle()
  }

  renderNavigationMenu () {
    var index = 0
    return this.props.menu.map(item => this.renderNavigationMenuItem(item, index++))
  }

  renderNavigationLogo () {
    const image = (this.props.navigationUncover ? this.props.theme.logoImage : this.props.theme.logoLightImage)
    const height = (this.props.navigationUncover ? 64 : 64)

    return renderResponsive('logo',
      <ToolbarMenuIcon use='menu' style={{color: this.props.theme.navigationTintColor}} onClick={this._onMenuToggle} />,
      <img src={`/assets/${image}`} style={{height: `${height}px`, marginLeft: '20px'}} />
      )
  }

  renderDefault () {
    return (<Toolbar waterfall fixed={this.props.layout.fixed} style={{
      backgroundColor: this.props.theme.navigationColor}}>
      <ToolbarRow>
        <ToolbarSection alignStart>
          { this.renderNavigationLogo() }
        </ToolbarSection>
        <ToolbarSection alignEnd>
          { this.renderNavigationMenu() }
        </ToolbarSection>
      </ToolbarRow>
    </Toolbar>)
  }

  render () {
    return this.renderDefault()
  }

}