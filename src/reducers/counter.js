import { ADD, MINUS, ADDTEXT } from '../constants/index'

const INITIAL_STATE = {
  num: 0,
  numObj: {
    num: 0
  }
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      }
    case ADDTEXT:
      return {
        ...state,
        // numObj: Object.assign({}, { num: state.numObj.num + action.num })
        numObj: { num: state.numObj.num + action.num }
      }
    default:
      return state
  }
}
