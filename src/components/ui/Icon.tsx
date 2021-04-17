import React from 'react'
import EditIcon from '@material-ui/icons/Edit'

export const Icon = (props: any) => {
   return (
      <React.Fragment>
         <EditIcon {...props} style={{ cursor: "pointer" }} />
      </React.Fragment>
   )
}

