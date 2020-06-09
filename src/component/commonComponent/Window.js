import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter, StatusBar } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import Alert from '../commonComponent/CustomAlert'

import Toast from '../commonComponent/Toast'

import Loading from '../commonComponent/Loading'

import ActionSheet from '../commonComponent/ActionSheet'

import SimpleAlert from '../commonComponent/SimpleAlert'

import PasswordAlert from '../commonComponent/PasswordAlert'

import ConfirmAlert from '../commonComponent/ConfirmAlert'

import AddressComponent from '../commonComponent/AddressComponent'

export default class Window extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="box-none">
        <Alert ref={(ref) => (global.dsAlert = ref)} />
        <Toast ref={(ref) => (global.dsToast = ref)} />
        <Loading ref={(ref) => (global.dsLoading = ref)} />
        <ActionSheet ref={(ref) => (global.dsActionSheet = ref)} />
        <SimpleAlert ref={(ref) => (global.dsSimpleAlert = ref)} />
        <PasswordAlert ref={(ref) => (global.dsPasswordAlert = ref)} />
        <ConfirmAlert ref={(ref) => (global.dsConfirmAlert = ref)} />
        <AddressComponent ref={(ref) => (global.dsAddressComponent = ref)} />
      </View>
    )
  }
}
