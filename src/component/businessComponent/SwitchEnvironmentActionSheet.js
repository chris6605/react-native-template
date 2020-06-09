import React, { Component } from 'react'

import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter, TextInput } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BaseDialog from '../../base/BaseDialog'

export default class SwitchEnvironmentActionSheet extends BaseDialog {
  callback = null
  _bgCloseable = false

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      initIndex: undefined,
      hostAddress: '',
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

  dismiss() {
    super.dismiss()
    this._bgCloseable = false
    this.setState({ data: [], initIndex: undefined, hostAddress: '' })
  }

  renderContent() {
    return (
      <View style={{ width: Const.mScreenWidth, backgroundColor: '#fff' }}>
        <TextInput
          style={{
            marginTop: Const.getSize(10),
            marginBottom: Const.mScreenHeight / 5,
            paddingHorizontal: Const.getSize(20),
            width: Const.mScreenWidth,
            height: Const.getSize(50),
            fontSize: Const.getSize(16),
            color: '#333',
          }}
          ref={(ref) => (this.textInput = ref)}
          placeholder={'输入您的IP地址'}
          placeholderTextColor="#999"
          underlineColorAndroid="transparent"
          value={this.state.hostAddress}
          returnKeyType="done"
          onChangeText={(text) => {
            this.setState({ hostAddress: text })
          }}
          onSubmitEditing={(e) => {
            let text = e.nativeEvent.text.trim()
            this.setState({ hostAddress: text })
            if (text) {
              let data = this.state.data
              let tempData = data.concat({ name: 'your ip:', url: text })
              global.hostAddress = tempData
              this.setState({ data: tempData })
            }
          }}
        />

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
                this.setState({ initIndex: index })
                this.callback && this.callback(index)
              }}>
              <Text style={{ fontSize: Const.getSize(16), color: this.state.initIndex == index ? Const.themeColor : '#333' }}>{item.name + '  ' + item.url}</Text>
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
