import {
   GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE
} from '../constants'

export const getMembers = () => {
   return {
      types: [
         GET_MEMBER_REQUEST,
         GET_MEMBER_SUCCESS,
         GET_MEMBER_FAILURE
      ],
      payload: {
         request: {
            url: "/tree",
            method: 'GET'
         }
      }
   }
}

