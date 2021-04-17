import React from 'react'
// import Loadable from 'react-loadable'
import { Switch, Route } from 'react-router-dom'

import D3Tree from './D3Tree'
import TabComponent from './Tab'
// const D3Tree = Loadable({
//    loader: () => import('./D3Tree'),
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
            <Switch>
               <Route exact path="/tree" component={D3Tree} />
               <Route exact path="/tab" component={TabComponent} />
            </Switch>
         </React.Fragment>
      )
   }
}

export default RootContainer