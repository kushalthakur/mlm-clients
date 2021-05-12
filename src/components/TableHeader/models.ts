export interface ITableHeader {
   label: string
   text?: string
   type?: string
   sort?: boolean
   filter?: boolean
   className?: string
   render?: (value: any, row: any) => {}
}