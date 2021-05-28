import React, { FC, ReactElement } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
// import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { StyledTableCell } from '../../_thems'
import { ITableHeader } from '../TableHeader/models'

interface OwnProps {
   header: ITableHeader
   key: number
   value?: any
   handleSort?: any
}

type Props = OwnProps

const SmartHeader: FC<Props> = (props: Props): ReactElement => {
   const { header, value, handleSort } = props
   const handleSortClick = () => {
      if (header.sort && handleSort) {
         let order = value + 1
         order = order > 2 ? 0 : order
         handleSort({ fieldName: header.label, orderBy: order })
      }
   }
   return (
      <React.Fragment>
         <StyledTableCell>
            {header.text}{header.sort && <ArrowDropDownIcon style={{ cursor: 'pointer' }} onClick={handleSortClick} />}
            {/* <ArrowDropUpIcon style={{ cursor: 'pointer' }} /> */}
         </StyledTableCell>
      </React.Fragment>
   )
}

export default SmartHeader