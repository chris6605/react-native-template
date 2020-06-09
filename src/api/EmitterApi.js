/**
 * 所有的通知都在这里
 *
 * listener不要忘记移除
 */

import { DeviceEventEmitter } from 'react-native'

export default class EmitterApi {
  /**
   * 登录
   */
  static login = {
    emit: (msg) => {
      DeviceEventEmitter.emit('login', msg)
    },
    listerner: (callback) => {
      return DeviceEventEmitter.addListener('login', (msg) => {
        callback && callback(msg)
      })
    },
  }

  static rechargeSuccess = {
    emit: (msg) => {
      DeviceEventEmitter.emit('rechargeSuccess', msg)
    },
    listerner: (callback) => {
      return DeviceEventEmitter.addListener('rechargeSuccess', (msg) => {
        callback && callback(msg)
      })
    },
  }

  static userInfoModify = {
    emit: (msg) => {
      DeviceEventEmitter.emit('userInfoModify', msg)
    },
    listerner: (callback) => {
      return DeviceEventEmitter.addListener('userInfoModify', (msg) => {
        callback && callback(msg)
      })
    },
  }
}
