import React, {useContext} from "react";
import {Cell} from "./Cell";
import {Coordinate} from "../types/Coordinate";
import {OptionalCell} from "../types/Cell";
import {SudokuContext} from "../context/SudokuContext";

interface Props {
    coordinate: Coordinate
}

export function Zone(props: Props) {
    const sudoku = useContext(SudokuContext).sudoku;
    const zone: OptionalCell[] | null = sudoku.board.getZone(props.coordinate)

    return (
        <div className={"display:flex flex:col flex-grow:1 m:0.5rem"}>
            <div className={"display:flex flex:row flex-grow:1"}>
                <Cell placeholder={zone?.at(0)?.value} coordinate={{x: 0, y: 0}}/>
                <Cell placeholder={zone?.at(1)?.value} coordinate={{x: 1, y: 0}}/>
                <Cell placeholder={zone?.at(2)?.value} coordinate={{x: 2, y: 0}}/>
            </div>
            <div className={"display:flex flex:row flex-grow:1"}>
                <Cell placeholder={zone?.at(3)?.value} coordinate={{x: 0, y: 1}}/>
                <Cell placeholder={zone?.at(4)?.value} coordinate={{x: 1, y: 1}}/>
                <Cell placeholder={zone?.at(5)?.value} coordinate={{x: 2, y: 1}}/>
            </div>
            <div className={"display:flex flex:row flex-grow:1"}>
                <Cell placeholder={zone?.at(6)?.value} coordinate={{x: 0, y: 2}}/>
                <Cell placeholder={zone?.at(7)?.value} coordinate={{x: 1, y: 2}}/>
                <Cell placeholder={zone?.at(8)?.value} coordinate={{x: 2, y: 2}}/>
            </div>
        </div>
    )
}