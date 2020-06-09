import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter, StatusBar } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

export default class Toast extends BaseComponent {
  path = new Animated.Value(0)
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      visible: false,
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  static showToast(message) {
    global.dsToast.show(message)
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
            borderRadius: Const.getSize(5),
            opacity: this.path.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}>
          <Text
            style={{
              paddingHorizontal: Const.getSize(20),
              paddingVertical: Const.getSize(7),
              fontSize: Const.getSize(13),
              color: '#fff',
            }}>
            {this.state.message}
          </Text>
        </Animated.View>
      </View>
    ) : null
  }

  show(message) {
    this.setState(
      {
        visible: true,
        message: message,
      },
      () => {
        Animated.timing(this.path, {
          toValue: 1,
          duration: 250,
        }).start()
      },
    )

    this.timer = setTimeout(() => {
      this.dismiss()
    }, 1000)
  }

  dismiss() {
    Animated.timing(this.path, {
      toValue: 0,
      duration: 250,
    }).start(() => {
      this.setState({ visible: false, message: '' })
    })
  }
}
