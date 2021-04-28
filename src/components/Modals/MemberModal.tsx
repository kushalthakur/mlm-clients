import React, { FC, ReactElement, useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles, Button, Dialog, IconButton, Typography, Grid } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { CloseIcons } from '../ui';
import { FormInput, AutoComplete, CheckBox, ReduxValidation } from '../Forms'
import { ApplicationState } from '../../reducers';
import { masterMembers } from '../../store/master.store';
import { IActionCreator } from '../../actions';
import { getMasterState } from '../../store/master/master.selector';
import { styles, modalPosition } from '../../_thems'

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
               <CloseIcons />
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


interface DispatchProps {
   requestList: IActionCreator
}
interface StateProps {
   memberState: any
}
interface OwnProps {
   error: boolean
   handleSubmit: Function
   submitting: any
   pristine: any
   reset: Function
   hideModal: () => void
   onClose: () => void
   onSave: (data: any) => void
}

type Props = StateProps & DispatchProps & OwnProps

const MemberModal: FC<Props> = (props: Props): ReactElement => {
   const handleClose = () => {
      props.onClose()
   };
   const classes = modalPosition()
   const submitHandle = (e: any) => {
      e.preventDefault()
      props.handleSubmit()
   }
   const resetHandle = (e: any) => {
      e.preventDefault()
      props.reset()
   }
   const { requestList, memberState } = props
   useEffect(() => {
      requestList()
   }, [requestList])
   let dd = memberState.list.map((item: any) => {
      return ({ label: item.sponsorId, value: item.sponsorId })
   })
   console.log('sponsor id ', dd)
   const sponsorOptions: Array<any> = dd
   return (
      <div>
         <Dialog classes={{ paper: classes.dialog }} onClose={handleClose} aria-labelledby="customized-dialog-title" open={true} maxWidth="md">
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
               Add Member
            </DialogTitle>
            <DialogContent>
               <Grid container spacing={3}>
                  <Grid item xs={6}>
                     <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="First Name" name="firstName" type="text"
                        isEditable={true} validate={[ReduxValidation.required]}
                     />
                     <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Last Name" name="lastName" type="text"
                        isEditable={true} validate={[ReduxValidation.required]}
                     />
                     <Field component={AutoComplete} variant="outlined" margin="normal" fullWidth label="Sponsor ID" name="sponsorId"
                        options={sponsorOptions} isEditable={true} validate={[ReduxValidation.required]}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Email Address" name="email" type="email"
                        isEditable={true} validate={[ReduxValidation.required, ReduxValidation.email]}
                     />
                     <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Phone" name="phone" type="text"
                        isEditable={true} validate={[ReduxValidation.required, ReduxValidation.maxLength, ReduxValidation.number]}
                     />
                     <Field component={CheckBox} color="primary" label="FC Member" name="founderClubMember" isEditable={true} />
                  </Grid>
               </Grid>
            </DialogContent>
            <DialogActions>
               <Button type="submit" autoFocus variant="outlined" color="primary"
                  disabled={props.pristine || props.submitting} onClick={resetHandle}>Reset</Button>
               <Button type="submit" autoFocus variant="outlined" color="primary"
                  disabled={props.pristine || props.submitting} onClick={submitHandle}>Save</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}

const mapStateToProps = (state: ApplicationState): StateProps => {
   const memberState = getMasterState(state.members.manageMembers, undefined)
   return {
      memberState: memberState
   }
}
export default connect(mapStateToProps, {
   requestList: masterMembers.listMaster
})(reduxForm({
   form: "AddMemberForm",
   onSubmit: (data: any, dispatch: any, props: any) => {
      if (data) {
         data.founderClubMember = data.founderClubMember === true ? 1 : 0
      } else {
         data.founderClubMember = 0
      }
      console.log('data', data)
   }
})(MemberModal))