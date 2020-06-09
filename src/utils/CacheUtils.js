import AsyncStorage from '@react-native-community/async-storage'

import Storage from 'react-native-storage'

const _KEY = '039ea307324a90bb'

export default class CacheUtils {
  // ////////// Public

  /**
   * 缓存一个数据
   * @param {* 数据的key} id
   * @param {* 数据的值} data
   */
  static saveObject(id, data) {
    CacheUtils._initStore()
    global.storage.save({
      key: _KEY, // Note: Do not use underscore("_") in key!
      id: id,
      data: data,
    })
  }

  /**
   * 获取缓存的数据
   * @param {* 数据的key} id
   * @param {* 回调函数} callback
   */
  static getCache(id, callback) {
    CacheUtils._initStore()
    CacheUtils._load(id, callback)
  }

  /**
   * 覆盖一个数据的缓存
   * @param {* 数据的key} id
   * @param {* 数据的值} data
   */
  static createCache(id, data) {
    CacheUtils._initStore()
    CacheUtils.saveObject(id, data)
  }

  /**
   * 刪除某條緩存
   * @param {* 缓存的key} id
   */
  static removeCache(id) {
    CacheUtils._initStore()
    global.storage.remove({
      key: _KEY,
      id: id,
    })
  }

  /**
   * 刪除所有緩存
   */
  static clearAll() {
    CacheUtils._initStore()
    global.storage.clearMapForKey(_KEY)
  }

  // ////////// Private

  static _initStore() {
    if (global.storage == null) {
      global.storage = new Storage({
        // maximum capacity, default 1000
        size: 1000 * 1000,

        // Use AsyncStorage for RN, or window.localStorage for web.
        // If not set, data would be lost after reload.
        storageBackend: AsyncStorage,

        // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
        // can be null, which means never expire.
        defaultExpires: null,

        // cache data in the memory. default is true.
        enableCache: true,

        // if data was not found in storage or expired,
        // the corresponding sync method will be invoked and return
        // the latest data.
        sync: {
          // we'll talk about the details later.
        },
      })
    }
  }

  static _load(id, callback) {
    CacheUtils._initStore()
    // 讀取
    global.storage
      .load({
        key: _KEY,
        id: id,
        // autoSync(默認為true)意味著在沒有找到數據或數據過期時自動調用相應的sync方法
        autoSync: true,

        // syncInBackground(默認為true)意味著如果數據過期，
        // 在調用sync方法的同時先返回已經過期的數據。
        // 設定為false的話，則始終強制返回sync方法提供的最新數據(當然會需要更多等待時間)。
        syncInBackground: true,

        // 您還可以給sync方法傳遞額外的參數
        syncParams: {
          extraFetchOptions: {
            // 各種參數
          },
          someFlag: true,
        },
      })
      .then((ret) => {
        // 如果找到數據，則在then方法中返回
        // 註意：這是異步返回的結果（不了解異步請自行搜索學習）
        // 您只能在then這個方法內繼續處理ret數據
        // 而不能在then以外處理
        // 也沒有辦法“變成”同步返回
        // 您也可以使用“看似”同步的async/await語法
        callback({ code: 0, data: ret, msg: 'success' })
      })
      .catch((err) => {
        // 如果沒有找到數據且沒有sync方法，
        // 或者有其他異常，則在catch中返回

        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            callback({ code: -1, data: null, msg: 'NotFoundError' })
            break
          case 'ExpiredError':
            // TODO
            callback({ code: -1, data: null, msg: 'ExpiredError' })
            break
          default:
            callback({ code: -1, data: null, msg: 'undefind' })
            break
        }
      })
  }
}
