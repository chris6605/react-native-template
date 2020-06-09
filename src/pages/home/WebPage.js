import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'

import { WebView } from 'react-native-webview'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BasePage from '../../base/BasePage'

import ds from '../../ds'

export default class WebPage extends BasePage {
  params = { ...this._getProps() }
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  _pageWillStart() {}

  _pageStart() {
    // console.warn(this._getProps())
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this._renderStatusBar()}
        {this._renderNavbar(this.params.title)}
        <WebView style={{ flex: 1, width: Const.mScreenWidth }} startInLoadingState={true} source={{ uri: this.params.url || 'https://www.thepaper.cn/newsDetail_forward_7215542' }} />
      </View>
    )
  }
}
