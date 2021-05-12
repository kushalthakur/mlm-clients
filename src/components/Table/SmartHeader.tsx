import React, { FC, ReactElement } from 'react'
import { StyledTableCell } from '../../_thems'
import { ITableHeader } from '../TableHeader/models'

interface OwnProps {
   header: ITableHeader
   key: number
}

type Props = OwnProps

const SmartHeader: FC<Props> = (props: Props): ReactElement => {
   const { header } = props
   return (
      <React.Fragment>
         <StyledTableCell>{header.text}</StyledTableCell>
      </React.Fragment>
   )
}

export default SmartHeader