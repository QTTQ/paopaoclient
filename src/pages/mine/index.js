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
      hasLogin: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    let self = this
    console.log("----------------dddd---------");
    Taro.getStorage({
      key: 'token',
      success: function (res) {
        // 异步接口在success回调才能拿到返回值
        console.log(res, Taro.getStorageSync("token"), "-------------------token--")
        if (res.data != "") {
          self.getUserInfo(res.data)
          self.setState({
            hasLogin: true
          })
        }
      },
      fail: function () {
        self.setState({
          hasLogin: false
        })
        console.log("------------------------")
      }
    })
  }
  getUserInfo = (data) => {
    this.props.asyncRequset("获取用户信息", { "token": data }, "jwt/GetUser")
  }
  goOtherPages = (url) => {
    Taro.redirectTo({ url })
  }
  render() {
    // console.log(this.state.hasLogin, this.props.common, "=================");
    return (
      <View className='mine'>
        {this.state.hasLogin && this.props.common.userData.msg == "登录成功" ?
          <View>
            <View className='avatar-url' >
              <AtAvatar circle text='头像' size="large" image={this.props.common.userData.user.avatarUrl}></AtAvatar>
            </View>
            <AtButton>{this.props.common.userData.user.nickName}</AtButton>
          </View>
          :
          <AtButton onClick={this.goOtherPages.bind(this, "../login/index")}>登录</AtButton>
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
