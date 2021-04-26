import { FC, ReactElement } from 'react'
import { connect } from 'react-redux';
import { Table, TableContainer, Paper, Button } from '@material-ui/core';
import { memberStyles } from '../../_thems'
import TableHeader from '../../components/Table/TableHeader'
import TableBody from '../../components/Table/TableBody'
import { hideModal, showModal } from '../../actions/modal';
import { ModalType } from '../../components/Modals/ModalManager';

interface DispatchProps {
   showModal: Function
   hideModal: Function
}
interface StateProps {
   memberState: any
}

type Props = DispatchProps

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
   return (
      <TableContainer component={Paper}>
         <div className={classes.root}>
            <Button variant="outlined" color="secondary">Default</Button>
            <Button variant="outlined" color="primary" onClick={(e) => showModal()}>Add Member</Button>
         </div>
         <Table className={classes.table} aria-label="customized table" size="small">
            <TableHeader data={[]} />
            <TableBody data={[]} />
         </Table>
      </TableContainer>
   );
}

const mapStateToProps = (state: any): StateProps => {
   return {
      memberState: {}
   }
}

const mapDispatchToProps: DispatchProps = {
   showModal: showModal,
   hideModal: hideModal
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Member)