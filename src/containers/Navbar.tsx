import React, { FC, ReactElement } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { confirmAlert } from 'react-confirm-alert'
import { History } from 'history'
import { ExitToAppIcons } from '../components/ui'
import { navbarStyles } from '../_thems'
import { Link } from 'react-router-dom'
import { removeToken } from '../store/selectors'

interface Props {
   history: History
}

const Navbar: FC<Props> = (props: Props): ReactElement => {
   const classes = navbarStyles();
   const handleLogout = () => {
      confirmAlert({
         message: 'Are you sure you want to Logout?',
         buttons: [
            {
               label: 'Yes',
               onClick: () => {
                  removeToken()
                  setTimeout(() => {
                     props.history.push("/")
                  }, 100)
               }
            },
            {
               label: 'No',
               onClick: () => { }
            }
         ],
         closeOnClickOutside: false
      })
   }
   return (
      <React.Fragment>
         <AppBar position="static" style={{ backgroundColor: "#1fa3d8" }}>
            <Toolbar>
               <Typography variant="h6" className={classes.title}>
                  <Link to="/tree" className={classes.buttonColor}>
                     mlm
                  </Link>
               </Typography>
               <div className={classes.root}>
                  <Link to="/tree" color="inherit" className={classes.buttonColor}>Tree</Link>
                  <Link to="/members" color="inherit" className={classes.buttonColor}>Member</Link>
               </div>
               <ExitToAppIcons onClick={handleLogout} />
            </Toolbar>
         </AppBar>
      </React.Fragment>
   );
}

export default Navbar