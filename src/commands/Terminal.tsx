import React, {Dispatch, SetStateAction, useState} from "react";
import {NodeProps} from "../Flow";
import {Head, Node} from "../App";


function GetNode(a: number, head: Head) : Node {

    let k = head.x
    let m = a*head.y
    return {
        id: a+'',
        data: { color: 'red'},
        position: {x: k, y: m}, // handle positioning based on commands
        style: {},
        type: 'colorNode',
        parentNode: '',
        extent: "parent"
    }
}


function GetBranchNode(name: string, nodeCount: number): Node {
    let x = 30
    let y = nodeCount*100
    return {
        id: `${name}-${nodeCount}`,
        data: { color: 'red'},
        position: {x: x, y: y},
        style: {},
        type: 'colorNode',
        parentNode: `${name}`,
        extent: "parent"
    }
}

function GetEdge(a: number) {
    let k = a-2
    let m = a-1
    return {
        id: `${k}-${m}`,
        source: `${k}`,
        target: `${m}`,
    }
}

export default function Terminal({nodes, setNodes,edges, setEdges, head, setHead, count, setCount}: NodeProps) {

    const [dir, setDir] = useState(false)
    const [branches, setBranches] = useState<any>(["master"])
    const [branchNodeCount, setBranchNodeCount] = useState<number[]>([0])
    const [activebranch, setActiveBranch] = useState({branch: 0})

    // to check if current active branch is equal to branch name provided by the user
    const checkIfActionIsAllowed = (branchName: string) : number => {
        if (branchName == branches[activebranch.branch]) {
            return 1
        }
        return 0
    }


    const GetBranch = (name: string, count: number): Node => {
        let x =1
        if (branches.length%2==0) {
            x = branches.length*100
        }else {
            x = -1*branches.length*100
        }
        let y = count*100

        return {
            id: `${name}`,
            type: 'group',
            data: {color: ''},
            position: {x:x, y:y},
            style: {
                width: 100,
                height: 500,
            },
            parentNode: '',
            extent: 'parent'
        }
    }


    const checkBranchExist = (test: any) : number => {
            let r:number = -1
            for(let index=0; index<branches.length; index++){
                if (branches[index] == test){
                    r=index
                }
            }
            return r
    }


    const handleCheckout = (branchName: string) => {

        let index = checkBranchExist(branchName)
        if (index!=-1) {
            setActiveBranch({branch: index})
        } else  {
            setBranches([...branches, branchName])  // add new branch to array
            setBranchNodeCount([...branchNodeCount, 0]) // initiate new branch node count
            setNodes([...nodes, GetBranch(branchName, count)]) // add a branch interface(group)
            setActiveBranch( {branch: branches.length}) // set new branch as active brnach
        }
    }


    const addNode = (branchName: string) => {
        let errorCheck = checkIfActionIsAllowed(branchName)
        if (errorCheck == 0) {
            // to create a logging function that logs on user terminal on UI
            console.log("returning to parent call")
            return
        }
        setCount(count+1)
        var temp
        if (activebranch.branch != 0){
            let data = [...branchNodeCount]
            data[activebranch.branch] += 1
            setBranchNodeCount(data)
            temp = GetBranchNode(branchName,branchNodeCount[activebranch.branch])
        } else {
            let data = [...branchNodeCount]
            data[0] += 1
            setBranchNodeCount(data)

            temp = GetNode(count, head)
        }

        setNodes([...nodes, temp])
    }


    const addEdge = (branchName: string) => {

      var temp = GetEdge(count)
      setEdges([...edges, temp])
        console.log(edges)
    }


    const [message, setMessage] = useState('');
    const [updated, setUpdated] = useState('');

    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            //  Get input value
            setUpdated(message);
            let input = event.target.value.trim().split(' ')
            let branchName = input.length > 2 ? input.pop() : ''
            let compareCase = input.join(' ')
            switch (compareCase) {
                case "git add": {
                 addNode(branchName);
                 break
                }
                case "git commit": {
                    addEdge(branchName)
                    break
                }
                case "git checkout": {
                    handleCheckout(branchName)
                    setDir(!dir)
                }
            }
            console.log(event.target.value)
        }
    };

    return (
        <div>
            <input
                type="text"
                id="message"
                name="message"
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />

            <h2>Message: {message}</h2>

            <h2>Updated: {updated}</h2>
        </div>
    )
}