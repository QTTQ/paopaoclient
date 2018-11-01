import { GETLISTDATA } from '../constants/index'

const INITIAL_STATE = {
  listData: []
}

export default function homePage(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GETLISTDATA:
      return {
        ...state,
        listData: action.data.data
      }
    default:
      return state
  }
}
