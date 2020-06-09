import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BaseDiaolog from '../../base/BaseDialog'

export default class SimpleAlert extends BaseDiaolog {
  _bgCloseable = true

  childView = null

  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * 赋值
   * @view zujian
   */
  setContentView(view) {
    this.childView = view
    return this
  }

  renderContent() {
    return (
      <View
        style={{
          width: Const.mScreenWidth - Const.getSize(40),
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: Const.getSize(8),
          overflow: 'hidden',
        }}>
        {this.renderChildView()}
      </View>
    )
  }

  renderChildView() {
    return this.childView
  }
}
