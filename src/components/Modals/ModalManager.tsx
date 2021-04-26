import React, { FC, ReactElement } from 'react'
import { connect } from 'react-redux'
import { hideModal } from '../../actions/modal'
import { ApplicationState, IModalState } from '../../reducers'
import MemberModal from './MemberModal'

interface StateProps {
   modalState: IModalState
}
interface DispatchProps {
   hideModal: Function
}
interface OwnProps {

}
type Props = StateProps & DispatchProps & OwnProps

export enum ModalType {
   MemberModal = 'MemberModal'
}
const modalComponentTable: any = {
   MemberModal
}

const ModalManager: FC<Props> = (props: Props): ReactElement => {
   const { modalState } = props
   let renderedModal
   if (modalState && modalState.name) {
      const { name, modalProps = {} } = modalState
      const ModalComponent = modalComponentTable[name]
      renderedModal = <ModalComponent {...modalProps} hideModal={props.hideModal} />
   }
   return (<React.Fragment>{renderedModal}</React.Fragment>)
}

const mapStateToProps = (state: ApplicationState): StateProps => {
   return {
      modalState: state.modalState
   }
}

const mapDispatchToProps: DispatchProps = {
   hideModal: hideModal
}

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchToProps)(ModalManager)