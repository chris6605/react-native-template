import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter, StatusBar } from 'react-native'

import BaseComponent from '../../../base/BaseComponent'

import Const from '../../../Const'

import FastImage from 'react-native-fast-image'

import ImageMap from '../../../asset/ImageMap'

export default class WebImage extends BaseComponent {
  static defaultProps = {
    uri: '',
    backgroundColor: '#f2f2f2',
    resizeMode: 'cover',
  }

  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
    }
  }

  render() {
    return (
      <View
        style={{ ...this.props.style, overflow: 'hidden' }}
        onLayout={(e) => {
          let w = e.nativeEvent.layout.width
          let h = e.nativeEvent.layout.height
          this.setState({ width: w, height: h })
        }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: this.props.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: this.state.width * 0.8, height: this.state.height * 0.8 }} resizeMode="contain" source={ImageMap.placeholder} />
        </View>

        <FastImage style={{ ...this.props.style }} resizeMode={this.props.resizeMode} source={{ uri: this.props.uri }} />
      </View>
    )
  }
}
