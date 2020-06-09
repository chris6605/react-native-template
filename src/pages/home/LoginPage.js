import React, { Component } from 'react'

import { Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TextInput, ScrollView, StatusBar } from 'react-native'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BasePage from '../../base/BasePage'

import RNSwiper from 'react-native-swiper'

import Toast from '../../component/commonComponent/Toast'

import CountDownButton from '../../component/commonComponent/CountDownButton'

import svgs from '../../asset/svgMap'

import SVG from '../../component/commonComponent/SVG'

import CacheApi from '../../api/CacheApi'

import CheckUtils from '../../utils/CheckUtils'

import ds from '../../ds'

import ImageMap from '../../asset/ImageMap'

export default class HomeIndexPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      password: '',
      messageCode: '',
      isPassword: true,
      vfCodeEnable: false,
    }
  }

  _pageWillStart() {}

  _pageStart() {}

  getData() {}

  getMessageCode() {}

  passwordLogin() {}

  vfcodeLogin() {}

  login() {
    if (!this.state.phone) {
      ds.toast.show('请输入手机号/邮箱')
      return
    }

    if (!CheckUtils.checkMobile(this.state.phone) && !CheckUtils.isEmail(this.state.phone)) {
      ds.toast.show('手机号/邮箱格式不正确')
      return
    }

    if (this.state.isPassword) {
      // 密码登录
      this.passwordLogin()
    } else {
      //验证码登录
      this.vfcodeLogin()
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        {this._renderStatusBar('transparent', 'light-content')}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Image style={{ flex: 1 }} source={ImageMap.login_bg} />
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={{ width: Const.mScreenWidth, height: Const.mScreenHeight, alignItems: 'center' }}>
            <View style={{ marginTop: Const.mStatusBarHeight + Const.getSize(60) }}>
              <Image style={{ width: Const.getSize(60), height: Const.getSize(60) }} source={ImageMap.logo} />
            </View>

            <View
              style={{
                paddingHorizontal: Const.getSize(16),
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Const.getSize(60),
                width: Const.getSize(300),
                height: Const.getSize(50),
                backgroundColor: '#192730',
                borderRadius: Const.getSize(25),
              }}>
              <SVG icon={'account'} size={Const.getSize(20)} color={Const.themeColor} />
              <TextInput
                style={{
                  marginLeft: Const.getSize(10),
                  flex: 1,
                  height: Const.getSize(50),
                  fontSize: Const.getSize(18),
                  color: '#fff',
                }}
                ref={(ref) => (this.textInput = ref)}
                placeholder={'手机号码/邮箱'}
                placeholderTextColor="#2F4D5F"
                underlineColorAndroid="transparent"
                value={this.state.phone}
                onChangeText={(text) => {
                  this.setState({ phone: text })
                  if (CheckUtils.checkMobile(text) || CheckUtils.isEmail(text)) {
                    this.setState({ vfCodeEnable: true })
                  } else {
                    this.setState({ vfCodeEnable: false })
                  }
                }}
                onSubmitEditing={(e) => {
                  let text = e.nativeEvent.text.trim()
                  this.setState({ phone: text })
                }}
              />
            </View>

            {this.state.isPassword ? null : (
              <View
                style={{
                  paddingLeft: Const.getSize(16),
                  paddingRight: Const.getSize(5),
                  marginTop: Const.getSize(22),
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: Const.getSize(300),
                  height: Const.getSize(50),
                  backgroundColor: '#192730',
                  borderRadius: Const.getSize(25),
                }}>
                <SVG icon={'messageCode'} size={Const.getSize(20)} color={Const.themeColor} />
                <TextInput
                  style={{
                    marginLeft: Const.getSize(10),
                    flex: 1,
                    height: Const.getSize(50),
                    fontSize: Const.getSize(18),
                    color: '#fff',
                  }}
                  ref={(ref) => (this.textInput = ref)}
                  placeholder={'验证码'}
                  keyboardType="number-pad"
                  placeholderTextColor="#2F4D5F"
                  underlineColorAndroid="transparent"
                  value={this.state.messageCode}
                  onChangeText={(text) => {
                    this.setState({ messageCode: text })
                  }}
                  onSubmitEditing={(e) => {
                    let text = e.nativeEvent.text.trim()
                    this.setState({ messageCode: text })
                  }}
                />

                <CountDownButton
                  fontColor={Const.themeColor}
                  enable={this.state.vfCodeEnable}
                  style={{
                    width: Const.getSize(108),
                    height: Const.getSize(40),
                    backgroundColor: 'transparent',
                    borderRadius: Const.getSize(20),
                    borderWidth: Const.ONE_PIXEL,
                    borderColor: Const.themeColor,
                  }}
                  onPress={() => {
                    // eslint-disable-next-line no-console
                    this.getMessageCode()
                  }}
                />
              </View>
            )}

            {this.state.isPassword ? (
              <View
                style={{
                  paddingHorizontal: Const.getSize(16),
                  marginTop: Const.getSize(22),
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: Const.getSize(300),
                  height: Const.getSize(50),
                  backgroundColor: '#192730',
                  borderRadius: Const.getSize(25),
                }}>
                <SVG icon={'password'} size={Const.getSize(20)} color={Const.themeColor} />
                <TextInput
                  style={{
                    marginLeft: Const.getSize(10),
                    flex: 1,
                    height: Const.getSize(50),
                    fontSize: Const.getSize(18),
                    color: '#fff',
                  }}
                  ref={(ref) => (this.textInput = ref)}
                  placeholder={'密码'}
                  secureTextEntry={true}
                  placeholderTextColor="#2F4D5F"
                  underlineColorAndroid="transparent"
                  value={this.state.password}
                  onChangeText={(text) => {
                    this.setState({ password: text })
                  }}
                  onSubmitEditing={(e) => {
                    let text = e.nativeEvent.text.trim()
                    this.setState({ password: text })
                  }}
                />
              </View>
            ) : null}

            <TouchableOpacity
              style={{
                width: Const.getSize(300),
                height: Const.getSize(50),
                borderRadius: Const.getSize(25),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Const.themeColor,
                marginTop: Const.getSize(40),
              }}
              onPress={() => {
                this.login()
              }}>
              <Text style={{ fontSize: Const.getSize(18), color: '#fff', fontWeight: 'bold' }}>登录</Text>
            </TouchableOpacity>

            <View
              style={{
                width: Const.getSize(300),
                marginTop: Const.getSize(20),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.setState({ isPassword: !this.state.isPassword })
                }}>
                <Text style={{ fontSize: Const.getSize(12), color: Const.themeColor }}>{this.state.isPassword ? '短信登录' : '密码登录'}</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  RouterManager.push('ForgetPasswordPage')
                }}>
                <Text style={{ fontSize: Const.getSize(12), color: Const.themeColor }}>忘记密码？</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginLeft: Const.getSize(3) }}
                onPress={() => {
                  RouterManager.push('RegisterPage')
                }}>
                <Text style={{ fontSize: Const.getSize(12), color: Const.themeColor }}>立即注册</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
