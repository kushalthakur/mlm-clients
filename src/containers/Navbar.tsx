import React from 'react';
import { createStyles, makeStyles, Theme, AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         '& > *': {
            margin: theme.spacing(1)
         },
         textAlign: 'left'
      },
      menuButton: {
         marginRight: theme.spacing(2),
      },
      title: {
         flexGrow: 1,
      },
   }),
);

export default function Navbar() {
   const classes = useStyles();
   return (
      <div>
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" className={classes.title}>
                  mlm
               </Typography>
               <div className={classes.root}>
                  <Button color="inherit">Default</Button>
                  <Button color="inherit">Secondary</Button>
                  <Button color="inherit">Disabled</Button>
                  <Button color="inherit">Link</Button>
               </div>
               <Button color="inherit">Logout</Button>
            </Toolbar>
         </AppBar>
      </div>
   );
}
