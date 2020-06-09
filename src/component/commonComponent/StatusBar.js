import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter, StatusBar } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

export default class StatusBarComponent extends BaseComponent {
  static defaultProps = {
    height: Const.IS_iPhoneX ? 44 : 20,
    backgroundColor: '#fff',
    translucent: false,
    hidden: false,
    barStyle: 'dark-content',
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View
        style={{
          width: Const.mScreenWidth,
          height: this.props.hidden ? 0 : this.props.height,
          backgroundColor: this.props.backgroundColor,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <StatusBar barStyle={this.props.barStyle} hidden={this.props.hidden} />
      </View>
    )
  }
}
