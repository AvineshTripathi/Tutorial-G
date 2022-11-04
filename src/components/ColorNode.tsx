import React from "react";

import { Handle, NodeProps, Position} from "reactflow";

type NodeData = {
    color:string
}

const styles = {
    backgroundColor: '',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    border: 'solid',
}

function ColorNode({id, data}: NodeProps<NodeData>) {

    return (
        <div style={{backgroundColor: data.color, borderRadius: '50%', width: '40px', height: '40px', border: 'solid'}} >
            <Handle type="target" position={Position.Top} />
            <div></div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export default ColorNode