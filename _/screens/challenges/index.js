import React from 'react'
import Screen from '../../core/Screen'
import CSSModules from 'react-css-modules'
import styles from './style.css'
import { Link, Redirect } from 'react-router-dom'

import {
  List,
  ListItem,
  ListItemAction,
  ListItemContent,
  Chip,
  ChipContact,
  Icon,
  Button,
  Card,
  CardText,
  CardTitle,
  CardActions
} from 'react-mdl'

class ChallengesScreen extends Screen {

  typeProps(type) {
    switch (type) {
      case "DevOps":
      return {
        name: type,  
        color: "#AB47BC",
        image: "/devops.png"
      }
      case "Mobile":
      return { 
        name: type, 
        color: "#03A9F4",
        image: "/mobile.png"
      }
      case "Web":
      return { 
        name: type,  
        color: "#8BC34A",
        image: "/web.png"
      }
    }
  }

  levelProps(level) {
    switch (level) {
      case "Beginner":
      return {
        name: level,  
        color: "#9CCC65"
      }
      case "Intermediate":
      return {
        name: level,  
        color: "#FFCA28"
      }
      case "Advanced":
      return {
        name: level,  
        color: "#ff1744"
      }
    }
  }


  get items () {
    return [{
      id: 1,
      title: "Install Node on your machine",
      summary: "This challenge will take you through the entire process of downloading and installing Node.JS on your working machine.",
      type: this.typeProps("DevOps"),
      level: this.levelProps("Beginner")
    }, {
      id: 2,
      title: "Install Visual Studio Code",
      summary: "Walk through a simple challenge that will help you download and install Microsoft's Open Source Editor right on your machine.",
      type: this.typeProps("DevOps"),
      level: this.levelProps("Beginner")
    }, {
      id: 3,
      title: "Handle keyboard scrolling",
      summary: "summary",
      type: this.typeProps("Mobile"),
      level: this.levelProps("Intermediate")
    }, {
      id: 4,
      title: "Add push notifications support",
      summary: "summary",
      type: this.typeProps("Mobile"),
      level: this.levelProps("Advanced")
    }, {
      id: 5,
      title: "Setup static site rendering",
      summary: "summary",
      type: this.typeProps("Web"),
      level: this.levelProps("Advanced")
    }, {
      id: 6,
      title: "Add a dynamic React Router",
      summary: "Follow along to learn how to enable dynamic routing to your app",
      type: this.typeProps("Web"),
      level: this.levelProps("Intermediate")
    }]
  }
  
  renderItem (item) {
      return (<ListItem styleName="item" key={item.id}>
        <Card styleName="card" 
              shadow={2}>
          <CardTitle expand styleName="cardTitle"
             style={{background: `url(${item.type.image}) top 15% center no-repeat ${item.type.color}`}}>
            { item.title }
          </CardTitle>
          <CardText>
            <p styleName="cardText">
             { item.summary }
            </p>
          </CardText>

          <CardText>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{flex: 1}}>
                <Chip styleName="chip" style={{
                    backgroundColor: item.type.color
                }}> { item.type.name } </Chip>
                <Chip styleName="chip" style={{
                    backgroundColor: item.level.color
                }}> { item.level.name } </Chip>
              </div>
          
              <div style={{flex: 1, textAlign: 'right'}}>
                    <div style={{display: 'flex', 
                          alignItems: 'flex-end', 
                          justifyContent: 'center',
                          flexDirection: 'column', 
                          height: '100%'}}>
                            <Chip style={{backgroundColor: '#eeeeee', color: "#333333"}}>
                            <ChipContact style={{ background: 'url("/star.png") 0 0 / cover' }}/>
                              50 Points
                            </Chip>   
                    </div>
                </div>
            </div>
          </CardText>
          <CardActions border>
            <div style={{textAlign: 'center'}}>
                <Button raised primary ripple href={`/challenges/${item.id}`}> 
                  Start
                </Button>
            </div>
          </CardActions>
      </Card>
    </ListItem>)
  }

  renderItems() {
    return this.items.map(item => this.renderItem(item))
  }

  renderScreen() {
    return (<List styleName="items">
       { this.renderItems() }
    </List>)
  }
}

export default CSSModules(ChallengesScreen, styles)
