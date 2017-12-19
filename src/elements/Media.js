import React, { PureComponent } from 'react'
import ProgressiveImage from 'react-progressive-image'
import cache from '../core/Cache'
import ReactPlayer from 'react-player'
import { renderResponsive } from '../utils/responsive'

export default class Media extends PureComponent {

  constructor (props) {
    super(props)
  }

  renderImage (name, src, placeholder) {
    return (<ProgressiveImage src={src} placeholder={placeholder}>
      {(src, loading) => {
        return <img style={Object.assign({}, this.props.style, { opacity: loading ? 0.5 : 1 })} src={src} alt={name} />
      }}
    </ProgressiveImage>)
  }

  renderResponsiveImage (image) {
    return renderResponsive(
      image.id,
      this.renderImage(this.props.image, image.data.images[0].path, image.data.placeholder),
      this.renderImage(this.props.image, image.data.images[1].path, image.data.placeholder))
  }

  render () {
    if (this.props.video) {
      return (<ReactPlayer ref={(player) => { this.coverPlayer = player }} url={this.props.video} playing={this.props.playing} width='100%'
        height='100%' />)
    }

    if (!this.props.image) {
      return
    }

    const i = cache.image(this.props.image)
    return this.renderResponsiveImage(i)
  }

}
