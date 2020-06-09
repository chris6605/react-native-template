import React, { Component } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

interface WebImageProps {
  // 图片的URL
  uri?: string

  resizeMode?: string

  style?: StyleProp<ViewStyle>
}

export default class WebImage extends Component<WebImageProps, {}> {}
