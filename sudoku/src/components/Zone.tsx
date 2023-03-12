import React from "react";
import {Cell} from "./Cell";
import {Coordinate} from "../types/Coordinate";
import {UseBoard} from "../hooks/useBoard";

interface Props {
    board: UseBoard,
    coordinate: Coordinate
}

export function Zone(props: Props) {
    return (
        <div className={"display:flex flex:col flex-grow:1 m:0.5rem"}>
            <div className={"display:flex flex:row flex-grow:1"}>
                <Cell coordinate={{x: 0, y: 0}}/>
                <Cell coordinate={{x: 1, y: 0}}/>
                <Cell coordinate={{x: 2, y: 0}}/>
            </div>
            <div className={"display:flex flex:row flex-grow:1"}>
                <Cell coordinate={{x: 0, y: 1}}/>
                <Cell coordinate={{x: 1, y: 1}}/>
                <Cell coordinate={{x: 2, y: 1}}/>
            </div>
            <div className={"display:flex flex:row flex-grow:1"}>
                <Cell coordinate={{x: 0, y: 2}}/>
                <Cell coordinate={{x: 1, y: 2}}/>
                <Cell coordinate={{x: 2, y: 2}}/>
            </div>
        </div>
    )
}