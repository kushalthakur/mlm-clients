import { Alert } from '@material-ui/lab'

export const DangerAlert = (props: any) => {
   return (
      <Alert
         variant="outlined"
         style={{ width: "100%" }}
         severity={props.type}
      // onClose={() => { }}
      >
         {props.message}
      </Alert>
   )
}