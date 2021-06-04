import React from 'react'
import Tree from 'react-d3-tree'
import { useDispatch, useSelector } from 'react-redux';
import { useCenteredTree } from '../../components/Tree/useCenteredTree'
import { ApplicationState, ITreeState } from '../../reducers';
import { getTree } from '../../actions';
import '../../_thems/tree.css'

const containerStyles = {
   width: '100vw',
   height: '93vh',
}
interface Props {

}

const D3Tree: React.FC<Props> = (props: Props): React.ReactElement => {
   const [translate, containerRef] = useCenteredTree();
   const treeState = useSelector((state: ApplicationState): ITreeState => state.tree)
   const dispatch = useDispatch()
   const renderRectSvgNode = ({ nodeDatum, toggleNode }: any) => (
      <g>
         <circle fill={nodeDatum.attributes?.status === 'INACTIVE' ? `#f44336` : ''} r="15" width="20" height="20" x="-10" onClick={toggleNode} />
         <text fill="#000" strokeWidth="1" x="20">
            {nodeDatum.name}
         </text>
         {nodeDatum.attributes && (
            <text x="20" dy="20" strokeWidth="1" className="rd3t-label__attributes">
               <tspan x="20" dy="1.2em">username: {nodeDatum.attributes?.username}</tspan>
               <tspan x="20" dy="1.2em">sponsorId: {nodeDatum.attributes?.sponsorId}</tspan>
               <tspan x="20" dy="1.2em">level: {nodeDatum.attributes?.level}</tspan>
               <tspan x="20" dy="1.2em">status: {nodeDatum.attributes?.status}</tspan>
            </text>
         )}
      </g>
   )
   React.useEffect(() => {
      dispatch(getTree())
   }, [dispatch])
   const tree = treeState && treeState.data && treeState.data.data !== undefined ? treeState.data.data : [{}]
   return (
      <div style={containerStyles} ref={containerRef}>
         <Tree
            data={tree}
            // pathFunc={'step'}
            nodeSize={{ x: 120, y: 120 }}
            orientation={'vertical'}
            translate={translate}
            scaleExtent={({ max: 0.8, min: 0.2 })}
            renderCustomNodeElement={renderRectSvgNode}
         />
      </div>
   )
}

export default D3Tree