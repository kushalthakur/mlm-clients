
import React, { FC, ReactElement, useEffect } from 'react'
import { connect } from 'react-redux'
import { alerts } from '../../actions'
import { ApplicationState, IAlertState } from '../../reducers'
import { DangerAlert } from '../ui'

interface StateProps {
   alertState: IAlertState
}
interface DispatchProps {
   hideAlert: Function
}
interface OwnProps { }
type Props = DispatchProps & StateProps & OwnProps

const Alerts: FC<Props> = (props: Props): ReactElement => {
   const { alertState } = props
   useEffect(() => {
      let _timeout: number = 0
      if (alertState.visible) {
         window.clearTimeout(_timeout)
      }
      _timeout = window.setTimeout(() => {
         props.hideAlert()
      }, 5000);
   })
   return (
      <React.Fragment>
         {alertState && alertState.message && < DangerAlert message={alertState && alertState.message} />}
      </React.Fragment>
   )
}

const mapStateToProps = (state: ApplicationState): StateProps => {
   return {
      alertState: state.alerts
   }
}

const mapDispatchToProps: DispatchProps = {
   hideAlert: alerts.clear
}

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchToProps)(Alerts)