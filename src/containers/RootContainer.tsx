import React from 'react'
// import Loadable from 'react-loadable'
import { Switch, Route } from 'react-router-dom'

import Navbar from './Navbar'
import TabComponent from './Tab'
// const TabComponent = Loadable({
//    loader: () => import('./Tab'),
//    loading: () => <div className="loading" />
// })

interface StateProps {

}
interface DispatchProps {

}
interface State {

}
type Props = StateProps & DispatchProps
class RootContainer extends React.Component<State, Props> {
   public render(): JSX.Element {
      return (
         <React.Fragment>
            <Navbar />
            <Switch>
               <Route exact path="/tab" component={TabComponent} />
            </Switch>
         </React.Fragment>
      )
   }
}

export default RootContainer