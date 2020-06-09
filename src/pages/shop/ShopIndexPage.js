import React, { Component } from 'react'

import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native'

import Const from '../../Const'

import BasePage from '../../base/BasePage'

import ds from '../../ds'

import FastImage from 'react-native-fast-image'

import RouterManager from '../../../RouterManager'

import SVG from '../../component/commonComponent/SVG'

import RNSwiper from 'react-native-swiper'

import WebImage from '../../component/commonComponent/WebImage'

import RNScrollTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view'

export default class ShopIndexPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _pageWillFocus() {}

  async _pageStart() {}

  render() {
    return <View style={{ flex: 1, backgroundColor: Const.mBackgroundColor }}>{this._renderStatusBar('#fff', 'default')}</View>
  }
}
