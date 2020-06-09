import CacheUtils from '../utils/CacheUtils'

export default class CacheApi {
  /**
   * 用户信息
   */
  static user = {
    save: (data) => {
      CacheUtils.saveObject('user', data)
    },
    get: (callback) => {
      CacheUtils.getCache('user', callback)
    },
    remove: () => {
      CacheUtils.removeCache('user')
    },
  }

  /**
   * 位置信息
   */
  static location = {
    save: (data) => {
      CacheUtils.saveObject('location', data)
    },
    get: (callback) => {
      CacheUtils.getCache('location', callback)
    },
    remove: () => {
      CacheUtils.removeCache('location')
    },
  }

  /**
   * 币种信息
   */
  static coinTypeInfo = {
    save: (data) => {
      CacheUtils.saveObject('coinTypeInfo', data)
    },
    get: (callback) => {
      CacheUtils.getCache('coinTypeInfo', callback)
    },
    remove: () => {
      CacheUtils.removeCache('coinTypeInfo')
    },
  }
}
