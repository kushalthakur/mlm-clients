import { FC, ReactElement, useEffect } from 'react'
import { connect } from 'react-redux';
import { Table, TableContainer, Paper, Button } from '@material-ui/core';
import { memberStyles } from '../../_thems'
import TableHeader from '../../components/Table/TableHeader'
import TableBody from '../../components/Table/TableBody'
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
            console.log('onSave')
            props.hideModal()
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
   console.log('member ', memberState)
   return (
      <TableContainer component={Paper}>
         <div className={classes.root}>
            <Button variant="outlined" color="secondary">Default</Button>
            <Button variant="outlined" color="primary" onClick={(e) => showModal()}>Add Member</Button>
         </div>
         <Table className={classes.table} aria-label="customized table" size="small">
            <TableHeader data={[]} />
            <TableBody data={memberState && memberState.data} />
         </Table>
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
   requestMembers: masterMembers.requestMaster
}

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchToProps)(Member)