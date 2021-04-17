import React from 'react'

/**
 * 
 * This component not used anywhere
 * 
*/
export interface ITab {
   slug: string
}
interface Props {

}
interface State {
   activeTab: ITab | undefined
}

class TabComponent extends React.Component<Props, State> {
   render(): JSX.Element {
      return (
         <div>
            {this.props.children}
         </div>
      )
   }
}

export default TabComponent