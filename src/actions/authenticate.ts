import {
   LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
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
            url: `/`,
            method: 'POST',
            data
         }
      }
   }
}
