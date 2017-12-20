import React, { PureComponent } from 'react'
import { renderResponsive } from '../utils/responsive'
import {
  Icon,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography
} from 'rmwc'

export default class Footer extends PureComponent {

  constructor (props) {
    super(props)
  }

  renderFooterSectionElement (element) {
    return (<ListItem key={element.id} style={{}}>
      <Button style={{color: this.props.theme.footerTintColor, textAlign: 'left'}}>
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
          <ListItemText style={{color: this.props.theme.footerHeaderColor}}> {section.title} </ListItemText>
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

  renderDefault () {
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

  render () {
    return this.renderDefault()
  }

}
