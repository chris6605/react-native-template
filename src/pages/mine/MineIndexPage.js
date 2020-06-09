import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Animated, Clipboard, StatusBar } from 'react-native'

import Const from '../../Const'

import BasePage from '../../base/BasePage'

import WebImage from '../../component/commonComponent/WebImage'

import ImagePicker from 'react-native-image-crop-picker'

import SVG from '../../component/commonComponent/SVG'

import RouterManager from '../../../RouterManager'

import ImageMap from '../../asset/ImageMap'

import ds from '../../ds'

import EmitterApi from '../../api/EmitterApi'

import CacheApi from '../../api/CacheApi'

export default class MineIndexPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _pageWillFocus() {}

  _pageDidFocus() {}

  _pageStart() {}

  _pageDidBlur() {}

  _pageEnd() {}

  addListener() {}

  render() {
    return <View style={{ flex: 1, alignItems: 'center', backgroundColor: Const.mBackgroundColor }}>{this._renderStatusBar()}</View>
  }
}
