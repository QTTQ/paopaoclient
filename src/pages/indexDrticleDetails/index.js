import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { onAsyncRequset } from '../../actions/common'


import './index.scss'

import img2 from '../../asset/images/good-bad.png'
import img3 from '../../asset/images/flag.png'
import img4 from '../../asset/images/heart2.png'
import img5 from '../../asset/images/star2.png'
import img6 from '../../asset/images/comment.png'
import img7 from '../../asset/images/icon1.jpeg'


class IndexDrticleDetails extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      content: ""
    }
  }
  config = {
    navigationBarTitleText: '文章'
  }
  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   content: this.props.homePage.listData[this.$router.params.question_id].answer_ctnt
    // })
  }

  async componentDidMount() {
    await this.getListDetails(this.$router.params.question_id)
    setTimeout(() => {
      this.setState({
        content: this.props.homePage.listData[2].answer_ctnt
      })
    }, 2000)
  }
  getListDetails = async () => {
    if (this.loading) return
    this.props.onAsyncRequset('刷新中')
  }
  render() {
    const { content } = this.state
    return (
      <View className='indexDrticleDetails'>
        <View className='details-title'>
          <View className='title-text'>
            <Text>宣和阿三倒萨大大萨达萨达马达实打实大苏打大苏打父亲为旗号为全国</Text>
          </View>
        </View>
        <View className='details-header'>
          <View className='header-img'>
            <Image src={img7}></Image>
          </View>
          <View className='header-name'>heheh</View>
          <View className='header-follow'>+关注</View>
        </View>
        {content == "" ? "骚年 你被骗了" : content}
      </View>
    )
  }
}

export default connect(({ common, homePage }) => ({
  common, homePage
}), (dispatch) => ({
  onAsyncRequset(text) {
    dispatch(onAsyncRequset(text))
  }
}))(IndexDrticleDetails)