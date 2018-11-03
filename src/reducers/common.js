import { LOGIN } from '../constants/index'

const INITIAL_STATE = {
    userData: {},
    token: null
}

export default function common(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.data.token,
                userData: action.data
            }
        default:
            return state
    }
}
