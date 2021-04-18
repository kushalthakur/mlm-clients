import { FC, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Link, Grid, Typography, Container } from '@material-ui/core'
import { PermIdentitySharpIcons } from '../components/ui'
import { FormInput, ReduxValidation } from '../components/Forms'
import { loginStyles } from '../_thems'
import { ApplicationState } from '../reducers'
import { authenticate } from '../actions'
export interface IUserForm {
   id: string
   name: string
   email: string
   phone: string
   password: string
   founderClubMember: number
   role: string
   status: number
   createdAt?: string
   updatedAt?: string
}

interface Props {
   handleSubmit: any
   authenticate: Array<any>
   login: Function
   history: any
}

const Login: FC<Props> = (props: Props): ReactElement => {
   const classes = loginStyles();
   const { handleSubmit } = props
   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
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
                     <Link href="#" variant="body2">
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
   onSubmit: (data: IUserForm, dispatch, props: Props) => {
      props.login({ email: data.email, password: data.password })
      // props.history.push('/tab')
   }
})(Login)

const mapStateToProps = (state: ApplicationState) => {
   return {
      authenticate: state.authenticate
   }
}

const mapDispatchToProps = {
   login: authenticate
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)