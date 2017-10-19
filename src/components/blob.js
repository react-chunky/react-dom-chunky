import React from 'react'
import Component from '../core/Component'
import "react-placeholder/lib/reactPlaceholder.css"
import { ProgressBar } from 'react-mdl'
import ReactPlaceholder from 'react-placeholder'
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'

export default class BlobComponent extends Component {

  constructor(props) {
    super(props)
    this.state = { ...this.state, loading: true }
  }

  componentDidMount() {
    super.componentDidMount()
    this.loadContent()
  }

  loadContent() {
    this.loadBlob(this.props.blob).
            then(text => {
              this.setState({ loading: false, text })
            }).
            catch(error => {
              this.setState({ error })
            })
  }

  get placeholder() {
    return (<div style={{justifyContent: 'center'}}>
        <RectShape color='#CFD8DC' style={{ height: 40, marginBottom: 10}}/>
        <ProgressBar indeterminate style={{ width: '100%', marginBottom: 10 }} />
        <TextBlock rows={7} color='#ECEFF1'/>
      </div>)
  }

  renderComponentContent({ titleColor, textColor }) {
    const className = `_blob-${this.id}`
    return (<div>
        <div className={className} dangerouslySetInnerHTML={{ __html: this.state.text }}/>
        <style jsx>{`
           {
             .${className} :global(h2) {
               text-align: center;
               font-size: 42px;
               font-weight: 300;
               line-height: 1.2;
               margin-bottom: 50px;
               color: ${titleColor};
             }
             .${className} :global(p) {
               text-align: justify;
               margin-bottom: 30px;
               font-size: 24px;
               font-weight: 300;
               line-height: 1.5;
               color: ${textColor};
             }
            }
        `}</style>
    </div>)
  }

  renderComponent() {
    return (<div>
      <ReactPlaceholder showLoadingAnimation={true} rows={7} ready={!this.state.loading} customPlaceholder={this.placeholder}>
        { this.renderComponentContent({ titleColor: "#263238", textColor: "#455A64" }) }
      </ReactPlaceholder>
      </div>)
  }
}
