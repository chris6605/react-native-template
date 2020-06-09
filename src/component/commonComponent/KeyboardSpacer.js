import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Keyboard, LayoutAnimation, View, Dimensions, ViewPropTypes, Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
})

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const defaultAnimation = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
}

class KeyboardSpacer extends Component {
  static propTypes = {
    topSpacing: PropTypes.number,
    onToggle: PropTypes.func,
    style: ViewPropTypes.style,
  }

  static defaultProps = {
    topSpacing: 0,
    onToggle: () => null,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      keyboardSpace: 0,
      isKeyboardOpened: false, // eslint-disable-line
    }
    this._listeners = null
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this)
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
  }

  componentDidMount() {
    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow'
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide'
    this._listeners = [Keyboard.addListener(updateListener, this.updateKeyboardSpace), Keyboard.addListener(resetListener, this.resetKeyboardSpace)]
  }

  componentWillUnmount() {
    this._listeners.forEach((listener) => listener.remove())
  }

  updateKeyboardSpace(event) {
    if (!event.endCoordinates) {
      return
    }

    let animationConfig = defaultAnimation
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(event.duration, LayoutAnimation.Types[event.easing], LayoutAnimation.Properties.opacity)
    }
    LayoutAnimation.configureNext(animationConfig)

    // get updated on rotation
    const screenHeight = Dimensions.get('window').height
    // when external physical keyboard is connected
    // event.endCoordinates.height still equals virtual keyboard height
    // however only the keyboard toolbar is showing if there should be one
    const { topSpacing, onToggle } = this.props
    const keyboardSpace = screenHeight - event.endCoordinates.screenY + topSpacing
    this.setState(
      {
        keyboardSpace,
        isKeyboardOpened: true, // eslint-disable-line
      },
      onToggle(true, keyboardSpace),
    )
  }

  resetKeyboardSpace(event) {
    let animationConfig = defaultAnimation
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(event.duration, LayoutAnimation.Types[event.easing], LayoutAnimation.Properties.opacity)
    }
    LayoutAnimation.configureNext(animationConfig)

    const { onToggle } = this.props
    this.setState(
      {
        keyboardSpace: 0,
        isKeyboardOpened: false, // eslint-disable-line
      },
      onToggle(false, 0),
    )
  }

  render() {
    const { style } = this.props
    const { keyboardSpace } = this.state
    if (Platform.OS === 'ios') return <View style={[styles.container, { height: keyboardSpace }, style]} />
    return null
  }
}

export default KeyboardSpacer
