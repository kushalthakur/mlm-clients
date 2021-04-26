import { FC, ReactElement } from 'react'
import Tree from 'react-d3-tree'
import '../_thems'
import { useCenteredTree } from '../components/Tree/useCenteredTree'

const containerStyles = {
   width: '97vw',
   height: '88vh',
}

interface Props {
   tree: Array<any>
}

const D3Tree: FC<any> = (props: Props): ReactElement => {
   const [translate, containerRef] = useCenteredTree();
   const { tree } = props
   // console.log('tree ', tree)
   return (
      <div style={containerStyles} ref={containerRef}>
         <Tree
            data={tree}
            // rootNodeClassName="node__root"
            // branchNodeClassName="node__branch"
            // leafNodeClassName="node__leaf"
            orientation={'vertical'}
            pathFunc={'step'}
            translate={translate}
            scaleExtent={({ max: 0.6, min: 0.1 })}
         // nodeSize={{ x: 100, y: 100 }}
         // svgClassName={'svgImage'}
         />
      </div>
   )
}

export default D3Tree