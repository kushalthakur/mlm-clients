import React, { FC, ReactElement } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles, Button, Dialog, IconButton, Typography, Grid } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { CloseIcons } from '../ui';
import { FormInput, AutoComplete, ReduxValidation, FormDatePicker } from '../Forms'
import { ApplicationState } from '../../reducers';
import { masterMembers } from '../../store/master.store';
import { IActionCreator } from '../../actions';
import { getMasterState } from '../../store/master/master.selector';
import { styles, modalPosition } from '../../_thems'
import Alerts from '../General/Alerts';
import { calculateAge } from '../../_helpers'
import { convertOptionsToValue } from '../../utils';

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
   reset: Function
   hideModal: () => void
   onClose: () => void
   onSave: (data: any) => void
   change: Function
}

type Props = StateProps & DispatchProps & OwnProps

const MemberModal: FC<Props> = (props: Props): ReactElement => {
   const classes = modalPosition()
   const [age, setAge] = React.useState(0)
   const { requestList, change, memberState } = props
   const handleClose = () => {
      props.onClose()
   };
   const submitHandle = (e: any) => {
      e.preventDefault()
      props.handleSubmit()
   }
   const resetHandle = (e: any) => {
      e.preventDefault()
      props.reset()
   }
   const handleChange = (value: any) => {
      setAge(calculateAge(value))
   }
   React.useEffect(() => {
      requestList()
   }, [requestList])
   React.useEffect(() => {
      change('age', age)
   }, [change, age])
   return (
      <div>
         <Dialog classes={{ paper: classes.dialog }} onClose={handleClose} aria-labelledby="customized-dialog-title" open={true} maxWidth="md">
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
               Add Member
            </DialogTitle>
            <DialogContent>
               <Alerts />
               <Grid container spacing={3}>
                  <Grid item xs={6}>
                     <Field component={FormInput} variant="outlined" label="First Name" name="firstName" type="text" isEditable={true}
                        validate={[ReduxValidation.required]}
                     />
                     <Field component={FormInput} variant="outlined" label="Last Name" name="lastName" type="text" isEditable={true} />
                     <Field component={FormInput} variant="outlined" label="Username" name="username" isEditable={true}
                        validate={[ReduxValidation.required]} />
                     <Field component={FormInput} variant="outlined" label="Address" name="address" isEditable={true} />
                     <Field component={AutoComplete} variant="outlined" label="Sponsor ID" name="sponsorId" options={convertOptionsToValue(memberState.list, 'sponsorId')}
                        isEditable={true} validate={[ReduxValidation.required]}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <Field component={FormDatePicker} label="Date of Birth" name="dateOfBirth" type="text" dateFormat="dd/MM/yyyy"
                        isEditable={true} maxDate={new Date()} onChange={handleChange} />
                     <Field component={FormInput} variant="outlined" label="Email Address" name="email" type="email" isEditable={true}
                        validate={[ReduxValidation.email]}
                     />
                     <Field component={FormInput} variant="outlined" label="Phone" name="phone" type="text" isEditable={true}
                        validate={[ReduxValidation.maxLength, ReduxValidation.number]}
                     />
                     <Field component={FormInput} variant="outlined" disabled label="Age" name="age" type="text" isEditable={true}
                        validate={[ReduxValidation.number]}
                     />
                  </Grid>
               </Grid>
            </DialogContent>
            <DialogActions>
               <Button type="submit" autoFocus variant="outlined" color="primary" onClick={resetHandle}>Reset</Button>
               <Button type="submit" autoFocus variant="outlined" color="primary" onClick={submitHandle}>Save</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}

const mapStateToProps = (state: ApplicationState): StateProps => {
   return {
      memberState: getMasterState(state.members.manageMembers, undefined)
   }
}
export default connect(mapStateToProps, {
   requestList: masterMembers.listMaster
})(reduxForm({
   form: "AddMemberForm",
   onSubmit: (data: any, dispatch: any, props: any) => {
      props.onSave(data)
   }
})(MemberModal))