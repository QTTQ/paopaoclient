


import Taro, { Component } from '@tarojs/taro'
import { View, Image , Video } from '@tarojs/components'
import { AtRadio, AtInput, AtTextarea, AtButton} from 'taro-ui'
import { connect } from '@tarojs/redux'

import { } from '../../actions/counter'
import { onAsyncRequset } from '../../actions/common'

import './index.scss'

import icon9 from '../../asset/images/icon9.jpeg'


class Additional extends Component {

  config = {
    navigationBarTitleText: '添加'
  }
  constructor() {
    super(...arguments)
    this.loading = false
    this.state = {
      value: 'wz',
      title: "",
      context: "",
      paths: [],
      size: 0
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
    this.loading = false
  }
  componentDidMount() {
    let url = "../login/index"
    if (!Taro.getStorageSync("token")) {
      Taro.showToast({ title: "请先登录", icon: 'none', duration: 2000 })
      setTimeout(() => {
        Taro.redirectTo({ url })
      }, 2000)
    }
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  handleChange(value) {
    console.log(value, "------");
    this.setState({
      paths: [],
      value
    })
  }
  handleChangeTitle(value) {
    console.log(value, "------");
    this.setState({
      title: value
    })
  }
  handleChangeContent(value) {
    console.log(value, "------");
    this.setState({
      context: value.detail.value
    })
  }
  onSubmit(event) {
    console.log(event)
  }
  onReset(event) {
    console.log(event)
  }
  handleUpload = () => {
    const { paths, title, context } = this.state
    if (this.loading) return
    let data = { title, context, paths, token: Taro.getStorageSync("token") }
    // let data={title,context,token:Taro.getStorageSync("token")}
    let filePath = paths[0]
    console.log(this.state.value, "====value----------------");
    if (this.state.value == "ws") {
      filePath = paths
    } else if (this.state.value == "wt") {
      filePath = paths[0]
    } else {
      this.props.onAsyncRequset("上传中。。。", data, "jwt/CreatArticle")
      return
    }
    Taro.uploadFile({
      url: 'http://127.0.0.1:1:8080/jwt/CreatArticle', //仅为示例，非真实的接口地址
      filePath: filePath,
      name: 'file',
      formData: {
        title, context
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'multipart/form-data',
        "X-Auth-Token": Taro.getStorageSync("token") || ""
      },
      success(res) {
        const data = res.data
        console.log(data, "==============================");
        //do something
      },
      fail(err) {
        console.log(err, "=============err=================");
      }
    })
  }
  uploadSometing = () => {
    const { value } = this.state
    let self = this
    if (value == "wt") {
      Taro.chooseImage({
        success(res) {
          let tempFilePaths = res.tempFilePaths
          self.setState({
            paths: tempFilePaths
          })
        }
      })
    } else if (value == "ws") {
      Taro.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          console.log(res.tempFilePath)
          self.setState({
            paths: res.tempFilePath,
            size: (res.size / (1024 * 1024)).toFixed(2) //当前视频 有多少 m
          })
        }
      })
    } else {
      return
    }
  }
  render() {
    const { value, paths, size } = this.state
    return (
      <View className='additional' >
        <AtInput
          name='value1'
          title='主题'
          type='text'
          placeholder='单行文本'
          value={this.state.title}
          onChange={this.handleChangeTitle.bind(this)}
        />
        <AtTextarea
          value={this.state.context}
          onChange={this.handleChangeContent.bind(this)}
          maxlength='200'
          placeholder='内容'
        />
        <AtRadio
          options={
            [
              { label: '仅上传文字', value: 'wz' },
              { label: '上传文字&图片', value: 'wt' },
              { label: '上传文字&视频', value: 'ws' }
            ]}
          value={this.state.value}
          onClick={this.handleChange.bind(this)}
        />
        {paths.length != 0 ? value == "wt" ?
          paths.map((v, i) => {
            return <Image
              style='width: 300px;height: 100px;background: #fff;'
              src={v}
              key={i}
            />
          })
          :
          <View>
            <Video
              src={paths[0]}
              // controls={true}
              autoplay={false}
              poster={icon9}
              initialTime='0'
              id='video'
              loop={false}
              muted={false}
            />
            <View>{size}M</View>
          </View>
          : null}
        {value != "wz" ?
          <AtButton type='primary' onClick={this.uploadSometing.bind(this)}>上传{value == "wt" ? "图片" : value == "ws" ? "视频" : null}按钮</AtButton>
          : null}
        <AtButton type='primary' onClick={this.handleUpload.bind(this)}>
          上传
        </AtButton>
      </View>
    )
  }
}


export default connect(({ counter, homePage, common }) => ({
  counter, homePage, common
}), (dispatch) => ({
  onAsyncRequset(text, data, url) {
    dispatch(onAsyncRequset(text, data, url))
  }
}))(Additional)
