import { SHOW_MODAL, HIDE_MODAL } from '../constants'

export const showModal = (name: string, modalProps: any) => {
   return {
      type: SHOW_MODAL,
      payload: { name, modalProps }
   }
}

export const hideModal = () => {
   return {
      type: HIDE_MODAL
   }
}