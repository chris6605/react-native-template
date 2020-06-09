/**
 * 基于fetch封装的网络请求 get 和 post
 * get 只传URL
 * post paramas为对象形式
 */

/* eslint-disable no-console */

import ds from '../ds'
import RouterManager from '../../RouterManager'
import CacheApi from '../api/CacheApi'

const logout = () => {
  RouterManager.resetTo('LoginPage')
  global.user = null
  CacheApi.user.remove()
  CacheApi.coinTypeInfo.remove()
}

export default class NetUtils {
  /**
   * GET 请求
   * @param {*} url
   * @param {*} params
   */
  // 有参数就post 虽然这里也做了参数拼接 不建议用这个

  static async fetchGet(url, params) {
    let reqUrl = url
    let fetchOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    if (global.user && global.user.token) {
      Object.assign(fetchOptions.headers, { Authorization: global.user.token })
    }

    if (params.headers) {
      Object.assign(fetchOptions.headers, params.headers)
    }

    if (params) {
      let paramsArray = []
      //拼接参数
      Object.keys(params).forEach((key) => paramsArray.push(key + '=' + params[key]))
      if (paramsArray.length > 0) {
        if (reqUrl.search(/\?/) === -1) {
          reqUrl += '?' + paramsArray.join('&')
        } else {
          reqUrl += '&' + paramsArray.join('&')
        }
      }
    }

    let timerPromise = new Promise(function (resolve, reject) {
      this.getTimer = setTimeout(() => reject(new Error('timeout')), 15 * 1000)
    })
    let fetchPromise = fetch(reqUrl, fetchOptions)

    try {
      let response = await Promise.race([fetchPromise, timerPromise])
      console.log('Get/Response==', response)
      let res = await response.json()
      console.log('api==', reqUrl, 'get/Res ==', res)

      let code = res.code
      if (code >= 200 && code < 300) {
        return Promise.resolve(res)
      } else if (code && code === 401) {
        logout()
        return Promise.reject(new Error(res.msg))
      } else {
        res.msg && ds.toast.show(res.msg)
        return Promise.reject(new Error(res.msg))
      }
    } catch (err) {
      return Promise.reject(err)
    } finally {
      this.getTimer && clearTimeout(this.getTimer)
    }
  }

  /**
   * POST 请求
   * @param {*} url
   * @param {*} params object
   */
  static async fetchPost(url, params) {
    console.log('------url =', url, '--------params =', params)

    let reqUrl = url

    let fetchOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(params),
    }

    if (global.user && global.user.token) {
      Object.assign(fetchOptions.headers, { Authorization: global.user.token })
    }

    if (params.headers) {
      Object.assign(fetchOptions.headers, params.headers)
    }

    let timerPromise = new Promise(function (resolve, reject) {
      this.postTimer = setTimeout(() => reject(new Error('timeout')), 15 * 1000)
    })
    let fetchPromise = fetch(reqUrl, fetchOptions)

    try {
      let response = await Promise.race([fetchPromise, timerPromise])
      console.warn('Response===', response)
      let res = await response.json()
      console.warn('api ===', reqUrl, 'res====', res)

      let code = res.code || res.innercode
      if (code >= 200 && code < 300) {
        // 请求成功
        return Promise.resolve(res)
      } else if (code && code === 401) {
        // token过期 重置路由到登录页面
        logout()
        return Promise.reject(new Error(res.msg))
      } else {
        // 请求404 500 301之类
        res.msg && ds.toast.show(res.msg)
        return Promise.reject(new Error(res.msg))
      }
    } catch (err) {
      console.log('api==', reqUrl, 'err==', err)
      return Promise.reject(err)
    } finally {
      this.postTimer && clearTimeout(this.postTimer)
    }
  }

  /**
   * 上传图片
   * @param {*} url8
   * @param {*} params object
   */
  static upload(url, params) {
    console.log('url =', url, '--------params =', params)

    let reqUrl = url
    let formData = new FormData()
    Object.keys(params).forEach((key) => {
      if (key === 'uploadFiles') {
        ;(params[key] || []).forEach(({ path, filename }) => {
          const file = { uri: path, type: 'multipart/form-data', name: filename }
          formData.append(key, file)
        })
      } else {
        formData.append(key, params[key])
      }
    })

    let fetchOptions = {
      method: 'POST',
      headers: {},
      body: formData,
    }

    if (global.user && global.user.token) {
      Object.assign(fetchOptions.headers, { Authorization: global.user.token })
    }

    if (params.headers) {
      Object.assign(fetchOptions.headers, params.headers)
    }

    return Promise.race([
      fetch(reqUrl, fetchOptions),
      new Promise(function (resolve, reject) {
        this.postTimer = setTimeout(() => reject(new Error('timeout')), 20 * 1000)
      }), // 超时处理
    ])
      .then((response) => {
        console.log('response===', response)
        return response.json()
      })
      .then((res) => {
        res.code = res.code || res.innercode
        console.log('CODE==', res.code, 'api==', reqUrl, 'res==', res)

        this.postTimer && clearTimeout(this.postTimer)
        if (res.code >= 200 && res.code < 300) {
          // 请求成功
          return Promise.resolve(res)
        } else if (res.code && res.code === 401) {
          // token过期 重置路由到登录页面
          logout()
          return Promise.reject(new Error(res.msg))
        } else {
          // 请求404 500 301之类
          res.msg && ds.toast.show(res.msg)
          return Promise.reject(new Error(res.msg))
        }
      })
      .catch((err) => {
        console.log('api==', reqUrl, 'err==', err)
        this.postTimer && clearTimeout(this.postTimer)
        return Promise.reject(err)
      })
  }
}
