import { NativeModules } from 'react-native'

import Const from '../Const'

const BadgeManager = NativeModules.BadgeNumberManager

export default class NativeModuleUtil {
  // 设置appicon 角标
  static setBadgeNumber(num) {
    if (Const.IS_IOS) {
      BadgeManager.setBadgeNumber(num)
    }
  }
}
