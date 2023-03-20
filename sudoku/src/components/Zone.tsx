import React, {useContext} from "react";
import {InputCell} from "./InputCell";
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
                <InputCell zone={zone} coordinate={{x: 0, y: 0}}/>
                <InputCell zone={zone} coordinate={{x: 1, y: 0}}/>
                <InputCell zone={zone} coordinate={{x: 2, y: 0}}/>
            </div>
            <div className={"display:flex flex:row flex-grow:1"}>
                <InputCell zone={zone} coordinate={{x: 0, y: 1}}/>
                <InputCell zone={zone} coordinate={{x: 1, y: 1}}/>
                <InputCell zone={zone} coordinate={{x: 2, y: 1}}/>
            </div>
            <div className={"display:flex flex:row flex-grow:1"}>
                <InputCell zone={zone} coordinate={{x: 0, y: 2}}/>
                <InputCell zone={zone} coordinate={{x: 1, y: 2}}/>
                <InputCell zone={zone} coordinate={{x: 2, y: 2}}/>
            </div>
        </div>
    )
}