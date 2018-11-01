import Taro, { Component } from '@tarojs/taro'
// import { View, Button, Text } from '@tarojs/components'
import { View,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'
import './index.scss'



class Mine extends Component {
  config = {
    navigationBarTitleText: '我的'
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  render() {
    return (
      <View className='mine'>
        <View  className='avatar-url' >
          <Image src={this.props.common.userData.avatarUrl}></Image>
        </View>
        <AtButton>{this.props.common.userData.nickName}</AtButton>
      </View>
    )
  }
}

export default connect(({ common }) => ({
  common
}), (dispatch) => ({
}))(Mine)
