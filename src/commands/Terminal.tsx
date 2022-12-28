import React, {Dispatch, SetStateAction, useState} from "react";
import {NodeProps} from "../Flow";
import {Head, Node} from "../App";
import './Terminal.css'
import {BsCurrencyDollar} from 'react-icons/bs'

function GetNode(a: number, head: Head) : Node {

    let k = head.x
    let m = a*head.y
    return {
        id: `master-${a}`,
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

    const GetEdge = (name: string, a: number) => {
        var k = a-1
        var arr = []
        var temp
        for (var i=0; i<a-1; i++) {
            
            temp = {
                id: `${name}-${i}-${name}`,
                source: `${name}-${i}`,
                target: `${name}-${i+1}`,
            }
            console.log(temp)
            arr.push(temp)
        }
        setEdges(edges.concat(arr))
        console.log(edges)
        console.log(nodes)
    }

    const GetBranch = (name: string): Node => {
        let x =1
        if (branches.length%2==0) {
            x = branches.length*100
        }else {
            x = -1*branches.length*100
        }
        let y = branchNodeCount[activebranch.branch]*100

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
            setNodes([...nodes, GetBranch(branchName)]) // add a branch interface(group)
            setActiveBranch( {branch: branches.length}) // set new branch as active brnach
        }
    }


    const addChange = (branchName: string) => {
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

            temp = GetNode(branchNodeCount[0], head)
        }

        setNodes([...nodes, temp])
    }


    const addCommit = (branchName: string) => {
        let errorCheck = checkIfActionIsAllowed(branchName)
        if (errorCheck == 0) {
            // to create a logging function that logs on user terminal on UI
            console.log("returning to parent call")
            return
        }

        GetEdge(branchName, branchNodeCount[activebranch.branch])
    }

    const addFile = (branchName: string) => {
        let errorCheck = checkIfActionIsAllowed(branchName)
        if (errorCheck == 0) {
            // to create a logging function that logs on user terminal on UI
            console.log("returning to parent call")
            return
        }
        setNodes(nodes =>
        nodes.map(obj => {
            if(obj.id.includes(branchName)){
                return {...obj, data : {color: "green"}}
            }
            return obj
        })
        )
    }

    const [message, setMessage] = useState('');
    const [updated, setUpdated] = useState('');
    const [command, addCommand] = useState<any>([])

    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            //  Get input value
            setUpdated(message);
            addCommand([...command, message])
            let input = event.target.value.trim().split(' ')
            let branchName = input.length >= 2 ? input.pop() : ''
            let compareCase = input.join(' ')
            switch (compareCase) {
                case "touch": {
                    addChange(branchName);
                    break
                }
                case "git add": {
                    addFile(branchName)
                    break
                }
                case "git commit": {
                    addCommit(branchName)
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
        <div className="terminal">
            <div className="terminal_container">
                <div className="terminal_dollar"><BsCurrencyDollar color="white" /></div>
                <input
                    className="terminal_input"
                    type="text"
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            
            <div className="scroller">
                {[...command].reverse().map((ele: any) => {
                    return (
                        <div className="item"><div className="terminal_dollar"><BsCurrencyDollar color="white"/></div><div className="ele">{ele}</div></div>
                    )
                })}
            </div>
            <h2>Message: {message}</h2>

            <h2>Updated: {updated}</h2>
            <h3>Current Branch: {branches[activebranch.branch]}</h3>
            <h3>Current Branch Node Count: {branchNodeCount[activebranch.branch]}</h3>
        </div>
    )
}