import {
  ADD,
  MINUS,
  ADDTEXT
} from '../constants/index'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}
export const changeText = (num) => {
  return {
    type: ADDTEXT,
    num
  }
}


// 异步的action
export function asyncAdd() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
// 异步的action
export function asyncAddText(num) {
  return dispatch => {
    setTimeout(() => {
      dispatch(changeText(num))
    }, 2000)
  }
}
