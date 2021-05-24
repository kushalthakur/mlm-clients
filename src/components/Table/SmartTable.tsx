import React, { FC, ReactElement } from 'react'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import { ITableHeader } from '../TableHeader/models'
import { memberStyles } from '../../_thems'
import SmartRow from './SmartRow'
import SmartHeader from './SmartHeader'
import { StyledTableRow } from '../../_thems'
import Pagination from './Pagination'

interface OwnProps {
   data: any
   count: number
   headers: Array<ITableHeader>
   handleRowClick?: Function
   manageActivities?: Function
}

type Props = OwnProps

const SmartTable: FC<Props> = (props: Props): ReactElement => {
   const classes = memberStyles()
   const [currentPage, setCurrentPage] = React.useState(0)
   const { data, count, headers } = props
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
   const manageActivitiesAction = () => {
      let args: any = {
         page: currentPage,
         pageSize: 10
      }
      if (props.manageActivities) {
         props.manageActivities(args)
      }
   }
   React.useEffect(() => {
      manageActivitiesAction()
   }, [currentPage])
   return (
      <React.Fragment>
         <Table className={classes.table} aria-label="customized table">
            <TableHead>
               <TableRow>
                  {headers && headers.map((header: ITableHeader, index: number) => (
                     <SmartHeader
                        header={header}
                        key={index}
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
         <div className="pagination-center">
            <Pagination
               count={count}
               handlePage={handlePageChange}
            />
         </div>
      </React.Fragment>
   )
}

export default SmartTable