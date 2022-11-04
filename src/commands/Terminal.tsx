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
        type: 'colorNode'
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
    const [branches, setBranches] = useState<any>([])

    let activebranch: number = -1
    let arrlength: number = 0
    const checkbranchexist = (test: any) : number => {
            let r:number = -1
            branches.forEach( function (value: any, i:number) {
                if (value[0] == test) {
                    r=i
                }
                i=i+1
            })
            return r
    }
    const handleCheckout = () => {
        let directionChangeX = 0

         if (branches.length == 0) {
             branches.push({"master" : [count]})
             branches.push(["master", count-1, count])
             activebranch = 1
         }else {
             let k:number = checkbranchexist("test")
             console.log(k)
             if (k!=-1) {

                 activebranch =k
             }else if (k == -1) {
                 branches.push(["test", ""])
             }
         }


        console.log(branches)
    }
    const addNode = () => {
        var temp = GetNode(count, head)
        setCount(count+1)
        setNodes([...nodes, temp])
    }

    const addEdge = () => {
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
            switch (event.target.value) {
                case "git add": {
                 addNode();
                 break
                }
                case "git commit": {
                    addEdge()
                    break
                }
                case "git checkout": {
                    setCount(count+1)
                    handleCheckout()
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