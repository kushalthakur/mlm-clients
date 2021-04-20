import { FC, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Grid, Typography, Container } from '@material-ui/core'
// import { DangerAlert } from '../components/ui'
import { PermIdentitySharpIcons } from '../components/ui'
import { FormInput, ReduxValidation } from '../components/Forms'
import { loginStyles } from '../_thems'
import { ApplicationState, IUserState, IAuthenticateState } from '../reducers'
import { authenticate } from '../actions'
import Alerts from '../components/General/Alerts'

interface StateProps {
   authenticateState: IAuthenticateState
}
interface DispatchProps {
   login: Function
}
interface OwnProps {
   handleSubmit: any
   history: any
}
type Props = StateProps & DispatchProps & OwnProps


const Login: FC<Props> = (props: Props): ReactElement => {
   const classes = loginStyles();
   const { handleSubmit } = props
   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Alerts />
            {/* {authenticateState && authenticateState.data && <DangerAlert message={authenticateState && authenticateState.data && authenticateState.data.message} />} */}
            <Avatar className={classes.avatar}>
               <PermIdentitySharpIcons />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign In
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
               <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Email Address" name="email"
                  isEditable={true}
                  validate={[ReduxValidation.required, ReduxValidation.email]}
               />
               <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Password" name="password" type="password"
                  isEditable={true}
                  validate={[ReduxValidation.required, ReduxValidation.minLength]} />
               <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
               <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Sign In
               </Button>
               <Grid container>
                  <Grid item xs>
                     <Link to="/forgot/password" style={{ textDecoration: "none" }}>
                        Forgot password?
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>
      </Container>
   );
}

const LoginForm = reduxForm({
   form: 'LoginForm',
   onSubmit: (data: IUserState, dispatch, props: Props) => {
      props.login({ email: data.email, password: data.password })
      // props.history.push('/tab')
   }
})(Login)

const mapStateToProps = (state: ApplicationState): StateProps => {
   return {
      authenticateState: state.authenticate
   }
}

const mapDispatchToProps: DispatchProps = {
   login: authenticate
}

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchToProps)(LoginForm)