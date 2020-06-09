/**
 *  登录的API
 */

/**
 * 一定要继承自BaseApi 不然没法发起请求
 */

import BaseApi from '../../base/BaseApi'

import Const from '../../Const'

class SmsLoginApi extends BaseApi {
  url = Const.hostAddress + 'api/v1/sms/login'
  username = ''
  registrationType = ''
  // 主要是为了传递验证码
  headers = { Authorization2: '' }
}

class PasswordLoginApi extends BaseApi {
  url = Const.hostAddress + 'api/v1/login'
  username = ''
  password = ''
}

export default {
  smsLogin: SmsLoginApi,
  passwordLogin: PasswordLoginApi,
}
