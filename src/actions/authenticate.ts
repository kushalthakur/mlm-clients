import {
   LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, CURRENT_USER
} from '../constants'

export const authenticate = (data = {}) => {
   return {
      types: [
         LOGIN_REQUEST,
         LOGIN_SUCCESS,
         LOGIN_FAILURE
      ],
      payload: {
         request: {
            url: "/login",
            method: 'POST',
            data
         }
      }
   }
}

export const currentUser = (user: string) => {
   return {
      type: CURRENT_USER,
      user
   }
}
