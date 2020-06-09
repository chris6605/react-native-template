import React, { Component } from 'react'

import { AppRegistry, View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

export default class MyFlatList extends BaseComponent {
  static defaultProps = {
    data: [],
    loadStatus: 0, // 0 无  1加载更多 2加载中 3没有更多数据了
    refreshing: false,
    page_size: 20,
  }

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      loadStatus: this.props.loadStatus,
      refreshing: this.props.refreshing,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      loadStatus: nextProps.loadStatus,
      refreshing: nextProps.refreshing,
    })
  }

  componentWillUnmount() { }

  onEndReached() {
    return this.props.onEndReached && this.props.onEndReached()
  }

  render() {
    return (
      <View style={{ ...this.props.style }}>
        <FlatList
          ref={(ref) => (this.flat = ref)}
          style={{ width: Const.mScreenWidth, flex: 1 }}
          data={this.state.data}
          keyExtractor={(item, index) => index + ''}
          ListHeaderComponent={this.renderListHeader.bind(this)}
          renderItem={this.renderItem.bind(this)}
          ListFooterComponent={this.renderFooter.bind(this)}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={0.2}
        />
      </View>
    )
  }

  renderItem(item) {
    return this.props.renderItem && this.props.renderItem(item)
  }

  renderListHeader() {
    return this.props.renderHeader && this.props.renderListHeader()
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
