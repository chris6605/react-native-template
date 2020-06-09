import { Platform } from 'react-native'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'

class PermissionUtils {
  static async requestPhoto() {
    const photoPermission = Platform.select({
      android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    })
    try {
      const checkPhoto = async () => {
        const status = await check(photoPermission)
        switch (status) {
          case RESULTS.GRANTED:
            return Promise.resolve(true)
          case RESULTS.UNAVAILABLE:
          case RESULTS.BLOCKED:
            return Promise.reject(false)
          case RESULTS.DENIED:
            return requestPhoto()
          default:
            break
        }
      }
      const requestPhoto = async () => {
        const status = await request(photoPermission)
        switch (status) {
          case RESULTS.GRANTED:
            return Promise.resolve(true)
          case RESULTS.UNAVAILABLE:
          case RESULTS.DENIED:
          case RESULTS.BLOCKED:
            return Promise.reject(false)
          default:
            break
        }
      }
      return checkPhoto()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static async requestLocation() {
    const locationPermission = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    })
    try {
      const checkLocation = async () => {
        const status = await check(locationPermission)
        switch (status) {
          case RESULTS.GRANTED:
            return Promise.resolve(true)
          case RESULTS.UNAVAILABLE:
          case RESULTS.BLOCKED:
            return Promise.reject(false)
          case RESULTS.DENIED:
            return requestLocation()
          default:
            break
        }
      }
      const requestLocation = async () => {
        const status = await request(locationPermission)
        switch (status) {
          case RESULTS.GRANTED:
            return Promise.resolve(true)
          case RESULTS.UNAVAILABLE:
          case RESULTS.DENIED:
          case RESULTS.BLOCKED:
            return Promise.reject(new Error(false))
          default:
            break
        }
      }
      return checkLocation().catch(requestLocation)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default PermissionUtils
