import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  DeviceEventEmitter,
  StatusBar,
  ActivityIndicator,
} from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

export default class Loading extends BaseComponent {
  path = new Animated.Value(0)
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    return this.state.visible ? (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            backgroundColor: '#222',
            opacity: this.path.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            width: Const.getSize(90),
            height: Const.getSize(90),
            borderRadius: Const.getSize(8),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color="#fff" animating={true} size="large" />
        </Animated.View>
      </View>
    ) : null
  }

  show() {
    this.setState(
      {
        visible: true,
      },
      () => {
        Animated.timing(this.path, {
          toValue: 1,
          duration: 250,
        }).start()
      },
    )
  }

  dismiss() {
    Animated.timing(this.path, {
      toValue: 0,
      duration: 250,
    }).start(() => {
      this.setState({ visible: false })
    })
  }
}
