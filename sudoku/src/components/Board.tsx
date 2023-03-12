import React, {useEffect} from "react";
import {Zone} from "./Zone";
import {useSudoku} from "../useSudoku";

export function Board() {
    const sudoku = useSudoku();

    useEffect(() => {
        console.log(sudoku)
    }, [sudoku])

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