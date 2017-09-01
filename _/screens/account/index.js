import React from 'react'
import Screen from '../../core/Screen'
import CSSModules from 'react-css-modules'
import styles from './style.css'

import {
  Card,
  CardText,
  CardTitle,
  CardActions,
  CardMenu,
  IconButton,
  Button
} from 'react-mdl'

class AccountScreen extends Screen {

  renderScreen () {
      return (<Card shadow={0} style={{width: '512px', margin: 'auto'}}>
        <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}> Your Account </CardTitle>
        <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris sagittis pellentesque lacus eleifend lacinia...
        </CardText>
        <CardActions border>
            <Button colored>Logout</Button>
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
        </CardMenu>
    </Card>)
  }
}

export default CSSModules(AccountScreen, styles)

