import { FC, ReactElement } from 'react'
import Tree from 'react-d3-tree'
import { treeData } from '../_helpers/tree'
import '../custom-tree.css'
import { useCenteredTree } from '../components/tree/useCenteredTree'

const containerStyles = {
   width: '97vw',
   height: '88vh',
}

const D3Tree: FC<any> = (): ReactElement => {
   const [translate, containerRef] = useCenteredTree();
   return (
      <div style={containerStyles} ref={containerRef}>
         <Tree
            data={treeData}
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