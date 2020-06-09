export default class CheckUtils {
  /**
   * 判斷大陸電話是否符合規則
   * @param {*電話號碼} mobile
   */
  static checkMobile(mobile) {
    if (mobile.length === 11 && mobile.substring(0, 1) !== 0 && mobile.substring(1, 2) !== 1 && mobile.substring(1, 2) !== 2 && mobile.substring(1, 2) !== 6 && mobile.substring(1, 2) !== 9) {
      return true
    } else {
      return false
    }
  }

  /**
   * 判断密码是否合法
   * 必须为字母加数字且长度不小于6位
   * @param {*} password
   */
  static CheckPassWord(password) {
    let str = password
    if (!str || str.length < 6 || str.length > 18) {
      return false
    }

    let reg1 = new RegExp(/^[0-9A-Za-z]+$/)
    if (!reg1.test(str)) {
      return false
    }
    let reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/)
    if (reg.test(str)) {
      return true
    } else {
      return false
    }
  }

  /**
   * 判断是否是数字
   * @param {*} string
   */
  static isNumber(string) {
    let reg = new RegExp(/^\+?[1-9][0-9]*$/)
    if (reg.test(string)) {
      return true
    }
    return false
  }

  /**
   * 判断邮箱
   * @param {*} str
   */
  static isEmail(str) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
    return reg.test(str)
  }

  /**
   * 判断两个对象是否相等
   * @param {*} a
   * @param {*} b
   */
  static equals(a, b) {
    if (a == null || b == null) {
      return false
    }
    const aProps = Object.getOwnPropertyNames(a)
    const bProps = Object.getOwnPropertyNames(b)
    if (aProps.length !== bProps.length) {
      return false
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i]
      if (typeof a[propName] === 'object') {
        if (!CheckUtils.equals(a[propName], b[propName])) {
          return false
        }
      } else {
        if (a[propName] !== b[propName]) {
          return false
        }
      }
    }
    return true
  }

  static isEmpty(text) {
    if (text === '' || text == null || text === undefined) {
      return true
    }
    return false
  }

  // 輸入的字段不為空並且不全為空格
  static isIllegalText(text) {
    if (text === '' || text == null || text.replace(/\s+/, '').length === 0) {
      return true
    }
    return false
  }

  // 是否是emoji輸入
  static isEmoji(str) {
    let flag = false
    const ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]']
    const reg = new RegExp(ranges.join('|'), 'g')
    if (reg.match(str)) {
      flag = true
    }
    return flag
  }

  // 手機號碼格式化，四位一隔
  static convertMobileNum(number) {
    number = number.replace(/\s/g, '')
    if (number.length <= 4) return number === '' ? '0' : number
    else {
      const mod = number.length % 4
      let output = mod === 0 ? '' : number.substring(0, mod)
      for (let i = 0; i < Math.floor(number.length / 4); i++) {
        if (mod === 0 && i === 0) output += number.substring(mod + 4 * i, mod + 4 * i + 4)
        else output += ' ' + number.substring(mod + 4 * i, mod + 4 * i + 4)
      }
      return output
    }
  }

  /**
   * 判断字符串中是否有空格
   * @param {*} str
   */
  static checkStringHaveSpace(str) {
    if (str.indexOf(' ') !== -1) {
      return true
    } else {
      return false
    }
  }

  // 金額 三位之間用 , 分隔開 isDot = true保留小数点
  static seperateMoneyString(str1, isDot = true) {
    const str = str1.toString()
    if (str && str.length > 0) {
      if (str.indexOf('.') === -1) {
        // 無小數點
        if (str.length < 4) {
          return str
        } else {
          const count = parseInt(str.length / 3)
          const tailStr = str.substr(0, str.length - count * 3)
          let finalStr = ''
          for (let i = 0; i < count; i++) {
            const shortStr = str.substr(i * 3 + tailStr.length, 3)
            if (i === count - 1) {
              finalStr = finalStr + shortStr
            } else {
              finalStr = finalStr + shortStr + ','
            }
          }
          if (tailStr.length > 0) {
            finalStr = tailStr + ',' + finalStr
          }
          return finalStr
        }
      } else {
        // 有小數點
        const arr = str.split('.')
        const str1 = arr[0]
        if (str1.length < 4) {
          if (isDot) {
            return str
          } else {
            return str1
          }
        } else {
          const count = parseInt(str1.length / 3)
          const tailStr = str1.substr(0, str1.length - count * 3)
          let finalStr = ''
          for (let i = 0; i < count; i++) {
            const shortStr = str1.substr(i * 3 + tailStr.length, 3)
            if (i == count - 1) {
              finalStr = finalStr + shortStr
            } else {
              finalStr = finalStr + shortStr + ','
            }
          }

          if (isDot) {
            if (tailStr.length > 0) {
              finalStr = tailStr + ',' + finalStr + '.' + arr[1]
            } else {
              finalStr = finalStr + '.' + arr[1]
            }
          } else {
            if (tailStr.length > 0) {
              finalStr = tailStr + ',' + finalStr
            } else {
              finalStr = finalStr
            }
          }

          return finalStr
        }
      }
    } else {
      return ''
    }
  }

  // 格式化手机号
  static formatePhoneNumber(num) {
    // 去除所有空格
    const str = num.replace(/\s+/g, '')

    if (str.indexOf('+86') !== -1) {
      if (!CheckUtils.isChinaMobile(str.substr(3))) return num

      const header = str.substr(0, 3)
      const c1 = str.substr(3, 3)
      const c2 = str.substr(6, 4)
      const c3 = str.substring(10)
      const arr = [header, c1, c2, c3]
      return arr.join(' ')
    } else if (str.indexOf('+852') !== -1 || str.indexOf('+853') !== -1) {
      if (CheckUtils.isHongKongMobile(str.substr(4)) || CheckUtils.isMacaoMobile(str.substr(4))) {
        const header = str.substr(0, 4)
        const c1 = str.substr(4, 4)
        const c2 = str.substr(8)
        const arr = [header, c1, c2]

        return arr.join(' ')
      }
      return num
    } else if (str.indexOf('+1') !== -1) {
      if (!CheckUtils.isUSAMobile(str.substr(2))) return num

      const header = str.substr(0, 2)
      const c1 = str.substr(2, 3)
      const c2 = str.substr(5, 3)
      const c3 = str.substring(8)
      const arr = [header, c1, c2, c3]
      return arr.join(' ')
    } else {
      // 不带区号的
      if (CheckUtils.isChinaMobile(str)) {
        const c1 = str.substr(0, 3)
        const c2 = str.substr(3, 4)
        const c3 = str.substring(7)
        const arr = [c1, c2, c3]
        return arr.join(' ')
      } else if (CheckUtils.isMacaoMobile(str) || CheckUtils.isHongKongMobile(str)) {
        const c1 = str.substr(0, 4)
        const c2 = str.substr(4)
        const arr = [c1, c2]
        return arr.join(' ')
      } else if (CheckUtils.isUSAMobile(str)) {
        const c1 = str.substr(0, 3)
        const c2 = str.substr(3, 3)
        const c3 = str.substring(6)
        const arr = [c1, c2, c3]
        return arr.join(' ')
      } else {
        // 都不符合 不做处理
        return num
      }
    }
  }

  /**
   * 验证是否是金额（两位小数）
   * @param {*} money
   */
  static isMoney(money) {
    const reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^[1-9]$)|(^\d\.[1-9]{1,2}$)|(^\d\.[0]{1}[1-9]{1}$|(^\d\.[1-9]{1}[0]{1}$)$)/
    const num = money + ''
    return reg.exec(num)
  }

  static fomateTime(str) {
    if (!str) return ''
    let date = new Date(str)
    let y = date.getFullYear()
    let m = (Array(2).join(0) + (date.getMonth() + 1)).slice(-2)
    let day = (Array(2).join(0) + date.getDate()).slice(-2)

    return y + '-' + m + '-' + day
  }

  static fomateWholeTime(str) {
    if (!str) return ''
    let date = new Date(str)
    let y = date.getFullYear()
    let m = (Array(2).join(0) + (date.getMonth() + 1)).slice(-2)
    let day = (Array(2).join(0) + date.getDate()).slice(-2)

    let hour = (Array(2).join(0) + date.getHours()).slice(-2)
    let min = (Array(2).join(0) + date.getMinutes()).slice(-2)
    let sec = (Array(2).join(0) + date.getSeconds()).slice(-2)
    return y + '-' + m + '-' + day + ' ' + hour + ':' + min + ':' + sec
  }

  static getOrderStatus(type) {
    let status = ''
    switch (type) {
      case 1:
        status = '待付款'
        break
      case 2:
        status = '待发货'
        break
      case 3:
        status = '待收货'
        break
      case 4:
        status = '退款中'
        break
      case 5:
        status = '已退款'
        break
      case 6:
        status = '已完成'
        break
      case 7:
        status = '已关闭'
        break
    }
    return status
  }
}
