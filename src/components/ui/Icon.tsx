import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PersonIcon from '@material-ui/icons/Person'
import PermIdentitySharpIcon from '@material-ui/icons/PermIdentitySharp'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';

export const EditIcons = (props: any) => {
   return (
      <React.Fragment>
         <EditIcon {...props} style={{ cursor: "pointer" }} />
      </React.Fragment>
   )
}
export const LockOutlined = (props: any) => {
   return (
      <React.Fragment>
         <LockOutlinedIcon {...props} style={{ cursor: "pointer" }} />
      </React.Fragment>
   )
}
export const PersonIcons = (props: any) => {
   return (
      <React.Fragment>
         <PersonIcon {...props} style={{ cursor: "pointer" }} />
      </React.Fragment>
   )
}
export const PermIdentitySharpIcons = (props: any) => {
   return (
      <React.Fragment>
         <PermIdentitySharpIcon {...props} style={{ cursor: "pointer" }} />
      </React.Fragment>
   )
}
export const SearchIcons = (props: any) => {
   return (
      <React.Fragment>
         <SearchIcon {...props} style={{ cursor: "pointer" }} />
      </React.Fragment>
   )
}
export const ExitToAppIcons = (props: any) => {
   return (
      <React.Fragment>
         <ExitToAppIcon {...props} style={{ cursor: "pointer", margin: "20px" }} />
      </React.Fragment>
   )
}