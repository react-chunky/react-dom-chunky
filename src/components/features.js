import React from 'react'
import Component from '../core/Component'
import Blob from './blob'
import { Card, Chip, ChipContact, Icon, CardText, Button, CardTitle, CardActions } from 'react-mdl'

export default class FeaturesComponent extends Component {

  constructor(props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount() {
    super.componentDidMount()
  }

  codeLinks({ project, type }) {
    const githubLink = `http://github.com/react-chunky/${project}`
    const githubStarsBadge = `https://img.shields.io/github/stars/react-chunky/${project}.svg?style=social&label=Stars`
    const githubTagBadge = `https://img.shields.io/github/tag/react-chunky/${project}.svg?`
    const npmLink = `http://npmjs.com/package/${project}`
    const npmBadge = `https://img.shields.io/npm/v/${project}.svg`
    const npmDownloadsBadge = `https://img.shields.io/npm/dm/${project}.svg`

    return { githubLink, githubStarsBadge, githubTagBadge, npmLink, npmBadge, npmDownloadsBadge }
  }

  renderFeatureCodeContent(code) {
    const codeLinks = this.codeLinks(code)

    var links = (<div>
      <a href={codeLinks.githubLink} style={{ textDecoration: 'none'}}> <img src={codeLinks.githubTagBadge}/></a>
    </div>)

    if (code.type === 'npm') {
      links = (<div>
        <a href={codeLinks.npmLink} style={{ textDecoration: 'none'}}> <img src={codeLinks.npmBadge}/> </a>
        <a href={codeLinks.npmLink} style={{ marginLeft: 10, extDecoration: 'none'}}> <img src={codeLinks.npmDownloadsBadge}/> </a>
      </div>)
    }

    return (<CardText style={{textAlign: 'left', paddingLeft: 20 }}>
      <p>
        <a href={codeLinks.githubLink} style={{ textDecoration: 'none'}}>
          <Chip>
            <ChipContact>
              <span className="octicon octicon-mark-github" style={{fontSize: 24, marginTop: 4}}/>
            </ChipContact>
            { code.project }
          </Chip>
        </a>
      </p>
      { links }
    </CardText>)
  }

  renderFeatureContent(text) {
    return (<CardText style={{textAlign: 'left', paddingLeft: 20 }}>
      { text }
    </CardText>)
  }

  renderFeature({ id, title, color, icon, action, link, code, text }) {
    return (<div key={id} style={{ display: 'flex', flex: 1, padding: 20 }}>
            <Card shadow={0} style={{width: '320px', height: '380px', margin: 'auto'}}>
              <CardTitle expand style={{color: '#fff', paddingLeft: 20, background: `url(/assets/${icon}) bottom 100% right 10% no-repeat ${color}`}}>
                { title }
              </CardTitle>
              { code ? this.renderFeatureCodeContent(code) : this.renderFeatureContent(text) }
              <CardActions border style={{textAlign: 'center', padding: 20}}>
                  <a href={link} className="mdl-button mdl-js-button mdl-button--colored">{ action }
                    <Icon name='chevron_right' style={{marginTop: -3, padding: 0}}/>
                  </a>
              </CardActions>
          </Card>
        </div>)
  }

  renderComponent() {
    const width = this.isLargeScreen ? 800 : this.width

    return (<div style={{ color: "#607D8B", padding: 50, backgroundColor: "#E1F5FE", position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{textAlign: 'center' }}> { this.props.header } </h2>
      <div style={{ margin: 50, display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        { this.props.features.map(f => this.renderFeature(f)) }
      </div>
   </div>)
  }
}


// renderFeatureText({ title, paragraphs }) {
//   var pIndex = 0
//   return (<div style={{ display: 'flex', padding: 40, flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
//       <h4 style={{textAlign: 'center'}}>
//         { title }
//       </h4>
//       {
//          paragraphs.map(paragraph => {
//            pIndex = pIndex + 1
//            return (<p key={pIndex} style={{textAlign: "justify"}}>
//             { paragraph }
//            </p>)})
//       }
//     </div>)
// }
//
// renderFeatureImage({ image }) {
//   return (<div style={{ display: 'flex', margin: 40, height: '400px', flex: 1, justifyContent: 'center', background: `url(${image}) center / cover` }}>
//
//   </div>)
// }
//
// renderFeatureContent({ orientation, title, paragraphs, image }) {
//   if (orientation === "right") {
//     return [this.renderFeatureImage ({ image }), this.renderFeatureText ({ title, paragraphs })]
//   }
//
//   return [this.renderFeatureText ({ title, paragraphs }), this.renderFeatureImage ({ image })]
// }
//
// feature({ index, title, paragraphs, image }) {
//   const background = (index % 2 === 0 ? "#FFFFFF" : "#FAFAFA")
//   const orientation = (index % 2 === 0 ? "right" : "left")
//   return (<div key={index} style={{backgroundColor: background, minHeight: '300px', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//         <div style={{ width: "100%", display: 'flex', flex: 1, margin: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//           { this.renderFeatureContent ({ orientation, image, title, paragraphs })}
//         </div>
//   </div>)
// }
//
// get features() {
//   const data = [{
//     title: "You Can Finally Live Your Dream Of Becoming A Full Stack Product Developer.",
//     image: "/assets/feature1.png",
//     paragraphs: [
//       "Working for weeks on a small part of a software product, without seeing the big picture - that's demoralising, frustrating and demotivating. No Creative Developer wants to get stuck feeling like an invisible, irrelevant cog in a big marketing machine. That's a horrible feeling to have and you were not meant to live Your Developer Life like that.",
//       "You know that dream you always dream? The one where you are able to see the big picture? Of having a say in the product and of actually understanding how all the moving pieces of the product work together? You know, that dream of yours of becoming a Full Stack  Product Developer?",
//       "That's a really good dream to dream. But with Chunky, it doesn't have to be a dream any longer. You can start living it out. As of right now. With Chunky, you can actually, really become a Full Stack Product Developer and be as creative as you want to be, at every level of the product stack."
//     ]
//   }, {
//     title: "Unleash Your Creativity And Actually Enjoy Coding.",
//     image: "/assets/cover.jpg",
//     paragraphs: [
//       "What a concept, to actually enjoy coding. Imagine that. No seriously, imagine that - enjoying your work. So much so that you start looking forward to Mondays just so you can pick up where you left off on that dreadful Friday evening when you had to pack it all up for the week.",
//       "That's precisely what Chunky is all about it - helping you love Mondays. Chunky was created from scratch to love doing that necessary, tedious, code monkey work. He absolutely loves it and he is thrilled to free you up to take on the creative work."
//     ]
//   }, {
//     title: "Save Time By Leveraging The Chunky Stack.",
//     image: "/assets/cover.jpg",
//     paragraphs: [
//       "Being the opinionated playful code monkey that he is, Chunky has stacked up a lot of fun code toys to play with. If you peak into Chunky's Stack of tech toys, you'll find he is a big fan of React Mobile and Web Development, Static Site Generation and Serverless Cloud Architecture.",
//       "Here are just a few of the technologies that come built-in, integrated and ready to use in your next Chunky Full Stack Product:",
//       "React, Redux, Reselect, React Navigation, React Native, React Native Elements, React Native Vector Icons, React Router, Material, React Material, Webpack, Serverless, Firebase, AWS.",
//       "This means that you can save yourself hundreds of precious hours of research, integration and configuration by using the Chunky Stack, and just focus on unleashing your creativity and being awesome."
//     ]
//   }]
//
//   var index = 0
//   return data.map(f => {
//     index = index + 1
//     return this.feature({ ...f, index })
//   })
// }
