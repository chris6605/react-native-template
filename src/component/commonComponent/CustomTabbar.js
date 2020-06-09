import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter } from 'react-native'

import ConfigJson from '../../config/config.json'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import svgs from '../../asset/svgMap'

import SVG from '../../component/commonComponent/SVG'

export default class CustomTabbar extends BaseComponent {
  tabs = []
  static defaultProps = {
    selectedIndex: 0,
  }
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
    }
  }

  componentWillMount() {
    this.configTabs()
  }

  // 从配置文件获取tabbar的配置来渲染
  configTabs() {
    this.tabs = ConfigJson.tabBar.list
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {
    // this.setState({ ...nextProps })
  }

  render() {
    return (
      <View
        style={{
          width: Const.mScreenWidth,
          height: Const.IS_iPhoneX ? Const.mTabBarHeight + 30 : Const.mTabBarHeight,
          paddingBottom: Const.IS_iPhoneX ? 30 : 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderColor: '#eee',
        }}>
        {this.tabs.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              disabled={this.state.selectedIndex === index}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({ selectedIndex: index }, () => {
                  this.props.onTabSelected(this.state.selectedIndex)
                })
              }}>
              <SVG size={Const.getSize(24)} icon={item.icon} color={this.state.selectedIndex == index ? Const.themeColor : Const.blackColor} />
              <Text style={{ marginTop: Const.getSize(5), fontSize: Const.getSize(10), color: this.state.selectedIndex == index ? Const.themeColor : Const.blackColor }}>{item.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}
