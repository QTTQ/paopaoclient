import {
  GETLISTDATA, LOGIN
} from '../constants/index'
import Taro from '@tarojs/taro'

export const requset = (data) => {
  return {
    type: GETLISTDATA,
    data
  }
}
// 异步的action
// const baseUrl = 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
const baseUrl = "http://127.0.0.1:8080/"
export const asyncRequset = (text, data = {}, url = "") => {
  Taro.showLoading({ title: text })
  console.log(text, url, data, "==========pages-------")
  return dispatch => {
    Taro.request({
      url: baseUrl + url,
      data: data,
      mode: "cors",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "X-Auth-Token": data.token || ""
      }
    }).then(res => {
      Taro.hideLoading()
      if (res.data.code == "1") {
        Taro.showToast({ title: res.data.msg, icon: 'none', duration: 2000 })
      }
      if (res.data.code == "0") {
        if (res.data.data.token) {
          res.data.data.msg = res.data.msg
          Taro.setStorageSync("token", res.data.data.token)
          // wx.setStorage({
          //   key: "token",
          //   data: res.data.data.token,
          //   success: function () {
          //     console.log('写入value1成功')
          //     console.log(Taro.getStorageSync("token"), "----------ttttttttttt");
          //   },
          //   fail: function () {
          //     console.log('写入value1发生错误')
          //   }
          // })
          if (data.avatarUrl) {
            res.data.data.user = data
          }
          dispatch(userLogin(res.data.data))
        } else {
          dispatch(requset(res.data.data))
        }
      }
    })
  }
}


//登录----
export const userLogin = (data) => {
  return {
    type: LOGIN,
    data
  }
}



