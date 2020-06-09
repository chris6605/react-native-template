import React, { Component } from 'react'
import { StyleSheet, AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BaseDiaolog from '../../base/BaseDialog'

export default class ConfirmAlert extends BaseDiaolog {
  _bgCloseable = true

  constructor(props) {
    super(props)
    this.state = {}
  }

  renderContent() {
    return (
      <View
        style={{
          width: Const.mScreenWidth - Const.getSize(40),
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: Const.getSize(8),
          overflow: 'hidden',
        }}>
        {this.renderChildView()}
      </View>
    )
  }

  renderChildView() {
    const { title = '温馨提示', head, content, btnText = '确认', onBtnPress = () => {} } = this
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {head && <Text style={styles.head}>{head}</Text>}
        {content && <Text style={styles.content}>{content}</Text>}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => {
            this.dismiss()
            let timer = setTimeout(() => {
              timer && clearTimeout(timer)
              timer = null
              onBtnPress()
            }, 30)
          }}>
          <Text style={{ fontSize: Const.getSize(14), color: '#FFF' }}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setHeade(head) {
    this.head = head
    return this
  }

  setContent(content) {
    this.content = content
    return this
  }

  setButton(btnText, onPress = () => {}) {
    this.btnText = btnText
    this.onBtnPress = onPress
    return this
  }
}

const styles = StyleSheet.create({
  container: { width: Const.getSize(335), backgroundColor: '#FFF', marginHorizontal: Const.getSize(20), borderRadius: Const.getSize(10), justifyContent: 'center' },
  title: { marginTop: Const.getSize(30), fontSize: Const.getSize(20), fontWeight: 'bold', color: Const.blackColor, textAlign: 'center' },
  head: { marginTop: Const.getSize(49), marginLeft: Const.getSize(42), fontSize: Const.getSize(16), color: Const.blackColor, fontWeight: 'bold' },
  content: { marginLeft: Const.getSize(42), marginTop: Const.getSize(20), fontSize: Const.getSize(14), color: Const.grayColor },
  button: {
    marginTop: Const.getSize(50),
    marginHorizontal: Const.getSize(20),
    marginBottom: Const.getSize(30),
    height: Const.getSize(40),
    backgroundColor: Const.themeColor,
    alignSelf: 'stretch',
    borderRadius: Const.getSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
})
