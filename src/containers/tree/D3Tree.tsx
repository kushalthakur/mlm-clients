import { FC, ReactElement } from 'react'
import Tree from 'react-d3-tree'
import '../../_thems/tree.css'
import { useCenteredTree } from '../../components/Tree/useCenteredTree'

const containerStyles = {
   width: '97vw',
   height: '88vh',
}
interface Props {
   tree: Array<any>
}

const D3Tree: FC<Props> = (props: Props): ReactElement => {
   const [translate, containerRef] = useCenteredTree();
   return (
      <div style={containerStyles} ref={containerRef}>
         <Tree
            data={props.tree}
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            // svgClassName="node__svg"
            // nodeSize={{ x: 100, y: 100 }}
            // pathFunc={'step'}
            orientation={'vertical'}
            translate={translate}
            scaleExtent={({ max: 0.8, min: 0.4 })}
         />
      </div>
   )
}

export default D3Tree