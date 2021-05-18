import { GET_TREE_REQUEST, GET_TREE_SUCCESS, GET_TREE_FAILURE } from '../constants'

export interface ITreeState {
   data: any
   loading: boolean
   error: null
}

const initialState: ITreeState = {
   data: undefined!,
   loading: false,
   error: null
}


export const tree = (state = initialState, action: any) => {
   switch (action.type) {
      case GET_TREE_REQUEST:
         return { ...state, loading: true, error: null }
      case GET_TREE_SUCCESS:
         return { ...state, loading: false, data: action.payload, error: null }
      case GET_TREE_FAILURE:
         return { ...state, loading: false, error: action.payload }
      default:
         return state
   }
}