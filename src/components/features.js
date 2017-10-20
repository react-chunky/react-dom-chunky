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
