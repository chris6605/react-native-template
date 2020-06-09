import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, TouchableOpacity, Animated, DeviceEventEmitter, FlatList } from 'react-native'

import BaseComponent from '../../base/BaseComponent'

import Const from '../../Const'

import RouterManager from '../../../RouterManager'

import BaseDiaolog from '../../base/BaseDialog'

import Area from '../../config/area.json'

import ds from '../../ds'

export default class Address extends BaseDiaolog {
  constructor(props) {
    super(props)
    this.state = {
      provinces: [],
      citys: [],
      countrys: [],
      province: '',
      city: '',
      country: '',
      municipality: [], // 直辖市
      isMunici: false, //当前省份是否是直辖市
    }
  }

  _getContentPosition() {
    return {
      justifyContent: 'flex-end',
      alignItems: 'center',
    }
  }

  resetData(callback) {
    this.setState(
      {
        provinces: [],
        citys: [],
        countrys: [],
        province: '',
        city: '',
        country: '',
        municipality: [], // 直辖市
        isMunici: false, //当前省份是否是直辖市
      },
      () => {
        callback && callback()
      },
    )
  }

  /**
   * 初始化 传入的[]
   * @param {*} initData
   */
  configInitData(initData) {
    let [provinceName, cityName, countryName] = initData

    if (initData.length == 1) {
      let tempCity = []
      Area.map((item) => {
        if (item.name == provinceName) {
          if (item.city.length == 1) {
            tempCity = tempCity.concat(item.city[0].area)
            this.setState({ isMunici: true })
          } else {
            item.city.map((item1) => {
              tempCity.push(item1.name)
            })
            this.setState({ isMunici: false })
          }
        }
      })
      this.setState({ province: provinceName, citys: tempCity })
    } else if (initData.length == 2) {
      let tempCityArr = []
      let tempCountryArr = []
      Area.map((item) => {
        if (item.name == provinceName) {
          if (item.city.length == 1) {
            // 直辖市

            this.setState({ isMunici: true, citys: item.city[0].area, province: provinceName, city: cityName })
          } else {
            let arr = item.city
            arr.map((item1) => {
              tempCityArr.push(item1.name)
              if (item1.name == cityName) {
                tempCountryArr = tempCountryArr.concat(item1.area)
              }
            })
            this.setState({
              isMunici: false,
              citys: tempCityArr,
              countrys: tempCountryArr,
              province: provinceName,
              city: cityName,
            })
          }
        }
      })
    } else if (initData.length == 3) {
      let tempCityArr = []
      let tempCountryArr = []
      Area.map((item) => {
        if (item.name == provinceName) {
          let citys = item.city
          citys.map((item1) => {
            tempCityArr.push(item1.name)
            if (cityName == item1.name) {
              tempCountryArr = tempCountryArr.concat(item1.area)
            }
          })
        }
      })

      this.setState({
        isMunici: false,
        province: provinceName,
        city: cityName,
        country: countryName,
        citys: tempCityArr,
        countrys: tempCountryArr,
      })
    }
  }

  /**
   * 设置数据
   * @param {*} initData 初始的 省市区
   * @param {*} onSelected 选择完成的回调
   */
  setContent(initData = [], onSelected) {
    let tempInitData = []
    initData.map((item) => {
      if (item) {
        tempInitData.push(item)
      }
    })
    // 先重置数据
    this.resetData(() => {
      if (initData.length > 0) {
        this.configInitData(tempInitData)
      }
    })

    let provinces = []
    let munici = []
    Area.map((item) => {
      //  console.warn(item);
      provinces.push(item.name)

      if (item.city.length == 1 && item.city.name == '') {
        // 直辖市
        munici.push(item.name)
      }
    })

    this.setState({
      provinces, // 所有省份
      municipality: munici, //自治区直辖市
    })

    this.onSelected = onSelected

    return this
  }

  // 获取市
  getCity() {
    Area.map((item) => {
      if (item.name == this.state.province) {
        let city = item.city
        if (city.length == 1) {
          // 直辖市
          let arr = city[0].area
          this.setState({ citys: arr, isMunici: true })
        } else {
          // 有市--县 的
          let tempArr = []
          city.map((item1) => {
            tempArr.push(item1.name)
          })
          this.setState({ citys: tempArr, isMunici: false })
        }
      }
    })
  }

