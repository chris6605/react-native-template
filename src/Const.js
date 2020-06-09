import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native'

export default class Const {
  static initalPage = 'SplashPage'

  static get hostAddress() {
    return global.hostAddress ? global.hostAddress[global.hostIndex].url : 'http://47.74.178.41:8030/'
  }

  static H5PageHost = Const.hostAddress + 'api/v1/message/detail?id='

  static mScreenWidth = Dimensions.get('window').width

  static mScreenHeight = Dimensions.get('window').height

  static mBackgroundColor = '#f5f5f5'

  static themeColor = '#35ba9b'

  static blackColor = '#233846'

  static grayColor = '#959ba0'

  static getSize(size) {
    return (size * Const.mScreenWidth) / 375
  }

  static IS_IOS = Platform.OS === 'ios'

  static IS_ANDROID = Platform.OS === 'android'

  static ONE_PIXEL = (PixelRatio.get() === 3 ? 2 : 1) / PixelRatio.get()

  static get IS_iPhoneX() {
    let dimen = Dimensions.get('window')
    return Platform.OS === 'ios' && (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
  }

  static mStatusBarHeight = Const.IS_ANDROID ? StatusBar.currentHeight : Const.IS_iPhoneX ? 44 : 20

  static mBottomHeight = Const.IS_iPhoneX ? 34 : 0

  static mNavigationBarHeight = 44

  static mTabBarHeight = 49

  static TEST_IMAGE = 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'

  static OrderStatus = {
    all: 0,
    waitPay: 1,
    waitSend: 2,
    waitGet: 3,
    afterSale: 4,
  }
}
