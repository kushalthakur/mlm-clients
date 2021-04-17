import React from 'react'
// import Loadable from 'react-loadable'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'

import Login from './containers/Login'
// const Login = Loadable({
//    loader: () => import('./containers/Login'),
//    loading: () => <div className="loading" />
// })
import RootContainer from './containers/RootContainer'
// const RootContainer = Loadable({
//    loader: () => import('./containers/RootContainer'),
//    loading: () => <div className="loading" />
// })

interface StaticProps {
   history: History
}

export default class AppInitialize extends React.Component<StaticProps> {
   public render(): JSX.Element {
      return (
         <React.Fragment>
            <ConnectedRouter history={this.props.history}>
               <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path={"/"} render={(props) => <RootContainer {...props} />} />
               </Switch>
            </ConnectedRouter>
         </React.Fragment>
      )
   }
}