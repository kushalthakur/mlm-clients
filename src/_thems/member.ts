import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const memberStyles = makeStyles((theme: Theme) =>
   createStyles({
      table: {
         minWidth: 500
      },
      root: {
         '& > *': {
            margin: theme.spacing(1)
         },
         textAlign: 'right'
      }
   }))