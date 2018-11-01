import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'

// import { connect } from '@tarojs/redux'
// import { add, minus, asyncAdd } from '../../actions/counter'


import more from '../../asset/images/more.png'

import './index.scss'



class List extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  goOtherPages = (url) => {
    Taro.navigateTo({ url: url })
  }
  componentWillUnmount() { }
  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='list-wrap'>
        {/* //header */}
        <View className='list-header'>
          <View className='header-img'>
            <Image src={this.props.feed_source_img}></Image>
          </View>
          <View className='header-name'>
            <Text>{this.props.feed_source_name}</Text>
          </View>
          <View className='header-more'>
            <Image src={more}></Image>
          </View>
        </View>
        {/* //body */}
        <View className='list-body' onClick={this.goOtherPages.bind(this, `/pages/indexDrticleDetails/index?question_id=${this.props.question_id}`)}>
          <View className='body-title'>
            <Text>{this.props.question}</Text>
          </View>
          <View className='body-content'>
            <Text>{this.props.answer_ctnt}</Text>
          </View>
        </View>
        {/* //footer */}
        <View className='list-footer'>
          <View className='footer-agree'>
            <Text>{this.props.argeen_num}个赞同</Text>
          </View>
          <View className='footer-comment'>
            <Text>{this.props.comment_num}评论</Text>
          </View>
          <View className='footer-follow'>
            <Text>关注问题</Text>
          </View>
          <View className='footer-empty'>
          </View>
        </View>
      </View >
    )
  }
}
export default List
// export default connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   add() {
//     dispatch(add())
//   },
//   asyncAdd() {
//     dispatch(asyncAdd())
//   }
// }))(List)
