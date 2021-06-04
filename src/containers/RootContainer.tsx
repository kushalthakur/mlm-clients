import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from './Navbar'
import ModalManager from '../components/Modals/ModalManager'
import D3Tree from './tree/D3Tree'
import Member from './member/Member'
import MemberEdit from './member/MemberEdit'
import { history } from '../store'

interface Props {

}
class RootContainer extends React.Component<{}, Props> {
   public render(): JSX.Element {
      return (
         <React.Fragment>
            <ModalManager />
            <Navbar history={history} />
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