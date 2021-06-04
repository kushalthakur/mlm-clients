import { FC, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Typography, Container } from '@material-ui/core'
import { PermIdentitySharpIcons } from '../components/ui'
import { FormInput, ReduxValidation } from '../components/Forms'
import { loginStyles } from '../_thems'
import { ApplicationState, IUserState, IAuthenticateState } from '../reducers'
import { authenticate, currentUser } from '../actions'
import Alerts from '../components/General/Alerts'
import { storageUser } from '../store/selectors'

interface StateProps {
   authenticateState: IAuthenticateState
}
interface DispatchProps {
   login: Function
   currentUser: Function
}
interface OwnProps {
   handleSubmit: any
   history: any
}
type Props = StateProps & DispatchProps & OwnProps

const Login: FC<Props> = (props: Props): ReactElement => {
   const classes = loginStyles();
   const { handleSubmit, authenticateState } = props
   if (authenticateState.isAuthenticated) {
      return <Redirect to="/tree" />
   }
   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Alerts />
            <Avatar className={classes.avatar}>
               <PermIdentitySharpIcons />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign In
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
               <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Email Address" name="email" type="email" autoFocus
                  isEditable={true} validate={[ReduxValidation.required, ReduxValidation.email]}
               />
               <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Password" name="password" type="password"
                  isEditable={true} validate={[ReduxValidation.required, ReduxValidation.minLength]} />
               <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
               <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Sign In
               </Button>
               {/* <Grid container>
                  <Grid item xs>
                     <Link to="/forgot/password" style={{ textDecoration: "none" }}>
                        Forgot password?
                     </Link>
                  </Grid>
               </Grid> */}
            </form>
         </div>
      </Container>
   );
}

const LoginForm = reduxForm({
   form: 'LoginForm',
   onSubmit: (data: IUserState, dispatch, props: any) => {
      props.login({ email: data.email, password: data.password })
         .then((result: any) => {
            if (result && result.payload && result.payload.data) {
               props.history.push('/tree')
               storageUser(result)
               props.currentUser(result.payload.token)
            }
         }).catch((err: any) => {
            console.log(err)
         })
   }
})(Login)

const mapStateToProps = (state: ApplicationState): StateProps => {
   return {
      authenticateState: state.authenticate
   }
}

const mapDispatchToProps: DispatchProps = {
   login: authenticate,
   currentUser: currentUser
}

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchToProps)(LoginForm)