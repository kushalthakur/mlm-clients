import {
   LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS
} from '../constants'

interface IAuthenticateState {
   user: any,
   loading: boolean,
   error: any
}

const initialState: IAuthenticateState = {
   user: undefined,
   loading: false,
   error: null
}
export const authenticate = (state = initialState, action: any) => {
   switch (action.type) {
      case LOGIN_REQUEST:
         return { ...state, loading: true, error: null }
      case LOGIN_SUCCESS:
         return { ...state, loading: false, data: action.payload, error: null }
      case LOGIN_FAILURE:
         return { ...state, loading: false, error: action.payload }
      default:
         return state
   }
}