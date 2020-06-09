import React, { Component } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

interface SVGProps {
  // svg名称
  icon?: string

  size?: number

  // fill
  color?: string

  style?: StyleProp<ViewStyle>
}

export default class SVG extends Component<SVGProps, {}> {}
