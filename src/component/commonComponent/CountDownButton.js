'use strict'

import React from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

import Const from '../../Const'

export default class CountDownButton extends React.Component {
  static defaultProps = {
    timerTitle: '获取验证码',
    timerCount: 60, // 默认倒计时时间
    enable: true,
    fontColor: '#fff',
    disableFontColor: '#fff',
    disableBackgroundColor: '#f2f2f2',
    backgroundColor: 'blue',
    fontSize: Const.getSize(14),
    disableFontSize: Const.getSize(16),
  }

  constructor(props) {
    super(props)
    this.state = {
      timerCount: this.props.timerCount,
      timerTitle: this.props.timerTitle,
      counting: false,
      selfEnable: this.props.enable,
    }

    this._countDownAction = this._countDownAction.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    this.setState({ selfEnable: nextProps.enable })
  }

  _countDownAction() {
    const codeTime = this.state.timerCount
    const { timerActiveTitle, timerTitle } = this.props
    const now = Date.now()
    const overTimeStamp = now + codeTime * 1000 + 100
    /*过期时间戳（毫秒） +100 毫秒容错*/
    this.interval = setInterval(() => {
      const nowStamp = Date.now()
      if (nowStamp >= overTimeStamp) {
        // 过期了
        this.interval && clearInterval(this.interval)
        this.setState({
          timerCount: codeTime,
          timerTitle: timerTitle,
          counting: false,
          selfEnable: true,
        })
      } else {
        // 剩余时间
        const leftTime = parseInt((overTimeStamp - nowStamp) / 1000, 10)
        let activeTitle = `${leftTime}s`

        this.setState({
          timerCount: leftTime,
          timerTitle: activeTitle,
        })
      }
    }, 1000)
  }

  startCounting() {
    this.props.onPress && this.props.onPress()
    this._countDownAction()
    this.setState({ counting: true, selfEnable: false, timerTitle: `${this.state.timerCount}s` })
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.interval && clearInterval(this.interval)
  }

  render() {
    const { onPress, style, textStyle, fontColor, disableFontColor, disableBackgroundColor, backgroundColor, fontSize, disableFontSize } = this.props
    const { counting, timerTitle, selfEnable } = this.state
    return (
      <View
        style={[
          {
            width: Const.getSize(90),
            height: Const.getSize(35),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.state.counting ? disableBackgroundColor : backgroundColor,
          },
          style,
        ]}>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={counting ? 1 : 0.8}
          onPress={() => {
            if (!counting && selfEnable) {
              this.startCounting()
            }
          }}>
          <Text
            style={{
              fontSize: this.state.counting ? disableFontSize : fontSize,
              color: this.state.counting ? disableFontColor : fontColor,
            }}>
            {timerTitle}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
