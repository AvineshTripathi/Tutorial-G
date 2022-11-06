import React, {Dispatch, useEffect, useState, SetStateAction} from 'react';
import './App.css';
import Flow from "./Flow";
import Splitter, {SplitDirection} from '@devbookhq/splitter';
import Terminal from "./commands/Terminal";


export interface Node {
    id: string;
    data: {color: string};
    position: { x: number, y: number};
    style: {},
    type: string;
    parentNode: string;
    extent: "parent";
}

export interface Edge {
    id: string,
    source: string,
    target: string,
}

export interface Head {
    x: number,
    y: number,
}

function App() {
    const [count, setCount] = useState(0)
    const [nodes, setNodes] = useState<Node[]>([])
    const [edges, setEdges] = useState<Edge[]>([])
    const [head, setHead] = useState<Head>({x: 300, y: 100})

  return (
          <Splitter direction={SplitDirection.Horizontal}>
              <div style={{height: '100vh'}}>
                  <Flow nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} head={head} setHead={setHead} count={count} setCount={setCount}/>
              </div>
              <div >
                  <div> TUTORIAL-G</div>
                  <div>
                      <Terminal nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} head={head} setHead={setHead} count={count} setCount={setCount}/>
                  </div>
                  <div>
                      <button onClick={() =>  {}}>check</button>
                  </div>
              </div>

          </Splitter>


  );
}

export default App;
