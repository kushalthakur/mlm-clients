import React from 'react'
import Loadable from 'react-loadable'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
// import { getToken } from './store/selectors'
import { ApplicationState } from './reducers'

// import Login from './containers/Login'
const Login = Loadable({
   loader: () => import('./containers/Login'),
   loading: () => <div className="loading" />
})
const ForgotPassword = Loadable({
   loader: () => import('./containers/ForgotPassword'),
   loading: () => <div className="loading" />
})
// import RootContainer from './containers/RootContainer'
const RootContainer = Loadable({
   loader: () => import('./containers/RootContainer'),
   loading: () => <div className="loading" />
})

interface StateProps {
   isAuthenticated: boolean
}
interface StaticProps {
   history: History
}
interface DispatchProps {

}
type Props = StateProps & StaticProps

// export const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }: any) => (
//    <Route {...rest} render={props => (
//       isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//    )} />
// )
const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
   const routeComponent = (props: any) => (
      isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: '/' }} />
   );
   return <Route {...rest} render={routeComponent} />;
};

class AppInitialize extends React.Component<Props> {
   public render(): JSX.Element {
      const { isAuthenticated, history } = this.props
      return (
         <React.Fragment>
            <ConnectedRouter history={history}>
               <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/forgot/password" component={ForgotPassword} />
                  <PrivateRoute path='/' isAuthenticated={isAuthenticated} component={(props: any) => <RootContainer {...props} />} />
                  {/* <ProtectedRoute path={"/"} isAuthenticated={isAuthenticated} component={(props: any) => <RootContainer {...props} />} /> */}
               </Switch>
            </ConnectedRouter>
         </React.Fragment>
      )
   }
}

const mapStateToProps = (state: ApplicationState): any => {
   return {
      isAuthenticated: state.authenticate.isAuthenticated
   }
}

export default connect<StateProps, DispatchProps, StaticProps, ApplicationState>(mapStateToProps)(AppInitialize)