import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper, Button, Grid, TextField } from '@material-ui/core'
import { History } from 'history'
import { containerStyle } from '../../_thems'
import SmartTable from '../../components/Table/SmartTable';
import { memberHeader } from '../../components/TableHeader'
import { hideModal, showModal } from '../../actions/modal';
import { ModalType } from '../../components/Modals/ModalManager';
import { masterMembers } from '../../store/master.store'
import { ApplicationState } from '../../reducers';
import { getMasterState } from '../../store/master/master.selector';
import { IMasterApiState } from '../../store/master';

interface Props {
   history: History
}

const Member: React.FC<Props> = (props: Props): React.ReactElement => {
   const classes = containerStyle()
   const memberState = useSelector((state: ApplicationState): IMasterApiState => getMasterState(state.members.manageMembers, undefined))
   const dispatch = useDispatch()
   const [filter, setFilter] = React.useState(false)
   const openModal = () => {
      dispatch(showModal(ModalType.MemberModal, {
         onSave: (result: any) => {
            dispatch(masterMembers.createMaster({ body: result }))
            // dispatch(hideModal())
         },
         onClose: () => {
            dispatch(hideModal())
         }
      }))
   }
   const filters = () => {
      setFilter(!filter)
   }
   const handleFilter = (e: any) => {
      let firstName = { [e.target.name]: e.target.value }
      dispatch(masterMembers.requestPagination({ page: 0, pageSize: 10, queryParams: firstName }))
   }
   const handleRowClick = (row: any) => {
      setTimeout(() => {
         props.history.push(`/member/${row.id}`)
      }, 200)
   }
   const handleStatusUpdate = (params: number) => {
      if (params) {
         dispatch(masterMembers.deleteMaster({ urlParams: { memberId: params } }))
      }
   }
   const count = memberState.totalCount !== undefined ? memberState.totalCount : 0
   return (
      <Container component={Paper} className={classes.root}>
         <Grid container className="space-above-below">
            <Grid item xs>
               <Button variant="contained" color="primary" onClick={filters}>Filter</Button> {' '}
               {filter && <>
                  <TextField name="firstName" placeholder="First Name" size="small" variant="outlined" onChange={handleFilter} autoComplete="off" /> {' '}
                  {/* <TextField name="lastName" placeholder="Last Name" size="small" variant="outlined" onChange={handleFilter} autoComplete="off" />{' '}
                  <TextField name="username" placeholder="Username" size="small" variant="outlined" onChange={handleFilter} autoComplete="off" /> */}
               </>}
            </Grid>
            <Grid item>
               <Button variant="contained" color="primary" onClick={openModal}>Add</Button>
            </Grid>
         </Grid>
         <SmartTable
            data={memberState.results}
            count={count}
            headers={memberHeader}
            handleRowClick={handleRowClick}
            manageActivities={(option: any) => {
               const { page, pageSize, ...other } = option
               dispatch(masterMembers.requestPagination({ page, pageSize, queryParams: other }))
            }}
            handleStatusUpdate={handleStatusUpdate}
         />
      </Container>
   );
}

export default Member