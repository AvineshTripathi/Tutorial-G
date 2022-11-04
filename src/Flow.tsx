import ReactFlow, {Controls, Background} from 'reactflow';
import 'reactflow/dist/style.css';
import ColorNode from "./components/ColorNode";
import Edges from "./components/Edges";
import React, {Dispatch, SetStateAction, useState} from "react";
import NodeProps, {Node, Edge, Head} from './App'

const nodeTypes = {
    colorNode: ColorNode
}

export interface NodeProps {
    nodes: Node[],
    setNodes: Dispatch<SetStateAction<Node[]>>,
    count: number,
    setCount: Dispatch<SetStateAction<number>>,
    edges: Edge[],
    setEdges: Dispatch<SetStateAction<Edge[]>>
    head: Head,
    setHead: Dispatch<SetStateAction<Head>>
}
function GetNode(a: number) : Node {

    let k = 300
    let m = a*100
    return {
        id: a+'',
        data: { color: 'blue'},
        position: {x: k, y: m}, // handle positioning based on commands
        type: 'colorNode'
    }
}
const Flow = ({nodes, setNodes, edges, setEdges, head, setHead, count, setCount}: NodeProps) => {
    const addNode = () => {
        var temp = GetNode(count)
        setCount(count+1)
        setNodes([...nodes, temp])
    }
    return (
            <div style={{ height: '100%' }} >
                <ReactFlow nodes={nodes}  nodeTypes={nodeTypes} edges={edges}>
                    <Background />
                    <Controls />
                </ReactFlow>

            </div>

    );
}

export default Flow;
