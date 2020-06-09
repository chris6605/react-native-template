import React, { Component } from 'react'
import { Image, Dimensions } from 'react-native'

const WinWidth = Dimensions.get('window').width

class AutoSizedImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      finalSize: {
        width: 0,
        height: 0,
      },
    }
  }

  static defaultProps = {
    style: {
      backgroundColor: 'transparent',
    },
    source: {
      uri: '',
    },
  }

  componentDidMount() {
    //avoid repaint if width/height is given
    if (this.props.style.width || this.props.style.height) {
      return
    }
    Image.getSize(this.props.source.uri, (w, h) => {
      const finalSize = {
        width: w,
        height: h,
      }
      if (w > WinWidth) {
        finalSize.width = WinWidth
        const ratio = finalSize.width / w
        finalSize.height = h * ratio
      }
      this.setState({
        finalSize,
      })
    })
  }

  render() {
    return <Image {...this.props} resizeMode={'contain'} style={[this.props.style, this.state.finalSize.width && this.state.finalSize.height ? this.state.finalSize : null]} />
  }
}

export default AutoSizedImage
