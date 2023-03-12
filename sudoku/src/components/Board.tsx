import React from "react";
import {Zone} from "./Zone";

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