import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BaseDiaolog from '../../base/BaseDialog'

export default class CustomAlert extends BaseDiaolog {
  _bgCloseable = true

  leftCallback = null
  rightCallback = null

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      leftText: '',
      rightText: '',
    }
  }

  /**
   * 赋值
   * @param {*} title
   * @param {*} content
   * @param {*} leftText
   * @param {*} rightText
   */
  setContent(title = '', content = '', leftText = '', rightText = '', leftColor = Const.grayColor, rightColor = Const.themeColor) {
    this.setState({ title, content, leftText, rightText, leftColor, rightColor })
    return this
  }

  /**
   * 底部两个按钮的回调
   * 如果底部只有一个按钮 写left就可以了
   * @param {*} leftCallback
   * @param {*} rightCallback
   */
  onPress(leftCallback, rightCallback) {
    this.leftCallback = leftCallback
    this.rightCallback = rightCallback
    return this
  }

  renderContent() {
    return (
      <View
        style={{
          width: Const.mScreenWidth - Const.getSize(60),
          backgroundColor: '#fff',
          paddingHorizontal: Const.getSize(15),
          paddingTop: Const.getSize(30),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: Const.getSize(8),
          overflow: 'hidden',
        }}>
        {this.renderTitle()}
        {this.renderText()}
        {this.renderBottomBtn()}
      </View>
    )
  }

  renderTitle() {
    return this.state.title ? (
      <Text
        style={{
          width: Const.mScreenWidth - Const.getSize(90),
          fontSize: Const.getSize(20),
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {this.state.title}
      </Text>
    ) : null
  }

  renderText() {
    return this.state.content ? (
      <Text
        style={{
          marginTop: this.state.title ? Const.getSize(20) : 0,
          width: Const.mScreenWidth - Const.getSize(90),
          lineHeight: Const.getSize(22),
          fontSize: Const.getSize(16),
          color: '#666',
          textAlign: 'center',
        }}>
        {this.state.content}
      </Text>
    ) : null
  }

  renderBottomBtn() {
    if (this.state.leftText && this.state.rightText) {
      return (
        <View
          style={{
            marginTop: Const.getSize(20),
            width: Const.mScreenWidth - Const.getSize(90),
            height: Const.getSize(50),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              this.dismiss()
              this.leftCallback && this.leftCallback()
            }}>
            <Text style={{ fontSize: Const.getSize(16), color: this.state.leftColor }}>{this.state.leftText}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              this.dismiss()
              this.rightCallback && this.rightCallback()
            }}>
            <Text style={{ fontSize: Const.getSize(16), color: this.state.rightColor }}>{this.state.rightText}</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (this.state.leftText) {
      return (
        <View
          style={{
            marginTop: Const.getSize(10),
            width: Const.mScreenWidth - Const.getSize(90),
            height: Const.getSize(50),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              this.dismiss()
              this.leftCallback && this.leftCallback()
            }}>
            <Text style={{ fontSize: Const.getSize(16), color: this.state.leftColor }}>{this.state.leftText}</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return <View style={{ width: Const.mScreenWidth - Const.getSize(90), height: Const.getSize(30) }} />
    }
  }
}
