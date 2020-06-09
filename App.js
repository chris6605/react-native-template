/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'

import { Platform, StyleSheet, Text, View } from 'react-native'

import { createAppContainer } from 'react-navigation'

import { createStackNavigator } from 'react-navigation-stack'

import { createBottomTabNavigator } from 'react-navigation-tabs'

import CustomTabar from './src/component/commonComponent/CustomTabbar'

import ConfigJson from './src/config/config.json'

import { PageRouter, PAGES } from './PageRouter'

import RouterManager from './RouterManager'

import Window from './src/component/commonComponent/Window'

import Splash from 'react-native-splash-screen'

import Const from './src/Const'

import CacheApi from './src/api/CacheApi'

import { MessageManager } from './src/utils'

export default class App extends Component {
  TabNav = null
  StackNavigator = null
  MainNavigator = null
  router = {} //所有的路由栈
  tabs = []

  _window = null //注册到根组件上的window对象

  constructor(props) {
    super(props)
    this.state = {
      didFinish: false,
    }
  }

  /**
   * 获取用户登录状态 确定第一个路由是首页还是登录页面
   * 配置导航栈
   */
  componentWillMount() {
    console.disableYellowBox = true

    // 0正式环境  1开发环境  2测试环境
    if (__DEV__) {
      global.hostIndex = 1
    } else {
      global.hostIndex = 0
    }

    global.hostAddress = [
      { name: '正式环境', url: 'https://dsemail.net/' },
      { name: '测试环境', url: 'http://47.74.178.41:8030/' },
    ]

    this.tabs = ConfigJson.tabBar.list

    //组装所有的page 赋值给router
    this.configPages()

    // 配置底部tab
    this.configTabbar()

    // 配置 Navigation / initPageName
    this.configNavigation(Const.initalPage)

    this.setState({ didFinish: true }, () => {
      Splash.hide()
    })
  }

  componentDidMount() {
    //生产模式下重定义console方法，提高效率
    if (!__DEV__) {
      global.console = {
        info: () => {},
        log: () => {},
        assert: () => {},
        warn: () => {},
        debug: () => {},
        error: () => {},
        time: () => {},
        timeEnd: () => {},
      }
    }
  }

  componentWillUnmount() {}

  /**
   * 配置所有的page
   */
  configPages() {
    PAGES.map((item) => {
      this.router[item.name] = {
        screen: (navigation) => {
          // 添加到router里管理
          RouterManager.addRouter(item.name, navigation.navigation)
          return <item.page navigation={navigation.navigation} />
        },
        path: item.name,
        navigationOptions: ({ navigation }) => {
          // 是否禁止iOS滑动返回上一页，默认允许（Android始终禁止滑动返回）
          const canGesturePop = navigation.state.params && navigation.state.params.canGesturePop ? navigation.state.params.canGesturePop : false
          return {
            gesturesEnabled: canGesturePop,
          }
        },
      }
    })
  }

  /**
   * 配置底部tab
   */
  configTabbar() {
    const tabRouter = {}

    this.tabs &&
      this.tabs.map((item) => {
        tabRouter[item.pagePath] = {
          screen: this.router[item.pagePath].screen,
        }
      })

    //  config Tabbar
    this.TabNav = createBottomTabNavigator(tabRouter, {
      initialRouteName: 'HomeIndexPage', // 初始化页面
      animationEnabled: false,
      swipeEnabled: false,
      lazy: true,
      backBehavior: 'none',
      tabBarPosition: 'bottom',
      tabBarComponent: (event) => {
        // console.warn(event.navigation)
        let index = event.navigation.state.index
        return (
          <CustomTabar
            selectedIndex={index}
            onTabSelected={(selIndex) => {
              event.navigation.navigate(this.tabs[selIndex].pagePath)
            }}
          />
        )
      },
    })
  }

  /**
   * 配置栈导航
   * @param {*} initialRouteName 初始化的页面
   * Tab这个页面很重要 如果要回到主页（带Tab的） 可以routerManager.resetTo('Tab')
   */
  configNavigation(initialRouteName) {
    //添加tab作为一个路由
    if (this.TabNav) {
      this.router.Tab = { screen: this.TabNav }
    }

    this.StackNavigator = createStackNavigator(this.router, {
      initialRouteName: initialRouteName,
      mode: 'card',
      headerMode: 'none',
    })

    // config MainNavigator
    this.MainNavigator = createAppContainer(this.StackNavigator)
  }

  render() {
    return this.state.didFinish ? (
      <View style={{ flex: 1 }}>
        <this.MainNavigator ref={(ref) => (global.RootNavigator = ref)} />
        <Window ref={(ref) => (global.dsWindow = ref)} />
      </View>
    ) : null
  }
}
