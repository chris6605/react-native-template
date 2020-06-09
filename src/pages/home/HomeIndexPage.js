import React from 'react'

import { Text, View, TouchableOpacity, FlatList, Image, StatusBar, StyleSheet, NativeModules, ActivityIndicator } from 'react-native'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BasePage from '../../base/BasePage'

import RNSwiper from 'react-native-swiper'

import WebImage from '../../component/commonComponent/WebImage'

import SVG from '../../component/commonComponent/SVG'

import ImageMap from '../../asset/ImageMap'

import EmitterApi from '../../api/EmitterApi'

import CacheApi from '../../api/CacheApi'

import ds from '../../ds'

export default class HomeIndexPage extends BasePage {
  page = 1
  page_size = 20
  constructor(props) {
    super(props)
    this.state = {}
  }

  _pageWillFocus() {}

  _pageWillStart() {}

  render() {
    return <View style={{ flex: 1, alignItems: 'center', backgroundColor: Const.mBackgroundColor }}>{this._renderStatusBar()}</View>
  }

  renderFooter() {
    let footer = null
    switch (this.state.loadStatus) {
      case 0:
        footer = <View />
        break
      case 1:
        footer = (
          <View style={{ width: Const.mScreenWidth, paddingVertical: Const.getSize(20) }}>
            <Text style={{ flex: 1, textAlign: 'center', fontSize: Const.getSize(12), color: Const.grayColor }}>上拉加载更多</Text>
          </View>
        )
        break
      case 2:
        footer = (
          <View style={{ width: Const.mScreenWidth, paddingVertical: Const.getSize(20), justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator animating={true} color={Const.grayColor} />
          </View>
        )
        break
      case 3:
        footer = (
          <View style={{ width: Const.mScreenWidth, paddingVertical: Const.getSize(20) }}>
            <Text style={{ flex: 1, textAlign: 'center', fontSize: Const.getSize(12), color: Const.grayColor }}>没有更多数据了</Text>
          </View>
        )
        break
    }
    return footer
  }
}
