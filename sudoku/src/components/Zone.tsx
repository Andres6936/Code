import React from "react";
import {Cell} from "./Cell";

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