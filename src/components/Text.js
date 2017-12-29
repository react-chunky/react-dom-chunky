import React from 'react'
import Component from '../core/Component'
import ReactPlaceholder from 'react-placeholder'
import { TextBlock, MediaBlock, TextRow, RectShape, RoundShape } from 'react-placeholder/lib/placeholders'
import marked from 'marked'
import 'react-placeholder/lib/reactPlaceholder.css'

export default class Text extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state, loading: true }
  }

  componentDidMount () {
    super.componentDidMount()
    this.loadContent()
  }

  loadText (name) {
    return fetch(`/assets/text/${name}.md`)
           .then(response => response.text())
           .then(markdown => marked(markdown, {}))
  }

  loadContent () {
    this.loadText(this.props.source)
            .then(text => {
              this.setState({ loading: false, text })
            })
            .catch(error => {
              this.setState({ error })
            })
  }

  get placeholder () {
    return (<div style={{justifyContent: 'center'}}>
      <RectShape color='#CFD8DC' style={{height: 40, marginBottom: 10}} />
      <TextBlock rows={7} color='#ECEFF1' />
    </div>)
  }

  renderComponentContent ({ titleColor, textColor }) {
    const className = `text`
    return (<div>
      <div className={className} dangerouslySetInnerHTML={{ __html: this.state.text }} />
    </div>)
  }

  renderComponent () {
    return (<div style={Object.assign({}, {
      textAlign: 'center'
    }, this.props.style)}>
      <ReactPlaceholder
        showLoadingAnimation
        rows={7}
        ready={!this.state.loading}
        customPlaceholder={this.placeholder}>
        { this.renderComponentContent({ titleColor: '#263238', textColor: '#455A64' }) }
      </ReactPlaceholder>
    </div>)
  }
}
