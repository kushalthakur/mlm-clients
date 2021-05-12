import { FC, ReactElement, useEffect } from 'react'
import { connect } from 'react-redux';
import { TableContainer, Paper, Button } from '@material-ui/core'
import { memberStyles } from '../../_thems'
import SmartTable from '../../components/Table/SmartTable';
import { memberHeader } from '../../components/TableHeader'
import { hideModal, showModal } from '../../actions/modal';
import { ModalType } from '../../components/Modals/ModalManager';
import { masterMembers } from '../../store/master.store'
import { IActionCreator } from '../../actions';
import { ApplicationState } from '../../reducers';
import { getMasterState } from '../../store/master/master.selector';

interface DispatchProps {
   showModal: Function
   hideModal: Function
   requestMembers: IActionCreator
   createMaster: IActionCreator
}
interface StateProps {
   memberState: any
}

interface OwnProps {

}

type Props = DispatchProps & StateProps & OwnProps

const Member: FC<Props> = (props: Props): ReactElement => {
   const classes = memberStyles();
   const showModal = () => {
      props.showModal(ModalType.MemberModal, {
         onSave: (result: any) => {
            props.createMaster({ body: result })
            // props.hideModal()
         },
         onClose: () => {
            props.hideModal()
         }
      })
   }
   const { requestMembers, memberState } = props
   useEffect(() => {
      requestMembers()
   }, [requestMembers])
   return (
      <TableContainer component={Paper}>
         <div className={classes.root}>
            <Button variant="outlined" color="primary" onClick={(e) => showModal()}>Add Member</Button>
         </div>
         <SmartTable
            data={memberState.data}
            headers={memberHeader}
         />
      </TableContainer>
   );
}

const mapStateToProps = (state: ApplicationState): StateProps => {
   const memberState = getMasterState(state.members.manageMembers, undefined)
   return {
      memberState: memberState
   }
}

const mapDispatchToProps: DispatchProps = {
   showModal: showModal,
   hideModal: hideModal,
   requestMembers: masterMembers.requestMaster,
   createMaster: masterMembers.createMaster
}

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchToProps)(Member)