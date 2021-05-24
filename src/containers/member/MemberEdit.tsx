import React, { FC, ReactElement } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Container, Paper, Button, Grid } from '@material-ui/core'
import { History } from 'history'
import { memberStyles } from '../../_thems'
import { masterMembers } from '../../store/master.store'
import { IActionCreator } from '../../actions';
import { ApplicationState } from '../../reducers';
import { getMasterState } from '../../store/master/master.selector';
import { FormInput, ReduxValidation, AutoComplete, FormDatePicker } from '../../components/Forms';
import { convertOptionsToValue } from '../../utils'
import { calculateAge } from '../../_helpers'

interface DispatchProps {
   requestList: IActionCreator
   requestMember: IActionCreator
}
interface StateProps {
   memberState: any
   initialValues?: any
   formValues?: any
}

interface OwnProps {
   history: History
   match: any
   change: Function
   handleSubmit: Function
}

type Props = DispatchProps & StateProps & OwnProps

const MemberEdit: FC<Props> = (props: Props): ReactElement => {
   const classes = memberStyles();
   const [ages, setAge] = React.useState(0)
   const [isEditable, setIsEditable] = React.useState(false)
   const { memberId } = props.match.params
   const { requestList, requestMember, memberState, change } = props
   const handleChange = (value: any) => {
      setAge(calculateAge(value))
   }
   const back = () => {
      props.history.push('/members')
   }
   const handleOnEditable = () => {
      setIsEditable(!isEditable)
   }
   const submitHandle = () => {
      props.handleSubmit()
   }
   React.useEffect(() => {
      requestList()
      requestMember({ urlParams: { memberId } })
   }, [requestList, requestMember, memberId])
   let age = props.initialValues && props.initialValues.age !== undefined && props.initialValues.age
   React.useEffect(() => {
      change('age', ages || age)
   }, [change, ages, age])
   return (
      <Container component={Paper} maxWidth={"lg"}>
         <div className={classes.root}>
            <Button type="submit" variant="outlined" color="primary" onClick={back}>Back</Button>
            {isEditable && <Button variant="outlined" color="primary" onClick={submitHandle}>Update</Button>}
            <Button type="submit" variant="outlined" color="primary" onClick={handleOnEditable}>{isEditable ? 'Cancel' : 'Edit'}</Button>
         </div>
         <Grid container spacing={3}>
            <Grid item xs={6}>
               <Field component={FormInput} variant="outlined" label="First Name" name="firstName" type="text" isEditable={isEditable}
                  validate={[ReduxValidation.required]}
               />
               <Field component={FormInput} variant="outlined" label="Last Name" name="lastName" type="text" isEditable={isEditable} />
               <Field component={FormInput} variant="outlined" label="Username" name="username" isEditable={isEditable}
                  validate={[ReduxValidation.required]} />
               <Field component={FormInput} variant="outlined" label="Address" name="address" isEditable={isEditable} />
               <Field component={AutoComplete} variant="outlined" label="Sponsor ID" name="sponsorId" isEditable={isEditable}
                  options={convertOptionsToValue(memberState.list, 'sponsorId')} validate={[ReduxValidation.required]}
               />
            </Grid>
            <Grid item xs={6}>
               <Field component={FormDatePicker} label="Date of Birth" name="dateOfBirth" type="text" dateFormat="dd/MM/yyyy" isEditable={isEditable}
                  maxDate={new Date()} onChange={handleChange} />
               <Field component={FormInput} variant="outlined" label="Email Address" name="email" type="email" isEditable={isEditable}
                  validate={[ReduxValidation.email]}
               />
               <Field component={FormInput} variant="outlined" label="Phone" name="phone" type="text" isEditable={isEditable}
                  validate={[ReduxValidation.maxLength, ReduxValidation.number]}
               />
               <Field component={FormInput} variant="outlined" disabled label="Age" name="age" type="text" isEditable={isEditable}
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
      memberState: memberState,
      formValues: getFormValues('MemberEditForm')(state) || {},
      initialValues: memberState.data
   }
}
export default connect(mapStateToProps, {
   requestMember: masterMembers.requestMaster,
   requestList: masterMembers.listMaster
})(reduxForm({
   form: "MemberEditForm",
   enableReinitialize: true,
   onSubmit: (data: any, dispatch: any, props: any) => {
      console.log('data', data)
   }
})(MemberEdit))