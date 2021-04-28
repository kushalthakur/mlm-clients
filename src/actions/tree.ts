import {
   GET_TREE_REQUEST, GET_TREE_SUCCESS, GET_TREE_FAILURE
} from '../constants'

export const getTree = () => {
   return {
      types: [
         GET_TREE_REQUEST,
         GET_TREE_SUCCESS,
         GET_TREE_FAILURE
      ],
      payload: {
         request: {
            url: "/tree",
            method: 'GET'
         }
      }
   }
}

