import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const memberStyles = makeStyles((theme: Theme) =>
   createStyles({
      table: {
         minWidth: 500
      },
      root: {
         '& > *': {
            margin: theme.spacing(0.4)
         },
         marginTop: "10px",
         marginBottom: "10px",
         textAlign: 'right'
      }
   }))

export const containerStyle = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         marginTop: '10px',
         padding: "15px",
         maxWidth: 1600
      }
   }));

/**
 *
 * Member modal css
*/
export const styles = (theme: Theme) => createStyles({
   root: {
      margin: 0,
      padding: theme.spacing(2),
   },
   closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
   },
});

export const modalPosition = makeStyles((theme: Theme) =>
   createStyles({
      dialog: {
         position: 'absolute',
         top: 50
      }
   }));

