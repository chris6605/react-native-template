import React, { Component } from 'react'

interface WaterfallPorps {
  // 瀑布流的列数，默认：2
  columns: number

  // 瀑布流每列之间的间隔， 默认：10
  space: number

  // 用于自定义瀑布流中每一项的内容，默认：null
  renderItem: () => React.ReactElement<any> | null

  // 为给定的item生成一个不重复的key。若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index
  keyExtractor: string

  // 是否启用下拉刷新，默认：true
  refresh: boolean

  // 下拉刷新触发该函数，接收一个done函数用于结束刷新
  refreshing: (done: Function) => void

  // 下拉刷新参数 下拉刷新参数，配置详见RefreshControl[https://facebook.github.io/react-native/docs/refreshcontrol.html]
  refreshConf: object

  // 是否启用滚动加载，默认：true
  infinite: boolean

  // 是否加载到最后一页了
  isLoadEnd: boolean

  // 滚动到列表底部触发该函数，接收参数同refreshing
  infiniting: (done: Function) => void

  // 设置为false滚动到列表底部后将不触发infiniting，默认：true
  hasMore: boolean

  // 用于自定义滚动加载组件及样式,接收一个loading用于判断是否正在加载
  renderInfinite: () => React.ReactElement<any> | null

  renderHeader: () => React.ReactElement<any> | null

  renderFooter: () => React.ReactElement<any> | null
}

export default class Waterfall extends Component<WaterfallPorps, {}> {
  /**
   * 触发下拉刷新
   */
  refreshing: () => void

  /**
   * 添加Items到瀑布流中，其中Item的高度自动计算出来，将Item添加到最矮的列中，所以会导致Items依次渲染。
   */
  addItems: () => void

  /**
   * 添加Items到瀑布流中，高度给定的方式
   */
  addItemsWithHeight: () => void

  /**
   * 获取数据源
   */
  getItems: () => Array

  /**
   * 清除瀑布流内容（一般用于下拉刷新之前，用来情况所有数据）
   */
  clear: () => void
}
