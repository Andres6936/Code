import React from "react";

function Cell() {
    return (
        <div className={"display:flex flex-grow:1 b:1px|solid|#CCC align-items:center justify-content:center"}>
            <p className={"font:bold"}>0</p>
        </div>
    )
}

export function Zone() {
    return (
        <div className={"display:flex flex:col flex-grow:1 m:0.5rem"}>
            <div className={"display:flex flex:row flex-grow:1"}>
                <Cell/>
                <Cell/>
                <Cell/>
            </div>
            <div className={"display:flex flex:row flex-grow:1"}>
                <Cell/>
                <Cell/>
                <Cell/>
            </div>
            <div className={"display:flex flex:row flex-grow:1"}>
                <Cell/>
                <Cell/>
                <Cell/>
            </div>
        </div>
    )
}

export function Board() {
    return (
        <div className="sudoku my:2rem">
            <div className={"display:flex flex:row"}>
                <Zone/>
                <Zone/>
                <Zone/>
            </div>

            <div className={"display:flex flex:row"}>
                <Zone/>
                <Zone/>
                <Zone/>
            </div>

            <div className={"display:flex flex:row"}>
                <Zone/>
                <Zone/>
                <Zone/>
            </div>
        </div>
    )
}