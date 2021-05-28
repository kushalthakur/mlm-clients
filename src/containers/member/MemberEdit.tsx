import React, { FC, ReactElement } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Container, Paper, Button, Grid } from '@material-ui/core'
import { History } from 'history'
import { memberStyles, containerStyle } from '../../_thems'
import { masterMembers } from '../../store/master.store'
import { ApplicationState } from '../../reducers';
import { getMasterState } from '../../store/master/master.selector';
import { FormInput, ReduxValidation, AutoComplete, FormDatePicker } from '../../components/Forms';
import { convertOptionsToValue } from '../../utils'
import { calculateAge } from '../../_helpers'
import Alerts from '../../components/General/Alerts';
import { IMasterApiState } from '../../store/master';

interface Props {
   history: History
   match: any
   change: Function
   handleSubmit: Function
   initialValues: any
}

const MemberEdit: FC<Props> = (props: Props): ReactElement => {
   const classes = memberStyles();
   const containerCss = containerStyle()
   const [ages, setAge] = React.useState(0)
   const [isEditable, setIsEditable] = React.useState(false)
   const { memberId } = props.match.params
   const { change, initialValues } = props
   const memberState = useSelector((state: ApplicationState): IMasterApiState => getMasterState(state.members.manageMembers, undefined))
   const dispatch = useDispatch()
   let initialAge = initialValues && initialValues.age !== undefined && initialValues.age

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
      dispatch(masterMembers.listMaster())
      dispatch(masterMembers.requestMaster({ urlParams: { memberId } }))
   }, [dispatch, memberId])
   React.useEffect(() => {
      change('age', ages || initialAge)
   }, [change, ages, initialAge])
   return (
      <Container component={Paper} maxWidth={"lg"} className={containerCss.root}>
         <div className={classes.root}>
            <Alerts />
         </div>
         <Grid container className="space-above-below">
            <Grid item xs>
               <Button type="submit" variant="contained" color="primary" onClick={back}>Back</Button>
            </Grid>
            <Grid item>
               <Button type="submit" variant="contained" color={isEditable ? 'secondary' : 'primary'} onClick={handleOnEditable}>{isEditable ? 'Cancel' : 'Edit'}</Button> {' '}
               {isEditable && <Button variant="contained" color="primary" onClick={submitHandle}>Update</Button>}
            </Grid>
         </Grid>
         <br />
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
         <br />
         <Grid container className="space-above-below">
            <Grid item xs>
               <Button type="submit" variant="contained" color="primary" onClick={back}>Back</Button>
            </Grid>
            <Grid item>
               <Button type="submit" variant="contained" color={isEditable ? 'secondary' : 'primary'} onClick={handleOnEditable}>{isEditable ? 'Cancel' : 'Edit'}</Button> {' '}
               {isEditable && <Button variant="contained" color="primary" onClick={submitHandle}>Update</Button>}
            </Grid>
         </Grid>
      </Container>
   );
}

const mapStateToProps = (state: ApplicationState) => {
   return {
      initialValues: getMasterState(state.members.manageMembers, undefined).data
   }
}

export default connect(mapStateToProps, null)(reduxForm({
   form: "MemberEditForm",
   enableReinitialize: true,
   onSubmit: (data: any, dispatch: any, props: any) => {
      let body = {
         id: data && data.id,
         firstName: data && data.firstName,
         lastName: data && data.lastName,
         username: data && data.username,
         email: data && data.email,
         phone: data && data.phone,
         address: data && data.address,
         age: data && data.age,
         dateOfBirth: data && data.dateOfBirth
      }
      dispatch(masterMembers.updateMaster({ body: body }))
   }
})(MemberEdit))