import React, {useEffect} from "react";
import {Zone} from "./Zone";
import {useSudoku} from "../hooks/useSudoku";

export function Board() {
    const sudoku = useSudoku();

    useEffect(() => {
        console.log(sudoku)
    }, [sudoku])

    return (
        <div className="sudoku my:2rem">
            <div className={"display:flex flex:row"}>
                <Zone coordinate={{x: 0, y: 0}}/>
                <Zone coordinate={{x: 1, y: 0}}/>
                <Zone coordinate={{x: 2, y: 0}}/>
            </div>

            <div className={"display:flex flex:row"}>
                <Zone coordinate={{x: 0, y: 1}}/>
                <Zone coordinate={{x: 1, y: 1}}/>
                <Zone coordinate={{x: 2, y: 1}}/>
            </div>

            <div className={"display:flex flex:row"}>
                <Zone coordinate={{x: 0, y: 2}}/>
                <Zone coordinate={{x: 1, y: 2}}/>
                <Zone coordinate={{x: 2, y: 2}}/>
            </div>
        </div>
    )
}