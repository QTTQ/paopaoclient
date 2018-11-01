import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd,asyncAddText } from '../../actions/counter'

import './index.scss'



class Additional extends Component {

    config = {
    navigationBarTitleText: '添加'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <Button className='dec_btn' onClick={this.props.asyncAddText.bind(this,1)}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>{this.props.counter.numObj.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  },
  asyncAddText (num) {
    dispatch(asyncAddText(num))
  }
}))(Additional)
