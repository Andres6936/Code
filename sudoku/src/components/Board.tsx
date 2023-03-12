import React from "react";
import {Zone} from "./Zone";
import {UseSudoku, useSudoku} from "../hooks/useSudoku";

export function Board() {
    const sudoku: UseSudoku = useSudoku();

    return (
        <div className="sudoku my:2rem">
            <div className={"display:flex flex:row"}>
                <Zone board={sudoku.board} coordinate={{x: 0, y: 0}}/>
                <Zone board={sudoku.board} coordinate={{x: 1, y: 0}}/>
                <Zone board={sudoku.board} coordinate={{x: 2, y: 0}}/>
            </div>

            <div className={"display:flex flex:row"}>
                <Zone board={sudoku.board} coordinate={{x: 0, y: 1}}/>
                <Zone board={sudoku.board} coordinate={{x: 1, y: 1}}/>
                <Zone board={sudoku.board} coordinate={{x: 2, y: 1}}/>
            </div>

            <div className={"display:flex flex:row"}>
                <Zone board={sudoku.board} coordinate={{x: 0, y: 2}}/>
                <Zone board={sudoku.board} coordinate={{x: 1, y: 2}}/>
                <Zone board={sudoku.board} coordinate={{x: 2, y: 2}}/>
            </div>
        </div>
    )
}