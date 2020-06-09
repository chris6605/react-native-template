class NumberUtils {
  static fomateFloat(value, n = 6) {
    const numStr = String(value)
    let num = 0
    if (numStr.includes('.')) {
      num = numStr.slice(0, numStr.indexOf('.') + n + 1)
    } else {
      num = numStr
    }
    return Number(num)
  }
}

export default NumberUtils
