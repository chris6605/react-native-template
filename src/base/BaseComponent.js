/**
 * Compnent基類,
 * 父類
 */

import { PureComponent } from 'react'

import Const from '../Const'

export default class BaseComponent extends PureComponent {
  constructor(props) {
    super(props)
  }

  /**
   * 映射成375的尺寸
   * @param {*} size
   */
  _getSize(size) {
    return Const.getSize(size)
  }

  /**
   * FlatList便捷提取器
   */
  _keyExtractor = (data, index) => index.toString()
}
