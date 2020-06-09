import { NavigationActions, StackActions } from 'react-navigation'

const routers = []

const pages = []

export default class RouterManager {
  /**
   * 获取前一个页面路由对象
   */
  static getPreviousRouter() {
    if (global.RootNavigator) {
      const routes = global.RootNavigator.state.nav.routes
      const route = routes[routes.length - 2]
      return route
    }
    return ''
  }

  /**
   * 获取当前路由对象
   */
  static getCurrentRouter() {
    if (global.RootNavigator) {
      const routes = global.RootNavigator.state.nav.routes
      let route = routes[routes.length - 1]
      if (route.routes) {
        route = route.routes[route.index]
      }
      return route
    }
    return ''
  }

  /**
   * 添加路由到路由管理栈
   * @param {* 路由名} routeName
   * @param {* 路由的导航栈} navigation
   */
  static addRouter(routeName, navigation) {
    routers[routeName] = navigation
  }

  /**
   * 获取当前路由的page实例
   */
  static getCurrentPage() {
    if (global.RootNavigator) {
      return pages[this.getCurrentRouter().key]
    }
    return null
  }

  /**
   * 添加page到page实例管理栈
   * @param {* key page对应的唯一key，即使是相同名字的页面，该key也不一样} key
   * @param {* page page实例} page
   */
  static addPage(key, page) {
    if (key && page) {
      pages[key] = page
    }
  }

  /**
   * 从page实例管理栈中移除
   * @param {* key page对应的唯一key，即使是相同名字的页面，该key也不一样} key
   */
  static removePage(key) {
    if (pages.hasOwnProperty(key)) {
      delete pages[key]
    }
  }

  /**
   * push
   * @param {* 跳转的page名} routeName
   * @param {* 参数} params
   * @param {* 是否重复跳转（默认为false，就是一个page不能跳转同page名的页面，设置成true的话可以开启跳转）} rep
   */
  static push(routeName, params = null, rep = false) {
    let tempParams = Object.assign({ canGesturePop: true }, params)
    const curRouteName = this.getCurrentRouter().routeName,
      navParams = {
        routeName: routeName,
        params: tempParams,
      }
    const navigation = routers[curRouteName]
    navigation && navigation.navigate(navParams)
  }

  static pop(number = 1) {
    const curRouteName = this.getCurrentRouter().routeName
    const navigation = routers[curRouteName]
    navigation && navigation.pop(number)
  }

  static popToRoot() {
    const curRouteName = this.getCurrentRouter().routeName
    const navigation = routers[curRouteName]
    navigation && navigation.pop(RouterManager.routerCount() - 1)
  }

  /**
   * 返回指定的页面
   * @param {} pageName
   */
  static popToPage(pageName = '') {
    const curRouteName = this.getCurrentRouter().routeName
    const navigation = routers[curRouteName]
    const routes = this.getCurrentRoutes()
    let index = 0
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i]
      if (route.routeName == pageName) {
        index = i
        break
      }
    }
    navigation && navigation.pop(routes.length - 1 - index)
  }

  static replace(routeName, params = null) {
    const curRouteName = this.getCurrentRouter().routeName
    const navigation = routers[curRouteName]
    navigation && navigation.replace(routeName, params)
  }

  static resetTo(routeName, params = null) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    })
    const curRouteName = this.getCurrentRouter().routeName
    const navigation = routers[curRouteName]
    navigation && navigation.dispatch(resetAction)
  }

  static routerCount() {
    if (global.RootNavigator) {
      const routes = global.RootNavigator.state.nav.routes
      return routes.length
    }
    return 1
  }
}
