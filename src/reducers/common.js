import { LOADING, LOGIN } from '../constants/index'

const INITIAL_STATE = {
    loading: false,
    userData: {}
}

export default function common(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case LOGIN:
            return {
                ...state,
                userData: action.data
            }
        default:
            return state
    }
}
