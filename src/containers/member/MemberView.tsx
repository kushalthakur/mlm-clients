import React, { FC, ReactElement } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Container, Paper, Button, Grid } from '@material-ui/core'
import { History } from 'history'
import { memberStyles } from '../../_thems'
import { masterMembers } from '../../store/master.store'
import { IActionCreator } from '../../actions';
import { ApplicationState } from '../../reducers';
import { getMasterState } from '../../store/master/master.selector';
import { FormInput, ReduxValidation, AutoComplete, FormDatePicker } from '../../components/Forms';

interface DispatchProps {
   requestList: IActionCreator
}
interface StateProps {
   memberState: any
   initialValues?: any
   formValues?: any
}

interface OwnProps {
   history: History
}

type Props = DispatchProps & StateProps & OwnProps

const MemberView: FC<Props> = (props: Props): ReactElement => {
   const classes = memberStyles();
   const { requestList, memberState } = props
   React.useEffect(() => {
      requestList()
   }, [requestList])
   const back = () => {
      props.history.push('/members')
   }
   let sponsorOptions: Array<any> = memberState.list.map((item: any) => {
      return ({ label: item.sponsorId, value: item.sponsorId })
   })
   return (
      <Container component={Paper} maxWidth={"lg"}>
         <div className={classes.root}>
            <Button type="submit" variant="outlined" color="primary" onClick={back}>Back</Button>
            <Button variant="outlined" color="primary">Update</Button>
         </div>
         <Grid container spacing={3}>
            <Grid item xs={6}>
               <Field component={FormInput} variant="outlined" label="First Name" name="firstName" type="text" isEditable={true}
                  validate={[ReduxValidation.required]}
               />
               <Field component={FormInput} variant="outlined" label="Last Name" name="lastName" type="text" isEditable={true} />
               <Field component={FormInput} variant="outlined" label="Username" name="username" isEditable={true}
                  validate={[ReduxValidation.required]} />
               <Field component={FormInput} variant="outlined" label="Address" name="address" isEditable={true} />
               <Field component={AutoComplete} variant="outlined" label="Sponsor ID" name="sponsorId" options={sponsorOptions}
                  isEditable={true} validate={[ReduxValidation.required]}
               />
            </Grid>
            <Grid item xs={6}>
               <Field component={FormDatePicker} label="Date of Birth" name="dateOfBirth" type="text" dateFormat="dd/MM/yyyy" isEditable={true} />
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
      </Container>
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
   form: "MemberEditForm",
   onSubmit: (data: any, dispatch: any, props: any) => {
      console.log('data', data)
   }
})(MemberView))