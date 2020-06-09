import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter, TextInput } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BaseDialog from '../../base/BaseDialog'

export default class PasswordAlert extends BaseDialog {
  _bgCloseable = true

  childView = null

  payCallback = null

  constructor(props) {
    super(props)
    this.state = {
      password: '',
    }
  }

  onPay(callback) {
    this.payCallback = callback
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

  show() {
    this.setState({ password: '' })
    super.show(() => {
      this.textInput && this.textInput.focus()
    })
  }

  renderChildView() {
    return (
      <View style={{ width: Const.mScreenWidth - Const.getSize(40) }}>
        <View style={{ width: Const.mScreenWidth - Const.getSize(40), paddingVertical: Const.getSize(40), justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: Const.getSize(16), color: Const.blackColor, fontWeight: 'bold' }}>请输入支付密码</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              marginTop: Const.getSize(20),
              width: Const.getSize(45 * 6),
              height: Const.getSize(45),
              borderRadius: Const.getSize(5),
              borderColor: Const.grayColor,
              borderWidth: Const.ONE_PIXEL,
            }}
            onPress={() => {
              this.textInput.focus()
            }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: Const.getSize(45 * 6),
                  height: Const.getSize(45),
                  opacity: 0,
                }}
                maxLength={6}
                ref={(ref) => (this.textInput = ref)}
                keyboardType="number-pad"
                underlineColorAndroid="transparent"
                value={this.state.password}
                onChangeText={(text) => {
                  this.setState({ password: text }, () => {
                    if (text.length === 6) {
                      this.payCallback && this.payCallback(this.state.password)
                      this.dismiss()
                    }
                  })
                }}
                onSubmitEditing={(e) => {
                  let text = e.nativeEvent.text.trim()
                  this.setState({ password: text })
                }}
              />
              {this.getInputItem()}
            </View>

            <View style={{ position: 'absolute', top: 0, left: Const.getSize(45), height: Const.getSize(45), width: Const.ONE_PIXEL, backgroundColor: Const.grayColor }} />
            <View style={{ position: 'absolute', top: 0, left: Const.getSize(45 * 2), height: Const.getSize(45), width: Const.ONE_PIXEL, backgroundColor: Const.grayColor }} />
            <View style={{ position: 'absolute', top: 0, left: Const.getSize(45 * 3), height: Const.getSize(45), width: Const.ONE_PIXEL, backgroundColor: Const.grayColor }} />
            <View style={{ position: 'absolute', top: 0, left: Const.getSize(45 * 4), height: Const.getSize(45), width: Const.ONE_PIXEL, backgroundColor: Const.grayColor }} />
            <View style={{ position: 'absolute', top: 0, left: Const.getSize(45 * 5), height: Const.getSize(45), width: Const.ONE_PIXEL, backgroundColor: Const.grayColor }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  getInputItem() {
    let inputArr = []
    let passwordLen = this.state.password.length
    for (let i = 0; i < 6; i++) {
      let input = (
        <View
          key={i}
          style={{
            width: Const.getSize(45),
            height: Const.getSize(45),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {i < passwordLen ? <View style={{ width: Const.getSize(10), height: Const.getSize(10), borderRadius: Const.getSize(5), backgroundColor: Const.blackColor }} /> : null}
        </View>
      )
      inputArr.push(input)
    }

    return inputArr
  }
}
