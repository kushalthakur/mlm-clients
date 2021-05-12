import { FC, ReactElement, useEffect } from 'react'
import Tree from 'react-d3-tree'
import { connect } from 'react-redux';
import '../../_thems/tree.css'
import { useCenteredTree } from '../../components/Tree/useCenteredTree'
import { ApplicationState, ITreeState } from '../../reducers';
import { getTree } from '../../actions';

const containerStyles = {
   width: '97vw',
   height: '88vh',
}
interface treeState {
   treeState: ITreeState
}
interface DispatchProps {
   fetchTree: Function
}
interface OwnProps {

}

type Props = DispatchProps & treeState & OwnProps


const D3Tree: FC<Props> = (props: Props): ReactElement => {
   const [translate, containerRef] = useCenteredTree();
   const { fetchTree, treeState } = props;
   useEffect(() => {
      fetchTree()
   }, [fetchTree])
   const tree = treeState && treeState.data && treeState.data.data !== undefined ? treeState.data.data : [{}]
   return (
      <div style={containerStyles} ref={containerRef}>
         <Tree
            data={tree}
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

const mapStateToProps = (state: ApplicationState): treeState => {
   return {
      treeState: state.tree
   }
}
const mapDispatchToProps: DispatchProps = {
   fetchTree: getTree
}

export default connect<treeState, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchToProps)(D3Tree)