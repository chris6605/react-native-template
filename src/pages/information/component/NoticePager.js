import React, { Component } from 'react'

import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'

import Const from '../../../Const'

import BaseComponent from '../../../base/BaseComponent'

import RouterManager from '../../../../RouterManager'

import WebImage from '../../../component/commonComponent/WebImage'

import CheckUtils from '../../../utils/CheckUtils'

import ds from '../../../ds'

export default class NoticePager extends BaseComponent {
  page = 1
  page_size = 20

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      data: [1, 2, 3, 4],
      refreshing: false,
      loadStatus: 0,
    }
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  onRefresh() {
    this.setState({ refreshing: true })
    this.setState({ refreshing: false })
  }

  loadMore() {
    if (this.state.loadStatus !== 1) return

    this.setState({ loadStatus: 2 })
  }

  render() {
    return (
      <View style={{ flex: 1, width: Const.mScreenWidth, justifyContent: 'center', alignContent: 'center' }}>
        <FlatList
          ref={(ref) => (this.flat = ref)}
          style={{ flex: 1 }}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          onEndReached={this.loadMore.bind(this)}
          data={this.state.data}
          keyExtractor={(item, index) => index + ''}
          renderItem={this.renderItem.bind(this)}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
      </View>
    )
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={{
          marginLeft: Const.getSize(10),
          paddingHorizontal: Const.getSize(10),
          marginTop: Const.getSize(10),
          height: Const.getSize(98),
          flexDirection: 'row',
          alignItems: 'center',
          width: Const.mScreenWidth - Const.getSize(20),
          backgroundColor: '#fff',
          borderRadius: Const.getSize(5),
        }}
        onPress={() => {}}>
        <Text style={{ fontSize: Const.getSize(16), color: 'blue' }}>item</Text>
      </TouchableOpacity>
    )
  }

  renderFooter() {
    let footer = null
    if (this.state.loadStatus == 0) {
      footer = <View style={{ width: Const.mScreenWidth, height: 20, backgroundColor: Const.mBackgroundColor }} />
    } else if (this.state.loadStatus == 1) {
      footer = (
        <View
          style={{
            width: Const.mScreenWidth,
            height: Const.getSize(44),
            backgroundColor: Const.mBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: Const.getSize(12), color: '#666' }}>上拉加载更多</Text>
        </View>
      )
    } else if (this.state.loadStatus == 2) {
      footer = (
        <View
          style={{
            width: Const.mScreenWidth,
            height: Const.getSize(44),
            backgroundColor: Const.mBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: Const.getSize(12), color: '#666' }}>没有更多数据了</Text>
        </View>
      )
    } else if (this.state.loadStatus == 3) {
      footer = (
        <View
          style={{
            width: Const.mScreenWidth,
            height: Const.getSize(44),
            backgroundColor: Const.mBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator animating={true} color={'#666'} size="small" />
        </View>
      )
    }
    return footer
  }
}
