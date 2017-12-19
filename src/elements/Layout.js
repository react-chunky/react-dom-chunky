import React, { PureComponent } from 'react'
import {
  Icon,
  Theme,
  Grid,
  GridCell,
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
import 'node_modules/material-components-web/dist/material-components-web.css'
import css from 'styled-jsx/css'
import Cover from '../elements/Cover'
import Drawer from '../elements/Drawer'
import Media from '../elements/Media'
import { CSSTransitionGroup } from 'react-transition-group'
import { renderResponsive } from '../utils/responsive'

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

  isColorLight (c) {
    var c = c.substring(1)
    const rgb = parseInt(c, 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return (luma > 210)
  }

  renderDrawer () {
    return (<Drawer open={this.state.menuOpened} />)
  }

  renderDrawerMenu () {
    var index = 0
    return this.props.menu.map(item => (<ListItem key={`menuItem${index++}`}>
      <ListItemText>{ item.title }</ListItemText>
    </ListItem>))
  }

  get theme () {
    const navigationColor = (this.navigationUncover ? `rgba(0,0,0,0)` : this.props.theme.navigationColor)
    const navigationTintColor = (this.navigationUncover ? '#FFFFFF' : this.props.theme.navigationTintColor)

    return Object.assign({}, this.props.theme, {
      navigationColor, navigationTintColor
    })
  }

  renderNavigationMenuItem (item, index) {
    return renderResponsive(`menuItem${index++}`,
      <ToolbarIcon use={item.icon} style={{color: this.theme.navigationTintColor}} />,
      <Button style={{color: this.theme.navigationTintColor, marginRight: '20px'}}>
        { item.title }
      </Button>)
  }

  renderNavigationMenu () {
    var index = 0
    return this.props.menu.map(item => this.renderNavigationMenuItem(item, index++))
  }

  renderNavigationLogo () {
    // return this.renderResponsive('logo',
    //   <ToolbarMenuIcon use='menu' style={{color: this.theme.navigationTintColor}} onClick={() => this.setState({menuOpened: !this.state.menuOpened})} />,
    //   <Icon> /assets/logo.png </Icon>)
  }

  renderNavigation () {
    return (<Toolbar waterfall fixed={this.props.layout.fixed} style={{
      backgroundColor: this.theme.navigationColor}}>
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
      <Media video={this.cover.video} image={this.cover.image} playing={coverPlaying} style={coverStyle} />
      <Cover {...this.props.cover} onPrimaryAction={this._onPrimaryAction} />
    </div>)
  }

  renderFooterSectionElement (element) {
    return (<ListItem key={element.id} style={{}}>
      <Button style={{color: this.theme.footerTintColor, textAlign: 'left'}}>
        { element.title }
      </Button>
    </ListItem>)
  }

  renderFooterSection (section) {
    return (<div key={`footerSection${section.id}`} style={{
      marginRight: '20px'
    }}>
      <List>
        <ListItem style={{marginLeft: '15px'}}>
          <ListItemText style={{color: this.theme.footerHeaderColor}}> {section.title} </ListItemText>
        </ListItem>
        { section.elements.map(element => this.renderFooterSectionElement(element)) }
      </List>
    </div>)
  }

  renderFooterSections () {
    return this.props.footer.sections.map(section => this.renderFooterSection(section))
  }

  renderFooterLegal () {
    return (<List style={{
      display: 'flex',
      flex: '1',
      alignSelf: 'flex-start',
      justifyContent: 'flex-end',
      flexDirection: 'column'
    }}>
      <ListItem style={{marginRight: '20px', color: this.props.theme.footerHeaderColor,
        alignSelf: 'flex-end'
      }}>
        <ListItemText> {this.props.info.copyright} </ListItemText>
      </ListItem>
    </List>)
  }

  renderFooter () {
    return (<div style={{
      backgroundColor: this.props.theme.footerColor,
      minHeight: '80px',
      padding: '10px',
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'start',
      flexDirection: 'row',
      justifyContent: 'start',
      color: '#ECEFF1'
    }}>
      { this.renderFooterSections() }
      { this.renderFooterLegal() }
    </div>)
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
