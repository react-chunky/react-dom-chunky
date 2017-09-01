import React from 'react'
import Screen from '../../core/Screen'
import CSSModules from 'react-css-modules'
import styles from './style.css'

import {
  Card,
  CardActions,
  Button,
  CardText,
  CardTitle
} from 'react-mdl'

class ChallengeScreen extends Screen {

  challengeId() {
    return this.props.match.params.challengeId
  }

  renderScreen () {
      return (<Card shadow={0} style={{width: '512px', margin: 'auto'}}>
        <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}> 
        Challenge #{ this.challengeId() } </CardTitle>
        <CardText>
        </CardText>
        <CardActions>
            <Button raised ripple href="/challenges"> 
              Back To Challenges
          </Button>
          </CardActions>
      </Card>)
  }
}

export default CSSModules(ChallengeScreen, styles)
