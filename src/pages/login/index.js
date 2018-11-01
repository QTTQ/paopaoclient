import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtForm, AtInput } from 'taro-ui'
import { userLogin, asyncRequset } from '../../actions/common'

import './index.scss'
// import { nextTick } from 'nervjs';


class Login extends Component {

  config = {
    navigationBarTitleText: '登录页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      name: null,
      passsWord: null
    }
  }
  componentWillReceiveProps(nextProps) {
    if ((nextProps.common.userData.nickName && nextProps.common.userData.passsWord) || nextProps.common.userData.token) {
      Taro.showToast({ title: nextProps.common.userData.msg, icon: 'none', duration: 2000 })
      if (process.env.TARO_ENV === 'weapp') {
        Taro.switchTab({ url: "../index/index" })//wx tabBar跳转
      }else{
        // 跳转到目的页面，打开新页面
        Taro.navigateTo({ //h5 tabBar跳转
          url: '../index/index'
        })
      }
      return
    }
    Taro.showToast({ title: "授权失败q", icon: 'none', duration: 2000 })
  }

  userLoginFunc = async () => {
    const { name, passsWord } = this.state
    let self = this
    if (process.env.TARO_ENV === 'weapp') {
      Taro.getUserInfo({
        success(res) {
          let data = { ...res.userInfo, name, passsWord }
          self.props.userLogin(data)
        },
        fail() {
          Taro.showToast({ title: "授权失败", icon: 'none', duration: 2000 })
        }
      })
    } else {
      this.props.asyncRequset("注册中。。。", { "username": name, "password": passsWord }, "http://127.0.0.1:8080/Register")
    }

  }
  handleChangeName = async (data) => {
    this.setState({ name: data })
  }
  handleChangePassWord = async (data) => {
    this.setState({ passsWord: data })
  }


  render() {
    const { name, passsWord } = this.state
    return (
      <View className='login'>
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
        </View>
        {/* <button  lang="zh_CN" bindgetuserinfo="onGotUserInfo">获取用户信息</button> */}
        <AtButton type='primary' open-type="getUserInfo" onClick={this.userLoginFunc}>登录</AtButton>
      </View>
    )
  }
}

export default connect(({ common }) => ({
  common
}), (dispatch) => ({
  userLogin(data) {
    dispatch(userLogin(data))
  },
  asyncRequset(text, data, url) {
    dispatch(asyncRequset(text, data, url))
  },
}))(Login)
