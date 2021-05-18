import React, { FC, ReactElement } from 'react'
import { connect } from 'react-redux';
import { Container, Paper, Button } from '@material-ui/core'
import { History } from 'history'
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
   requestPage: IActionCreator
   createMaster: IActionCreator
}
interface StateProps {
   memberState: any
}

interface OwnProps {
   history: History
}

type Props = DispatchProps & StateProps & OwnProps

const Member: FC<Props> = (props: Props): ReactElement => {
   const classes = memberStyles();
   const { requestPage, createMaster, memberState } = props
   const showModal = () => {
      props.showModal(ModalType.MemberModal, {
         onSave: (result: any) => {
            createMaster({ body: result })
            // props.hideModal()
         },
         onClose: () => {
            props.hideModal()
         }
      })
   }
   React.useEffect(() => {
      requestPage()
   }, [requestPage])
   const handleRowClick = (row: any) => {
      setTimeout(() => {
         props.history.push(`/member/${row.id}`)
      }, 200)
   }
   return (
      <Container component={Paper} maxWidth={"lg"}>
         <div className={classes.root}>
            <Button variant="outlined" color="primary" onClick={(e) => showModal()}>Add Member</Button>
         </div>
         <SmartTable
            data={memberState.data}
            headers={memberHeader}
            handleRowClick={handleRowClick}
         />
      </Container>
   );
}

const mapStateToProps = (state: ApplicationState): StateProps => {
   return {
      memberState: getMasterState(state.members.manageMembers, undefined)
   }
}

const mapDispatchToProps: DispatchProps = {
   showModal,
   hideModal,
   requestPage: masterMembers.requestPagination,
   createMaster: masterMembers.createMaster
}

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchToProps)(Member)