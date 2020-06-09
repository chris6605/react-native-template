import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BaseDiaolog from '../../base/BaseDialog'

import WebImage from '../commonComponent/WebImage'

export default class BuyActionSheet extends BaseDiaolog {
  callback = null

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      count: 1,
    }
  }

  componentWillMount() {
    this.setState({ data: this.props.data })
  }

  componentWillReceiveProps(nexprops) {
    this.setState({ data: nexprops.data })
  }

  renderContent() {
    return (
      <View
        style={{
          width: Const.mScreenWidth,
          height: Const.mScreenHeight * 0.7,
          backgroundColor: Const.mBackgroundColor,
          borderTopLeftRadius: Const.getSize(10),
          borderTopRightRadius: Const.getSize(10),
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: Const.getSize(12),
            width: Const.getSize(354),
            height: Const.getSize(100),
            paddingHorizontal: Const.getSize(10),
            backgroundColor: '#fff',
            borderRadius: Const.getSize(8),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <WebImage style={{ width: Const.getSize(104), height: Const.getSize(79), borderRadius: Const.getSize(10) }} uri={this.state.data.url} />
          <View style={{ marginLeft: Const.getSize(13) }}>
            <Text style={{ fontSize: Const.getSize(18), color: Const.themeColor }}>
              {`${this.state.data.realPrice} `}
              <Text style={{ fontSize: Const.getSize(10) }}>DC</Text>
            </Text>

            <Text style={{ marginTop: Const.getSize(10), fontSize: Const.getSize(10), color: Const.blackColor }}>{`库存${this.state.data.stock}件`}</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: Const.getSize(12),
            width: Const.getSize(354),
            height: Const.getSize(60),
            paddingHorizontal: Const.getSize(10),
            backgroundColor: '#fff',
            borderRadius: Const.getSize(8),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: Const.getSize(10), color: Const.blackColor }}>购买数量</Text>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: Const.ONE_PIXEL, height: Const.getSize(40), backgroundColor: '#bfbfbf' }} />
            <TouchableOpacity
              style={{
                width: Const.getSize(40),
                height: Const.getSize(40),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                if (this.state.count > 1) {
                  let count = this.state.count
                  count--
                  this.setState({ count: count })
                }
              }}>
              <Text style={{ fontSize: Const.getSize(16), color: Const.blackColor }}>-</Text>
            </TouchableOpacity>
            <View style={{ width: Const.ONE_PIXEL, height: Const.getSize(40), backgroundColor: '#bfbfbf' }} />
            <View
              style={{
                width: Const.getSize(40),
                height: Const.getSize(40),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: Const.getSize(16), color: Const.blackColor }}>{this.state.count}</Text>
            </View>
            <View style={{ width: Const.ONE_PIXEL, height: Const.getSize(40), backgroundColor: '#bfbfbf' }} />
            <TouchableOpacity
              style={{
                width: Const.getSize(40),
                height: Const.getSize(40),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                if (this.state.count < this.state.data.stock) {
                  let count = this.state.count
                  count++
                  this.setState({ count: count })
                }
              }}>
              <Text style={{ fontSize: Const.getSize(16), color: Const.blackColor }}>+</Text>
            </TouchableOpacity>
            <View style={{ width: Const.ONE_PIXEL, height: Const.getSize(40), backgroundColor: '#bfbfbf' }} />
            <View
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: Const.getSize(122),
                height: Const.ONE_PIXEL,
                backgroundColor: '#bfbfbf',
              }}
            />
            <View
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: Const.getSize(122),
                height: Const.ONE_PIXEL,
                backgroundColor: '#bfbfbf',
              }}
            />
          </View>
        </View>

        <View style={{ flex: 1 }} />

        <View
          style={{
            width: Const.mScreenWidth,
            height: Const.getSize(54),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
          onPress={() => {
            this.dismiss()
          }}>
          <TouchableOpacity
            style={{
              width: Const.getSize(335),
              height: Const.getSize(40),
              backgroundColor: Const.themeColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: Const.getSize(20),
            }}
            onPress={() => {
              this.props.onPress && this.props.onPress(this.state.count)
            }}>
            <Text style={{ fontSize: Const.getSize(16), color: '#fff' }}>立即购买</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: Const.mScreenWidth, height: Const.mBottomHeight }} />
      </View>
    )
  }

  _getContentPosition() {
    return {
      justifyContent: 'flex-end',
      alignItems: 'center',
    }
  }
}
