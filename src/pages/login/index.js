import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtInput, AtSwitch, AtForm } from 'taro-ui'

import { asyncRequset } from '../../actions/common'

import './index.scss'
// import { nextTick } from 'nervjs';


class Login extends Component {
  config = {
    navigationBarTitleText: '登录页'
  }
  constructor() {
    super(...arguments)
    this.loginUrl = "LoginIn"
    this.state = {
      name: 1212,
      passsWord: 1212,
      text: "登录"
    }
  }
  handleChange(value) {
    if (value) {
      this.loginUrl = "LoginIn"
      this.setState({
        text: "登录"
      })
    } else {
      this.loginUrl = "Register"
      this.setState({
        text: "注册"
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    const { userData, token } = nextProps.common
    if (userData.nickName || token) {
      Taro.showToast({ title: nextProps.common.userData.msg, icon: 'none', duration: 2000 })
      if (process.env.TARO_ENV === 'weapp') {
        Taro.switchTab({ url: "../mine/index" })//wx tabBar跳转
      } else {
        // 跳转到目的页面，打开新页面
        Taro.navigateTo({ //h5 tabBar跳转
          url: '../mine/index'
        })
      }
      return
    }
    Taro.showToast({ title: "授权失败", icon: 'none', duration: 2000 })
  }

  userLoginFunc = async () => {
    const { name, passsWord } = this.state
    let self = this
    // if (process.env.TARO_ENV === 'weapp') {
    //   Taro.getUserInfo({
    //     success(res) {
    //       self.loginUrl = "Register"
    //       let data = { ...res.userInfo,password:"123456" }
    //       self.props.asyncRequset("微信登录", data, self.loginUrl)
    //     },
    //     fail() {
    //       Taro.showToast({ title: "授权失败", icon: 'none', duration: 2000 })
    //     }
    //   })
    // } else {
    // }
    this.props.asyncRequset("注册中。。。", { "nickName": name, "password": passsWord }, this.loginUrl)

  }
  handleChangeName = async (data) => {
    this.setState({ name: data })
  }
  handleChangePassWord = async (data) => {
    this.setState({ passsWord: data })
  }
  componentDidMount() {
    // if (process.env.TARO_ENV === 'weapp') {
    //   this.setState({
    //     text: "微信授权"
    //   })
    // }
  }

  render() {
    const { name, passsWord } = this.state
    return (
      <View className='login'>

        {/* <button  lang="zh_CN" bindgetuserinfo="onGotUserInfo">获取用户信息</button> */}
        {this.state.text == "微信授权" ?
          <AtButton type='primary' open-type="getUserInfo" onClick={this.userLoginFunc}>{this.state.text}</AtButton>
          :
          <View>
            <AtForm>
              <AtInput
                name='value1'
                title='姓名'
                type='text'
                placeholder='随便写个名字'
                value={name}
                onChange={this.handleChangeName}
              />
              <AtInput
                name='value3'
                title='密码'
                type='password'
                placeholder='随便写个密码'
                value={passsWord}
                onChange={this.handleChangePassWord}
              />
            </AtForm>
            <AtButton type='primary' open-type="getUserInfo" onClick={this.userLoginFunc}>{this.state.text}</AtButton>
            <AtForm>
              <AtSwitch title={this.state.text} checked onChange={this.handleChange.bind(this)} />
            </AtForm>
          </View>
        }
      </View>
    )
  }
}

export default connect(({ common }) => ({
  common
}), (dispatch) => ({
  asyncRequset(text, data, url) {
    dispatch(asyncRequset(text, data, url))
  },
}))(Login)
