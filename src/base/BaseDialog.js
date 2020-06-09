/**
 * Dialog基類
 */

import React from 'react'

import { View, Animated, TouchableOpacity, Keyboard } from 'react-native'

import Const from '../Const'

import BaseComponent from './BaseComponent'

export default class BaseDialog extends BaseComponent {
  _path = new Animated.Value(0)
  _bgCloseable = true // 是否允许点击背景关闭弹框，默认为允许
  _clickBgCallback = null
  _bgColor = 'rgba(0,0,0,0.36)'

  constructor(props) {
    super(props)
    this.state = {
      _isShow: false,
    }
  }

  _resetParams(callback) {
    this._path.setValue(0)
    this._bgCloseable = true
    this._bgColor = 'rgba(0,0,0,0.36)'
    this.setState({ _isShow: false }, callback)
  }

  /**
   * 获取弹框的是否显示的状态
   */
  isShowing() {
    return this.state._isShow
  }

  /**
   * 设置弹框是否允许点击背景关闭和关闭的回调函数
   * @param {*} closeable
   * @param {*} callback
   */
  setBgCloseable(closeable, callback = null) {
    this._bgCloseable = closeable
    this._clickBgCallback = callback
    return this
  }

  /**
   * 显示弹框
   * @param {*回调} callback
   * @param {} state
   * @param {是否执行动画} isAnimated
   */
  show(callback, state = {}, isAnimated = true) {
    // Keyboard.dismiss()
    this.setState({ _isShow: true, ...state }, () => {
      if (isAnimated) {
        Animated.spring(this._path, { toValue: 1, duration: 250 }).start(() => {
          callback && callback()
        })
      } else {
        this._path.setValue(1)
        callback && callback()
      }
    })
  }

  /**
   * 关闭弹框
   * @param {*是否执行关闭动画} isAnimated
   * @param {*回调} callback
   */
  dismiss(isAnimated, callback) {
    if (isAnimated) {
      Animated.timing(this._path, { toValue: 0, duration: 300 }).start(() => {
        this._resetParams(() => {
          callback && callback()
        })
      })
    } else {
      this._resetParams(() => {
        callback && callback()
      })
    }
  }

  /**
   * 重写前景动画效果
   * @param {*} path
   */
  _getContentInterpolate(path) {
    return [
      {
        translateY: path.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [this._getSize(200), this._getSize(200), 0],
        }),
      },
    ]
  }

  // 前景位置 可重写
  _getContentPosition() {
    return {
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  /**
   * 绘制前景控件
   */
  renderContent() {
    return null
  }

  //  修改背景的範圍 為當前頁面的寬高
  render() {
    if (this.state._isShow) {
      return (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: this._bgColor,
            opacity: this._path.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 1, 1],
            }),
            ...this._getContentPosition(),
            transform: [
              {
                translateX: this._path.interpolate({
                  inputRange: [0, 0.01, 1],
                  outputRange: [-Const.mScreenWidth, 0, 0],
                }),
              },
            ],
          }}>
          <TouchableOpacity
            disabled={!this._bgCloseable}
            onPress={() => {
              if (this._bgCloseable) {
                this.dismiss(() => {
                  this._clickBgCallback && this._clickBgCallback()
                })
              }
            }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <Animated.View
            style={{
              opacity: this._path.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] }),
              transform: this._getContentInterpolate(this._path),
            }}>
            {this.renderContent()}
          </Animated.View>
        </Animated.View>
      )
    } else {
      return null
    }
  }

  /**
   * 兼容iPhoneX
   */
  _safeViewComponent(style) {
    return Const.IS_iPhoneX ? (
      <View
        style={{
          width: Const.mScreenWidth,
          height: Const.mBottomHeight,
          backgroundColor: '#fff',
          ...style,
        }}
      />
    ) : null
  }
}
