import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import SVG from '../commonComponent/SVG'

export default class NavigationBar extends BaseComponent {
  static defaultProps = {
    backgroundColor: '#fff', //导航栏背景色
    title: '页面名',
    fontSize: Const.getSize(16),
    fontColor: Const.blackColor,
    renderLeft: undefined,
    renderRight: undefined,
    backCallback: undefined,
    showBack: true, //是否显示返回按钮
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onBack() {
    this.props.backCallback ? this.props.backCallback : RouterManager.pop()
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: Const.mScreenWidth,
          height: Const.mNavigationBarHeight,
          backgroundColor: this.props.backgroundColor,
        }}>
        {this.props.showBack ? this.renderLeft() : null}

        <View style={{ flex: 1 }} />

        {this.renderRight()}

        {this.renderTitle()}
      </View>
    )
  }

  renderLeft() {
    return this.props.renderLeft ? this.props.renderLeft() : this.renderLeftBackBtn()
  }

  renderLeftBackBtn() {
    return (
      <TouchableOpacity
        style={{
          paddingLeft: Const.getSize(15),
          width: Const.mScreenWidth / 6,
          height: Const.mNavigationBarHeight,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        onPress={() => {
          this.onBack()
        }}>
        <SVG
          icon={'back'}
          size={Const.getSize(22)}
          color={this.props.backgroundColor == Const.themeColor ? '#fff' : Const.blackColor}
        />
      </TouchableOpacity>
    )
  }

  renderRight() {
    return this.props.renderRight ? this.props.renderRight() : null
  }

  /**
   * title 绝对定位布局 不受左右按钮的宽度影响
   */
  renderTitle() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: Const.mScreenWidth / 6,
          right: Const.mScreenWidth / 6,
          width: (Const.mScreenWidth * 2) / 3,
          height: Const.mNavigationBarHeight,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Text
          style={{
            fontSize: this.props.fontSize,
            color: this.props.backgroundColor == Const.themeColor ? '#fff' : Const.blackColor,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {this.props.title}
        </Text>
      </View>
    )
  }
}
