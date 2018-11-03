import Taro, { Component } from '@tarojs/taro'
// import { View, Button, Text } from '@tarojs/components'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { asyncRequset } from '../../actions/common'
import { AtButton, AtAvatar } from 'taro-ui'
import './index.scss'



class Mine extends Component {
  config = {
    navigationBarTitleText: '我的'
  }
  constructor() {
    super(...arguments)
    this.state = {
      notLogin: true,
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    let self = this
    if (Object.keys(this.props.common.userData).length == 0 || Object.keys(this.props.common.userData.user).length == 0) {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          // 异步接口在success回调才能拿到返回值
          self.getUserInfo(res.data)
          self.setState({
            notLogin: false
          })
        },
        fail: function () {
          console.log("------------------------")
        }
      })
     // Taro.getStorageSync("token")  //同步
    }
  }
  getUserInfo = (data) => {
    this.props.asyncRequset("获取用户信息", { "token": data }, "jwt/GetUser")
  }
  goOtherPages = (url) => {
    Taro.redirectTo({ url })
  }
  render() {
    return (
      <View className='mine'>
        <View className='avatar-url' >
          <AtAvatar circle text='头像' size="large" image={this.props.common.userData.user.avatarUrl}></AtAvatar>
        </View>
        <AtButton>{this.props.common.userData.user.nickName}</AtButton>
        {this.state.notLogin ?
          <AtButton onClick={this.goOtherPages.bind(this, "../login/index")}>登录</AtButton>
          :
          null
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
}))(Mine)
