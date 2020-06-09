/**
 * 抽象出来的一个类
 * 基类 获取window 中的全局组件
 */
'use strict'

export default class DS {
  static get window() {
    return global.dsWindow
  }

  static get alert() {
    return global.dsAlert
  }

  static get toast() {
    return global.dsToast
  }

  static get loading() {
    return global.dsLoading
  }

  static get actionsheet() {
    return global.dsActionSheet
  }

  static get simpleAlert() {
    return global.dsSimpleAlert
  }

  static get passwordAlert() {
    return global.dsPasswordAlert
  }

  static get confirmAlert() {
    return global.dsConfirmAlert
  }

  static get addressComponent() {
    return global.dsAddressComponent
  }
}
