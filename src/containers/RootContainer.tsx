import React from 'react'
// import Loadable from 'react-loadable'
import { Switch, Route } from 'react-router-dom'
import Navbar from './Navbar'
import ModalManager from '../components/Modals/ModalManager'
import D3Tree from './tree/D3Tree'
import Member from './member/Member'
import MemberEdit from './member/MemberEdit'

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
            <ModalManager />
            <Navbar />
            <Switch>
               <Route exact path="/tree" component={D3Tree} />
               <Route exact path="/members" component={Member} />
               <Route exact path="/member/:memberId" component={MemberEdit} />
            </Switch>
         </React.Fragment>
      )
   }
}

export default RootContainer