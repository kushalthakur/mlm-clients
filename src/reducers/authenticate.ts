import {
   LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS
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
   data: IUserState,
   loading: boolean,
   error: null
}

const initialState: IAuthenticateState = {
   data: undefined!,
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