import React, { FC, ReactElement } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { Avatar, Button, CssBaseline, Grid, Typography, Container } from '@material-ui/core'
import { loginStyles } from '../_thems'
import { PermIdentitySharpIcons } from '../components/ui'
import { FormInput, ReduxValidation } from '../components/Forms'

export interface IForgotPassword {
   email: string
   password?: string
}

const ForgotPassword: FC<any> = (props): ReactElement => {
   const classes = loginStyles();
   const { handleSubmit } = props
   return (
      <React.Fragment>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                  <PermIdentitySharpIcons />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Forgot Password
               </Typography>
               <form className={classes.form} noValidate onSubmit={handleSubmit}>
                  <Field component={FormInput} variant="outlined" margin="normal" fullWidth label="Email Address" name="email"
                     isEditable={true} validate={[ReduxValidation.required, ReduxValidation.email]}
                  />
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                     Sign In
                  </Button>
                  <Grid container>
                     <Grid item xs>
                        <Link to="/" style={{ textDecoration: "none" }}>
                           Back to login?
                        </Link>
                     </Grid>
                  </Grid>
               </form>
            </div>
         </Container>
      </React.Fragment>
   )
}

const ForgotPasswordForm = reduxForm({
   form: "ForgotPasswordForm",
   onSubmit: (data: IForgotPassword, dispatch: any, props: any) => {
      console.log('data', data)
   }
})(ForgotPassword)

export default ForgotPasswordForm