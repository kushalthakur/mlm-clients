import { ALERT_TYPE } from '../constants'


export const alerts = {
   success: (message: string) => {
      return { type: ALERT_TYPE.SUCCESS, message }
   },
   error: (message: string) => {
      return { type: ALERT_TYPE.ERROR, message }
   },
   clear: () => {
      return { type: ALERT_TYPE.CLEAR }
   }
}
