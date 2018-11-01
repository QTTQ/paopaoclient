import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSegmentedControl, AtCard } from 'taro-ui'
// import { add, minus, asyncAdd, asyncAddText } from '../../actions/counter'
import { loading, asyncRequset } from '../../actions/common'
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
    this.did = false
    this.state = {
      height: 0,
      current: 0,
      pages: 1,
      dataArr: []
    }
  }
  componentWillReceiveProps(nextProps) {
  }
  updateList = async () => {
    this.tokenSign = true
    if (this.props.common.loading) return
    this.setState({
      pages: 1
    }, () => {
      this.requestUrl(this.state.current)
    })
  }

  requestUrl = (n, text = "刷新中。。。") => {
    let url = "AllArticle"
    this.tokenSign = true
    if (this.props.common.loading) return
    let data = { page: this.state.pages }
    if (!this.props.common.userData.token && n == 2) {
      Taro.showToast({ title: "请先登录", icon: 'none', duration: 2000 })
      this.tokenSign = false
      return
    }
    let token = this.props.common.userData.token
    if (n == 1) {
      data = { page: this.state.pages }
      url = "GetMostThunmbArticle"
    } else if (n == 2) {
      data = { token, page: this.state.pages }
      url = "jwt/MyArticle"
    }
    this.props.asyncRequset(text, data, url)
  }
  getMoreList = async (e) => {
    console.log("---------getMoreList--------------")
    if (this.props.common.loading) return
    this.setState({
      pages: this.state.pages + e
    }, () => {
      this.requestUrl(this.state.current, "加载更多。。。")
    })
  }
  handleClick(value) {
    console.log("---------handleClick--------------")
    this.setState({
      current: value,
      pages: 1
    }, () => {
      this.did = false
      this.dataArr = []
      this.requestUrl(value)
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

  render() {
    const { height } = this.state
    const { listData } = this.props.homePage
    const { loading } = this.props.common
    const retViewFn = (loading, listData) => {
      this.dataArr = [...this.dataArr, ...listData]
      this.did = true
      console.log("------------render------------------");
      return !loading ? this.tokenSign || this.state.current == 0 ?
        this.dataArr.map((v, i) => {
          return <AtCard
            note={v.thunmbs}
            extra={new Date(v.ctTime).getFullYear()}
            title={v.name}
            thumb={v.actor}
          >
            {v.context}
          </AtCard>
        }) : null : <View>暂无信息。。。。。</View>
    }
    return (
      <View className="myIndex">
        <AtSegmentedControl
          values={['世界愿望', '点赞最多的愿望', '我的愿望']}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
        <View className='tab-content'>
          <ScrollView className='container'
            scrollY
            scrollWithAnimation
            scrollTop='0'
            lowerThreshold="10"
            upperThreshold="10"
            // style='height:100%;position: absolute;top: 44px;background: rgb(242, 226, 230);'
            style={{ 'height': height + "px", 'background': 'rgb(242, 226, 230)' }}
            onScrollToUpper={this.updateList}
            onScrollToLower={this.getMoreList.bind(this, 1)}
          >
           {
                 retViewFn(loading, listData)
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
  },
  loading() {
    dispatch(loading())
  }
}))(MyIndex)