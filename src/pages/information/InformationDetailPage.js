import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { WebView } from 'react-native-webview'

import Const from '../../Const'

import BasePage from '../../base/BasePage'

export default class InformationDetailPage extends BasePage {
  params = { ...this._getProps() }
  constructor(props) {
    super(props)
    this.state = {
      url: '',
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._renderStatusBar()}
        {this._renderNavbar(this.params.title || '资讯详情')}
        <WebView style={{ flex: 1, width: Const.mScreenWidth }} startInLoadingState={true} source={{ uri: this.params.url }} />
      </View>
    )
  }
}