  // 获取区县
  getCountry() {
    //判断直辖市就没有县区了
    if (!this.state.isMunici) {
      Area.map((item) => {
        if (item.name == this.state.province) {
          let citys = item.city
          citys.map((item1) => {
            if (item1.name == this.state.city) {
              this.setState({ countrys: item1.area })
            }
          })
        }
      })
    } else {
    }
  }

  renderContent() {
    return (
      <View style={{ width: Const.mScreenWidth, height: Const.mScreenHeight * 0.7, backgroundColor: '#fff' }}>
        <View
          style={{
            paddingHorizontal: Const.getSize(10),
            width: Const.mScreenWidth,
            height: Const.getSize(60),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              this.dismiss()
            }}>
            <Text style={{ fontSize: Const.getSize(15), color: Const.blackColor }}>取消</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{}}
            onPress={() => {
              if (!this.state.province) {
                ds.toast.show('请选择省份')
                return
              }

              if (!this.state.city) {
                ds.toast.show('请选择市/区')
                return
              }

              if (this.state.countrys.length > 0 && !this.state.country) {
                ds.toast.show('请选择区/县')
                return
              }

              this.dismiss()
              this.onSelected && this.onSelected([this.state.province, this.state.city, this.state.country])
            }}>
            <Text style={{ fontSize: Const.getSize(15), color: Const.blackColor }}>确定</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: Const.mScreenWidth,
            paddingBottom: Const.getSize(10),
          }}>
          <Text style={{ paddingLeft: Const.getSize(10), fontSize: Const.getSize(15), color: Const.themeColor }}>{this.state.province ? this.state.province : '请选择省份'} </Text>
          <Text style={{ paddingLeft: Const.getSize(10), fontSize: Const.getSize(15), color: Const.themeColor }}>{this.state.province ? (this.state.city ? this.state.city : '请选择地市') : ''} </Text>
          <Text style={{ paddingLeft: Const.getSize(10), fontSize: Const.getSize(15), color: Const.themeColor }}>
            {this.state.city && !this.state.isMunici ? (this.state.country ? this.state.country : '请选择区县') : ''}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <FlatList
            style={{ width: Const.mScreenWidth / 3 }}
            showsVerticalScrollIndicator={false}
            data={this.state.provinces}
            keyExtractor={(item, index) => index + ''}
            renderItem={this.renderProvinceItem.bind(this)}
          />

          <FlatList
            style={{ width: Const.mScreenWidth / 3 }}
            showsVerticalScrollIndicator={false}
            data={this.state.citys}
            keyExtractor={(item, index) => index + ''}
            renderItem={this.renderCityItem.bind(this)}
          />

          <FlatList
            style={{ width: Const.mScreenWidth / 3 }}
            showsVerticalScrollIndicator={false}
            data={this.state.countrys}
            keyExtractor={(item, index) => index + ''}
            renderItem={this.renderCountryItem.bind(this)}
          />
        </View>
      </View>
    )
  }

  renderProvinceItem(item) {
    return (
      <TouchableOpacity
        style={{
          width: Const.mScreenWidth / 3,
          height: Const.getSize(50),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          this.setState({ province: item.item, citys: [], countrys: [], city: '', country: '' }, () => {
            this.getCity()
          })
        }}>
        <Text style={{ fontSize: Const.getSize(15), color: this.state.province == item.item ? Const.blackColor : Const.grayColor }}>{item.item}</Text>
      </TouchableOpacity>
    )
  }

  renderCityItem(item) {
    return (
      <TouchableOpacity
        style={{
          width: Const.mScreenWidth / 3,
          height: Const.getSize(50),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          this.setState({ city: item.item, countrys: [], country: '' }, () => {
            this.getCountry()
          })
        }}>
        <Text style={{ fontSize: Const.getSize(15), color: this.state.city == item.item ? Const.blackColor : Const.grayColor }}>{item.item}</Text>
      </TouchableOpacity>
    )
  }

  renderCountryItem(item) {
    return (
      <TouchableOpacity
        style={{
          width: Const.mScreenWidth / 3,
          height: Const.getSize(50),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          this.setState({ country: item.item })
        }}>
        <Text style={{ fontSize: Const.getSize(15), color: this.state.country == item.item ? Const.blackColor : Const.grayColor }}>{item.item}</Text>
      </TouchableOpacity>
    )
  }
}
