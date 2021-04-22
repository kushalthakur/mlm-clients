import {
   GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE
} from '../constants'

export interface IMemberState {
   data: any
   loading: boolean
   error: null
}

const initialState: IMemberState = {
   data: undefined!,
   loading: false,
   error: null
}


export const members = (state = initialState, action: any) => {
   switch (action.type) {
      case GET_MEMBER_REQUEST:
         return { ...state, loading: true, error: null }
      case GET_MEMBER_SUCCESS:
         return { ...state, loading: false, data: action.payload, error: null }
      case GET_MEMBER_FAILURE:
         return { ...state, loading: false, error: action.payload }
      default:
         return state
   }
}