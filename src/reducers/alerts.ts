import { ALERT_TYPE } from '../constants'


export interface IAlertState {
   message: string,
   type: string,
   visible: boolean
}

const initialState: IAlertState = {
   message: "",
   type: "",
   visible: false
}

export const alerts = (state = initialState, action: any) => {
   switch (action.type) {
      case ALERT_TYPE.SUCCESS:
         return { ...state, type: 'alert-success', message: action.message, visible: true }
      case ALERT_TYPE.ERROR:
         return { ...state, type: 'alert-danger', message: action.message, visible: true }
      case ALERT_TYPE.CLEAR:
         return initialState
      default:
         return state
   }
}