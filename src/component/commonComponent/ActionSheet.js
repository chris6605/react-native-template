import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BaseDiaolog from '../../base/BaseDialog'

export default class ActionSheet extends BaseDiaolog {
  callback = null

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      initIndex: undefined,
    }
  }

  /**
   *
   * @param {*} data 数组元素
   */
  setContent(data, initIndex) {
    this.setState({ data, initIndex })
    return this
  }

  /**
   * 点击的回调 index参数
   * @param {*} callback
   */
  onPress(callback) {
    this.callback = callback
    return this
  }

  renderContent() {
    return (
      <View style={{ width: Const.mScreenWidth, backgroundColor: '#fff' }}>
        {this.state.data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                width: Const.mScreenWidth,
                height: Const.getSize(50),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                this.dismiss()
                this.callback && this.callback(index)
              }}>
              <Text style={{ fontSize: Const.getSize(16), color: this.state.initIndex === index ? 'blue' : '#333' }}>{item}</Text>
            </TouchableOpacity>
          )
        })}

        <TouchableOpacity
          style={{
            width: Const.mScreenWidth,
            height: Const.getSize(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            this.dismiss()
          }}>
          <Text style={{ fontSize: Const.getSize(16), color: '#666' }}>取消</Text>
        </TouchableOpacity>

        <View style={{ width: Const.mScreenWidth, height: Const.mBottomHeight }} />
      </View>
    )
  }

  _getContentPosition() {
    return {
      justifyContent: 'flex-end',
      alignItems: 'center',
    }
  }
}
