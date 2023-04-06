import React, {useContext, useEffect} from "react";
import {Zone} from "./Zone";
import {ISudokuContext, SudokuContext} from "../context/SudokuContext";

export function Board() {
    const context: ISudokuContext = useContext<ISudokuContext>(SudokuContext);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            console.log(event.key, 'Key')

            if (context.currentCoordinateOfZone.isPresent() && context.currentCell.isPresent()) {
                console.log(context.currentCell.get().getCoordinate(), 'Cell Current')
                context.setValueOfCell(context.currentCoordinateOfZone.get(), {x: 0, y: 0})
            }
        }

        addEventListener('keydown', onKeyDown);

        return () => {
            removeEventListener('keydown', onKeyDown);
        }
    }, [context])

    return (
        <div className="sudoku max-w:35rem my:2rem">
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