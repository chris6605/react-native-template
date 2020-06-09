/**
 * 跳转的API
 *
 * 通用的跳转可以放在这里
 *
 * 参数需要注释清楚 方便调用
 */

import RouterManager from '../../RouterManager'

import { PageRouter } from '../../PageRouter'

export default class JumpApi {
  /**
   * 跳转到Tab页面
   */
  static resetTab = () => {
    RouterManager.resetTo('Tab')
  }

  /**
   * 跳转到登录页面
   */
  static resetLogin = () => {
    RouterManager.resetTo('LoginPage')
  }

  /**
   * 跳转订单详情
   * @param {*} orderId
   */
  static toOrderDetailPage(orderId) {
    RouterManager.push(PageRouter.OrderDetailPage, { orderId: orderId })
  }

  /**
   * 跳转到公共的web view page
   * @param {*} title
   * @param {*} url
   */
  static toWebPage(title = '', url = '') {
    RouterManager.push(PageRouter.WebPage, { title: title, url: url })
  }
}
