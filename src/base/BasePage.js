import React from 'react'

import { StyleSheet, View, InteractionManager, ActivityIndicator, BackHandler } from 'react-native'

import BaseComponent from './BaseComponent'

import RouterManager from '../../RouterManager'

import Const from '../Const'

import NavigationBar from '../component/commonComponent/NavigationBar'

import StatusBarComponent from '../component/commonComponent/StatusBar'

import ds from '../ds'

/**
 * 
 * 不需要自定义电池条 导航拦的情况下 直接复写renderContent() 就可以了 如果需要自定义可以重写render
 * renderContent() {
    return null;
  }
 */

export default class BasePage extends BaseComponent {
  //获取上个页面传递过来的参数可以用 params = {...this._getProps()}

  constructor(props) {
    super(props)

    this._listenerNavigationLifecycle()
  }

  componentWillMount() {
    if (this.props.navigation) {
      // 将当前页面加入page管理栈中
      RouterManager.addPage(this.props.navigation.state.key, this)
    }

    this._pageWillStart()
  }

  componentDidMount() {
    // 防止 pageStart 不会被执行
    let start = true
    this.timeoutId = setTimeout(() => {
      if (start) {
        start = false
        this._pageStart()
      }
    }, 500)

    //  优化跳转卡顿
    InteractionManager.runAfterInteractions(() => {
      if (start) {
        start = false
        this._pageStart()
      }
    })
  }

  componentWillUnmount() {
    if (this.props.navigation) {
      // 当前页面要被卸载的时候，将当前页面从page管理栈中移除
      RouterManager.removePage(this.props.navigation.state.key)
    }

    this.timeoutId && clearTimeout(this.timeoutId)
    this._pageEnd()
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: Const.mScreenWidth,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        {this._renderStatusBar()}
        {this._renderNavbar()}
        {this._renderContent()}
        {this._renderSafeBottom()}
      </View>
    )
  }

  // 提供给子类重写的生命周期函数（不要去重写RN原本提供的生命周期函数）

  _pageWillFocus() {
    // navigation WillFocus
  }

  _pageDidFocus() {
    // navigation DidFocus
  }

  _pageWillBlur() {
    // navigation WillBlur
  }

  _pageDidBlur() {
    // navigation DidBlur
  }

  _pageWillStart() {
    // componentWillUnmount
  }

  _pageStart() {
    // componentDidMount
  }

  _pageEnd() {
    // componentWillUnmount
    ds.loading.dismiss()
  }

  // 提供给子类重写的渲染页面内容的方法

  _renderStatusBar(backgroundColor = '#fff', barStyle = 'dark-content', height = Const.mStatusBarHeight) {
    return <StatusBarComponent backgroundColor={backgroundColor} barStyle={barStyle} height={height} />
  }

  /**
   * 渲染导航条
   */
  _renderNavbar(title = 'Title', backgroundColor = '#fff', showBack = true) {
    return <NavigationBar title={title} backgroundColor={backgroundColor} showBack={showBack} />
  }

  /**
   * 渲染页面主体内容
   */
  _renderContent() {
    return <View style={{ flex: 1 }} />
  }

  /**
   * 渲染iPhoneX底部安全区域
   *
   */
  _renderSafeBottom(height = Const.mBottomHeight, bgColor = '#fff') {
    return <View style={{ width: Const.mScreenWidth, height: height, backgroundColor: bgColor }} />
  }

  // 私有方法

  /**
   * 监听导航栏的生命周期，map到page的附加方法上，可以用来处理类似页面生命周期的问题
   */
  _listenerNavigationLifecycle() {
    if (!this.props.navigation) {
      return
    }
    this.props.navigation.addListener('willFocus', (payload) => {
      this._pageWillFocus()
    })
    this.props.navigation.addListener('didFocus', (payload) => {
      this._pageDidFocus()
    })
    this.props.navigation.addListener('willBlur', (payload) => {
      this._pageWillBlur()
    })
    this.props.navigation.addListener('didBlur', (payload) => {
      this._pageDidBlur()
    })
  }

  /**
   * 获取页面跳转是传递的参数
   */
  _getProps() {
    const params = this.props.navigation && this.props.navigation.state.params ? this.props.navigation.state.params : null
    return params
  }
}
