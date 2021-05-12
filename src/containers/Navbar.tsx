import React, { FC, ReactElement } from 'react';
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import { ExitToAppIcons, SearchIcons } from '../components/ui'
import { navbarStyles } from '../_thems'
import { Link } from 'react-router-dom';

interface Props {

}

const Navbar: FC<Props> = (props: Props): ReactElement => {
   const classes = navbarStyles();
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
               <div className={classes.search}>
                  <div className={classes.searchIcon}>
                     <SearchIcons />
                  </div>
                  <InputBase
                     placeholder="Search…"
                     classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                     }}
                     inputProps={{ 'aria-label': 'search' }}
                  />
               </div>
               <ExitToAppIcons />
            </Toolbar>
         </AppBar>
      </React.Fragment>
   );
}

export default Navbar