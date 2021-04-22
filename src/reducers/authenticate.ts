import { isEmpty } from 'lodash'
import {
   LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, CURRENT_USER
} from '../constants'

export interface IUserState {
   id: string
   name: string
   email: string
   phone: string
   password: string
   founderClubMember: number
   role: string
   status: number
   createdAt?: string
   updatedAt?: string
}
export interface IAuthenticateState {
   data: IUserState
   loading: boolean
   isAuthenticated: boolean
   error: null
}

const initialState: IAuthenticateState = {
   data: undefined!,
   loading: false,
   isAuthenticated: false,
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
      case CURRENT_USER:
         return { ...state, isAuthenticated: !isEmpty(action.user), user: action.user }
      default:
         return state
   }
}