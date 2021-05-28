import { ITableHeader } from './models'

export const memberHeader: Array<ITableHeader> = [
   {
      label: "firstName",
      text: "First Name",
      type: "string",
      sort: true,
      filter: false
   },
   {
      label: "lastName",
      text: "Last Name",
      type: "string",
      sort: false,
      filter: false
   },
   {
      label: "username",
      text: "Username",
      type: "string",
      sort: true,
      filter: false
   },
   {
      label: "status",
      text: "Status",
      type: "string",
      sort: true,
      filter: false
   }
]