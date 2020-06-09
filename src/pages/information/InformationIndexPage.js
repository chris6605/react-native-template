import React, { Component } from 'react'

import { Platform, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'

import Const from '../../Const'

import BasePage from '../../base/BasePage'

import RNScrollTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view'

import InformationPager from './component/InformationPager'

import NoticePager from './component/NoticePager'

import BaseComponent from '../../base/BaseComponent'

export default class InformationIndexPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      pager: ['资讯', '公告'],
    }
  }

  _pageWillFocus() {
    StatusBar.setBarStyle('dark-content')
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Const.mBackgroundColor }}>
        {this._renderStatusBar('#fff', 'dark-content')}
        <RNScrollTabView
          tabBarPosition="top"
          tabBarBackgroundColor={'#fff'}
          tabBarActiveTextColor={Const.themeColor}
          tabBarInactiveTextColor={Const.blackColor}
          tabBarTextStyle={{ fontSize: Const.getSize(20) }}
          renderTabBar={() => <ScrollableTabBar underlineStyle={{ backgroundColor: Const.themeColor, borderRadius: 3 }} />}>
          {this.state.pager.map((item, index) => {
            let pager = null
            if (index === 0) {
              pager = <InformationPager key={index} tabLabel={item} />
            } else {
              pager = <NoticePager key={index} tabLabel={item} />
            }
            return pager
          })}
        </RNScrollTabView>
      </View>
    )
  }
}
