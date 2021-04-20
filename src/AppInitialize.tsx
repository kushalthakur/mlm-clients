import React from 'react'
import Loadable from 'react-loadable'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { getToken } from './store/selectors'

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

interface StaticProps {
   history: History
}
export const ProtectedRoute = ({ component: Component, ...rest }: any) => (
   <Route {...rest} render={props => (
      getToken() ? <Component {...props} /> : <Redirect to={{ pathname: "/", state: { from: props.location } }} />
   )} />
)

export default class AppInitialize extends React.Component<StaticProps> {
   public render(): JSX.Element {
      return (
         <React.Fragment>
            <ConnectedRouter history={this.props.history}>
               <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/forgot/password" component={ForgotPassword} />
                  <ProtectedRoute path={"/"} render={(props: any) => <RootContainer {...props} />} />
               </Switch>
            </ConnectedRouter>
         </React.Fragment>
      )
   }
}