import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSegmentedControl, AtCard } from 'taro-ui'
// import { add, minus, asyncAdd, asyncAddText } from '../../actions/counter'
import { asyncRequset } from '../../actions/common'

import './index.scss'
// import searchPng from '../../asset/images/search.png'
// import lightingPng from '../../asset/images/lighting.png'
// import icon9 from '../../asset/images/icon9.jpeg'

class MyIndex extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super(...arguments)
    this.dataArr = []
    this.loading = false
    this.pages = 1
    this.state = {
      height: 0,
      current: 0,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.loading = false
  }
  updateList = async () => {
    if (this.loading) return
    this.loading = true
    this.pages = 1
    this.dataArr = []
    this.requestUrl(this.state.current)
  }

  requestUrl = (n, text = "刷新中。。。") => {
    let url = "AllArticle"
    let data = { page: this.pages }
    let token = Taro.getStorageSync("token")
    if (!token && n == 2) {
      Taro.showToast({ title: "请先登录", icon: 'none', duration: 2000 })
      this.loading = false
      return
    }
    if (n == 1) {
      data = { page: this.pages }
      url = "GetMostThunmbArticle"
    } else if (n == 2) {
      data = { token, page: this.pages }
      url = "jwt/MyArticle"
    }
    this.props.asyncRequset(text, data, url)
  }
  getMoreList = async (e) => {
    if (this.loading) return
    this.loading = true
    this.pages += e
    this.requestUrl(this.state.current, "加载更多。。。")

  }
  handleClick(value) {
    console.log(value, "---------handleClick--------------")
    this.dataArr = []
    this.pages = 1
    this.setState({
      current: value
    }, () => {
      this.updateList()
    })
  }
  componentDidMount() {
    let self = this
    Taro.getSystemInfo({
      success(res) {
        self.setState({
          height: res.windowHeight - 46
        })
      }
    })
    this.updateList()
  }
  addThumbs = (e) => {
    if (this.loading) return
    this.loading = true
    Taro.request({
      url: "http://127.0.0.1:8080/jwt/ThunmbToArticle",
      data: { "artId": e },
      mode: "cors",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "X-Auth-Token": Taro.getStorageSync("token") || ""
      }
    }).then(res => {
      if (res.data.code = "0") {
        Taro.showToast({ title: "点赞成功", icon: 'none', duration: 2000 })
      }
      this.loading = false
    })
  }
  render() {
    const { height } = this.state
    const { listData } = this.props.homePage
    this.dataArr = [...this.dataArr, ...listData]
    return (
      <View className="myIndex">
        <AtSegmentedControl
          values={['世界愿望', '点赞最多的愿望', '我的愿望']}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
        <View className='tab-content'
        >
          <ScrollView className='container'
            scrollY
            scrollWithAnimation
            scrollTop='0'
            lowerThreshold={10}
            upperThreshold={10}
            // style='height:100%;position: absolute;top: 44px;background: rgb(242, 226, 230);'
            style={{ 'height': height + "px", 'background': 'rgb(242, 226, 230)' }}
            onScrollToUpper={this.updateList}
            onScrollToLower={this.getMoreList.bind(this, 1)}
          >
            {!this.loading ?
              this.dataArr.map((v, i) => {
                return <AtCard
                  note={v.thunmbs}
                  extra={new Date(v.ctTime).getMinutes()}
                  title={v.name}
                  thumb={v.avatarUrl}
                  key={i}
                  onClick={this.addThumbs.bind(this, v.id)}
                >
                  {v.context}
                </AtCard>
              }) :
              // <View>暂无信息。。。。。</View>
              null
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default connect(({ counter, homePage, common }) => ({
  counter, homePage, common
}), (dispatch) => ({
  asyncRequset(text, data, url) {
    dispatch(asyncRequset(text, data, url))
  }
}))(MyIndex)