import React, {useContext, useMemo} from "react";
import {InputCell} from "./InputCell";
import {Coordinate} from "../types/Coordinate";
import {Cell} from "../types/Cell";
import {ISudokuContext, SudokuContext} from "../context/SudokuContext";

interface Props {
    coordinate: Coordinate
}

export function Zone(props: Props) {
    const sudoku: ISudokuContext = useContext<ISudokuContext>(SudokuContext);
    const zone: Cell[] = useMemo(() => sudoku.getZoneAt(props.coordinate), [sudoku])

    return (
        <div className={"display:flex flex:col flex-grow:1 m:0.1rem"}>
            <div className={"display:flex flex:row flex-grow:1"}>
                <InputCell zone={zone} coordinateOfZone={props.coordinate} coordinate={{x: 0, y: 0}} rtl/>
                <InputCell zone={zone} coordinateOfZone={props.coordinate} coordinate={{x: 1, y: 0}}/>
                <InputCell zone={zone} coordinateOfZone={props.coordinate} coordinate={{x: 2, y: 0}} rtr/>
            </div>
            <div className={"display:flex flex:row flex-grow:1"}>
                <InputCell zone={zone} coordinateOfZone={props.coordinate} coordinate={{x: 0, y: 1}}/>
                <InputCell zone={zone} coordinateOfZone={props.coordinate} coordinate={{x: 1, y: 1}}/>
                <InputCell zone={zone} coordinateOfZone={props.coordinate} coordinate={{x: 2, y: 1}}/>
            </div>
            <div className={"display:flex flex:row flex-grow:1"}>
                <InputCell zone={zone} coordinateOfZone={props.coordinate} coordinate={{x: 0, y: 2}} rbl/>
                <InputCell zone={zone} coordinateOfZone={props.coordinate} coordinate={{x: 1, y: 2}}/>
                <InputCell zone={zone} coordinateOfZone={props.coordinate} coordinate={{x: 2, y: 2}} rbr/>
            </div>
        </div>
    )
}