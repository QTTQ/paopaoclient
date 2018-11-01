import {
  LOADING, GETLISTDATA, LOGIN
} from '../constants/index'
import Taro from '@tarojs/taro'

export const loading = () => {
  return {
    type: LOADING
  }
}
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
  console.log(text,url,data,"==========pages-------")
  return dispatch => {
    dispatch(loading())
    Taro.request({
      url: baseUrl + url,
      data: data,
      mode: "cors",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data.code == "0") {
        dispatch(loading())
        Taro.hideLoading()
        if (res.data.data.token) {
          res.data.data.msg = res.data.msg
          dispatch(userLogin1(res.data.data))
        }
        dispatch(requset(res.data.data))
      }
    })
  }
}



// 异步的生成Token 
export const userLogin = (data) => {
  Taro.showLoading({ title: "加载中" })
  return dispatch => {
    setTimeout(() => {
      Taro.hideLoading()
      dispatch(userLogin1(data))
    }, 0)
  }
}
//登录----
export const userLogin1 = (data) => {
  return {
    type: LOGIN,
    data
  }
}



