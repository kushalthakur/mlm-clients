import { SHOW_MODAL, HIDE_MODAL } from '../constants'

export interface IModalState {
   name: string
   modalProps: any
}

const initialState: IModalState = {
   name: "",
   modalProps: undefined
}

export const modal = (state = initialState, action: any) => {
   switch (action.type) {
      case SHOW_MODAL:
         return Object.assign({}, state, action.payload)
      case HIDE_MODAL:
         return Object.assign({})
      default:
         return state
   }
}