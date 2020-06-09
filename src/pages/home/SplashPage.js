import React, { Component } from 'react'

import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BasePage from '../../base/BasePage'

import ds from '../../ds'

import Splash from 'react-native-splash-screen'

import CacheApi from '../../api/CacheApi'

import LocationUtils from '../../utils/LocationUtils'

import ImageMap from '../../asset/ImageMap'

/**
 * 启动页 第一个页面
 * 在这里决定显示哪个页面
 */

export default class SplashPage extends BasePage {
  constructor(props) {
    super(props)
  }

  _pageWillStart() {}

  _pageStart() {
    this.getCacheInfo()
  }

  getCacheInfo() {
    RouterManager.resetTo('Tab')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._renderStatusBar('transparent', 'light-content', 0)}
        {/* <Image style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: null, height: null }} source={ImageMap.launch} /> */}
      </View>
    )
  }
}
