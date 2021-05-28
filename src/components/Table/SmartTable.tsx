import React from 'react'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import { ITableHeader } from '../TableHeader/models'
import { memberStyles } from '../../_thems'
import SmartRow from './SmartRow'
import SmartHeader from './SmartHeader'
import { StyledTableRow } from '../../_thems'
import Pagination from './Pagination'
import { DEFAULT_ORDER, ORDER_STATES } from './constants'

interface Props {
   data: any
   count: number
   headers: Array<ITableHeader>
   handleRowClick?: Function
   manageActivities?: Function
}

const SmartTable: React.FC<Props> = (props: Props): React.ReactElement => {
   const classes = memberStyles()
   const [currentPage, setCurrentPage] = React.useState(0)
   const sortRef = React.useRef({ fieldName: "", orderBy: DEFAULT_ORDER })
   const { data, count, headers, manageActivities } = props
   const handleRowClick = (row: any) => {
      if (props.handleRowClick) {
         props.handleRowClick(row)
      }
   }
   const handlePageChange = (activePage: number) => {
      if (activePage !== currentPage) {
         setCurrentPage(activePage)
      }
   }
   const handleSort = (option: any) => {
      sortRef.current = option
      manageActivitiesAction()
   }
   const manageActivitiesAction = () => {
      let args: any = {
         page: currentPage,
         pageSize: 10
      }
      if (sortRef.current.orderBy) {
         args = { sort: sortRef.current.fieldName, order: ORDER_STATES[sortRef.current.orderBy], ...args }
      }
      if (manageActivities) {
         manageActivities(args)
      }
   }
   React.useEffect(() => {
      manageActivitiesAction()
   }, [currentPage])
   const { current } = sortRef
   return (
      <React.Fragment>
         <Table className={classes.table}>
            <TableHead>
               <TableRow>
                  {headers && headers.map((header: ITableHeader, index: number) => (
                     <SmartHeader
                        header={header}
                        key={index}
                        value={current.fieldName === header.label ? current.orderBy : DEFAULT_ORDER}
                        handleSort={handleSort}
                     />
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {data && data.map((row: any, index: number) => (
                  <StyledTableRow key={index}>
                     <SmartRow
                        row={row}
                        headers={headers}
                        onRowClick={handleRowClick}
                     />
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
         {count > 10 &&
            <div className="pagination-center">
               <Pagination
                  count={count}
                  handlePage={handlePageChange}
               />
            </div>}
      </React.Fragment>
   )
}

export default SmartTable