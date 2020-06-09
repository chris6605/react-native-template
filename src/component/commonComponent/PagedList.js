/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import Const from '../../Const'

const styles = StyleSheet.create({
  footer: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    height: Const.getSize(44),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    fontSize: Const.getSize(12),
    color: '#666',
    textAlign: 'center',
  },
})

const StatusEnum = Object.freeze({
  Pending: 'PENDING',
  Refreshing: 'REFRESHING',
  EmptyData: 'EMPTY_DATA',
  Loading: 'LOADING',
  LoadFail: 'LOAD_FAIL',
  LoadMore: 'LOAD_MORE',
  NoMoreData: 'NO_MORE_DATA',
})

const { Pending, Refreshing, EmptyData, Loading, LoadFail, LoadMore, NoMoreData } = StatusEnum

const PagedList = (WrapComponent) => {
  return class extends PureComponent {
    // componentWillReceiveProps(nextProps) {
    //   // console.log('nextProps', nextProps)
    //   const { pageNum, pageSize, data = [] } = nextProps
    //   if (data.length === 0 && pageNum === 1) {
    //     this.status = emptyData
    //   }
    //   if (data.length < pageSize * pageNum) {
    //     this.status = noMoreData
    //   }
    //   if (data.length === pageSize * pageNum) {
    //     this.status = loadMore
    //   }
    // }

    _buildProps() {
      const {
        getListRef,
        contentContainerStyle,
        data = [],
        status = Pending,
        onRefresh,
        onEndReachedThreshold = 0.1,
        onEndReached,
        ListEmptyComponent,
        ListFooterComponent,
        keyExtractor = (item, index) => String(index),
        initialNumToRender = 20,
        showsVerticalScrollIndicator = false,
        // onScrollBeginDrag,
        // onScrollEndDrag,
        // onMomentumScrollBegin,
        // onMomentumScrollEnd,
        ...otherProps
      } = this.props

      const props = {}
      if (WrapComponent.displayName === 'FlatList') Object.assign(props, { data })
      if (WrapComponent.displayName === 'SectionList') Object.assign(props, { sections: data })
      Object.assign(props, {
        ref: getListRef,
        contentContainerStyle: [StyleSheet.flatten(contentContainerStyle), { flexGrow: 1 }],
        data,
        onRefresh: () => {
          // console.log('onRefresh-status', status)
          if (status === Refreshing || status === Loading) return
          onRefresh && onRefresh()
        },
        onEndReachedThreshold,
        onEndReached: ({ distanceFromEnd }) => {
          // console.log('onEndReached-status', status)
          if (data.length > 0 && status === LoadMore) {
            onEndReached && onEndReached()
          }
        },
        ListEmptyComponent: () => {
          if (status === EmptyData) {
            return (ListEmptyComponent && ListEmptyComponent()) || this.renderEmptyData()
          }
          return null
        },
        ListFooterComponent: () => {
          if (status === Pending) {
            return null
          }
          if (status === Loading) {
            return this.renderLoading()
          }
          if (status === LoadFail) {
            return this.renderLoadFail()
          }
          if (status === LoadMore) {
            return this.renderLoadMore()
          }
          if (status === NoMoreData) {
            return this.renderNoMoreData()
          }
          return null
        },
        keyExtractor,
        initialNumToRender: initialNumToRender,
        showsVerticalScrollIndicator,
        // onScrollBeginDrag: () => {
        //   this.canAction = true
        //   onScrollBeginDrag && onScrollBeginDrag()
        // },
        // onScrollEndDrag: () => {
        //   this.canAction = false
        //   onScrollEndDrag && onScrollEndDrag()
        // },
        // onMomentumScrollBegin: () => {
        //   this.canAction = true
        //   onMomentumScrollBegin && onMomentumScrollBegin()
        // },
        // onMomentumScrollEnd: () => {
        //   this.canAction = false
        //   onMomentumScrollEnd && onMomentumScrollEnd()
        // },
        ...otherProps,
        // onContentSizeChange: (contentWidth, contentHeight) => {
        //   console.log(contentHeight)
        //   this.contentHeight = contentHeight
        // },
        // onScroll: (event) => {
        //   const {
        //     nativeEvent: {
        //       contentOffset: { y },
        //     },
        //   } = event
        //   // console.log(event.nativeEvent)
        //   const offsetY = event.nativeEvent.contentOffset.y // 滑动距离
        //   const contentSizeHeight = event.nativeEvent.contentSize.height // scrollView contentSize高度
        //   const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height // scrollView高度
        //   if (offsetY + oriageScrollHeight + 200 >= contentSizeHeight) {
        //     // todo:这里需加判断请求中
        //     console.log('上传滑动到底部事件')
        //     if (!loading && status === loadMore) {
        //       onEndReached && onEndReached()
        //     }
        //   }
        // },
      })
      return props
    }

    renderEmptyData() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.tipText}>{'空数据'}</Text>
        </View>
      )
    }

    renderLoading() {
      return (
        <View style={styles.footer}>
          <ActivityIndicator animating color={Const.grayColor} size="small" />
        </View>
      )
    }

    renderLoadFail() {
      return (
        <TouchableOpacity style={styles.footer} disabled activeOpacity={1} onPress={() => this._onLoadMore()}>
          <Text style={styles.tipText}>{'加载失败，点击加载更多'}</Text>
        </TouchableOpacity>
      )
    }

    renderLoadMore() {
      return (
        <View style={styles.footer}>
          <Text style={styles.tipText}>{'上拉加载更多'}</Text>
        </View>
      )
    }

    renderNoMoreData() {
      return (
        <View style={styles.footer}>
          <Text style={styles.tipText}>{'没有更多数据了'}</Text>
        </View>
      )
    }

    render() {
      return <WrapComponent {...this._buildProps()} />
    }
  }
}

export { StatusEnum as Status }

PagedList.Status = StatusEnum
export default PagedList
