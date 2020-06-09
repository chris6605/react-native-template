import NetUtils from '../utils/NetUtils'

export default class BaseApi {
  /**
   * GET 请求 参数从API里面取
   */
  getRequest() {
    return new Promise((resolve, reject) => {
      let url = this.url
      if (!url) {
        return reject(new Error('noUrl'))
      }
      let newObj = JSON.parse(JSON.stringify(this))
      delete newObj.url

      NetUtils.fetchGet(url, newObj)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * POST 请求 参数从API里面取
   */
  postRequest() {
    let reqUrl = ''
    let newObj = JSON.parse(JSON.stringify(this))
    if (newObj.url) {
      reqUrl = newObj.url
    }

    if (!reqUrl) {
      return Promise.reject(new Error('noUrl'))
    }

    delete newObj.url

    return new Promise((resolve, reject) => {
      NetUtils.fetchPost(reqUrl, newObj)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  upload() {
    let reqUrl = ''
    let newObj = JSON.parse(JSON.stringify(this))
    if (newObj.url) {
      reqUrl = newObj.url
    }

    if (!reqUrl) {
      return Promise.reject(new Error('noUrl'))
    }

    delete newObj.url

    return NetUtils.upload(this.url, newObj)
  }
}
