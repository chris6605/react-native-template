import PermissionUtils from './PermissionUtils'

class LocationUtils {
  /**
   * 获取位置，经纬度
   */
  static async getLocation() {
    const getCurrentPosition = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (location) => {
            resolve(location)
          },
          (error) => {
            reject(error)
          },
          { enableHighAccuracy: __DEV__, timeout: 25000, maximumAge: 3600000 },
        )
      })

    try {
      await PermissionUtils.requestLocation()
      return getCurrentPosition()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * 根据起点、终点的经纬度计算距离
   * @param {*} start
   * @param {*} end
   */
  static getDistance(start, end, unit = 'km') {
    const lon1 = (Math.PI / 180) * start.longitude
    const lat1 = (Math.PI / 180) * start.latitude

    const lon2 = (Math.PI / 180) * end.longitude
    const lat2 = (Math.PI / 180) * end.latitude

    // 地球半径
    const R = 6371
    // 两点间距离 KM
    const d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * R
    if (unit === 'km') {
      return Math.round(d * 100) / 100
    } else {
      // 公里转米
      const abs = Math.abs(d * 1000)

      return Math.round(abs)
    }
  }
}

export default LocationUtils
