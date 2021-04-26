import React, { FC, ReactElement } from 'react'
import { Field, reduxForm } from 'redux-form'
// import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles'
import { createStyles, Theme, withStyles, WithStyles, makeStyles, Button, Dialog, IconButton, Typography, Grid } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { FormInput, ReduxValidation } from '../Forms'

const styles = (theme: Theme) => createStyles({
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

export interface DialogTitleProps extends WithStyles<typeof styles> {
   id: string;
   children: React.ReactNode;
   onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
   const { children, classes, onClose, ...other } = props;
   return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
         <Typography variant="h6">{children}</Typography>
         {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
               <CloseIcon />
            </IconButton>
         ) : null}
      </MuiDialogTitle>
   );
});

const DialogContent = withStyles((theme: Theme) => ({
   root: {
      padding: theme.spacing(2),
   },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
   root: {
      margin: 0,
      padding: theme.spacing(1),
   },
}))(MuiDialogActions);

interface Props {
   onClose: Function
}
const styles2 = makeStyles((theme: Theme) => createStyles({
   dialog: {
      position: 'absolute',
      top: 50
   }
}));

const MemberModal: FC<Props> = (props: Props): ReactElement => {
   const handleClose = () => {
      props.onClose()
   };
   const classes = styles2()
   return (
      <div>
         <Dialog classes={{ paper: classes.dialog }} onClose={handleClose} aria-labelledby="customized-dialog-title" open={true} maxWidth="md">
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
               Add Member
            </DialogTitle>
            <DialogContent>
               <Grid container spacing={3}>
                  <Grid item xs={6}>
                     <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Email Address" name="email" type="email"
                        isEditable={true} validate={[ReduxValidation.required]}
                     />
                     <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Sponsor Id" name="sponsorId" type="text"
                        isEditable={true} validate={[ReduxValidation.required]}
                     />
                     <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Member Id" name="memberId" type="text"
                        isEditable={true} validate={[ReduxValidation.required]}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Name" name="name" type="text"
                        isEditable={true} validate={[ReduxValidation.required]}
                     />
                     <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Phone" name="phone" type="text"
                        isEditable={true} validate={[ReduxValidation.required]}
                     />
                     <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="City" name="city" type="text"
                        isEditable={true} validate={[ReduxValidation.required]}
                     />
                  </Grid>
               </Grid>
            </DialogContent>
            <DialogActions>
               <Button autoFocus onClick={handleClose} variant="outlined" color="primary">Save</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}

const AddMemberForm = reduxForm({
   form: "AddMemberForm",
   onSubmit: (data: any, dispatch: any, props: Props) => {
      console.log('data', data)
   }
})(MemberModal)

export default AddMemberForm