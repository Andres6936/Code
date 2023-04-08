import React, {useContext, useMemo} from "react";
import {Coordinate} from "../types/Coordinate";
import {Cell} from "../types/Cell";
import {Optional} from "typescript-optional";
import {ISudokuContext, SudokuContext} from "../context/SudokuContext";

interface Props {
    // The zone in the board where the cell is located
    zone: Cell[],
    // Coordinate relative to zone
    coordinate: Coordinate,
    // Coordinate of zone
    coordinateOfZone: Coordinate
}

export function InputCell(props: Props) {
    const sudoku: ISudokuContext = useContext<ISudokuContext>(SudokuContext);

    const cell: Cell = useMemo(
        () => sudoku.getCellAt(props.coordinateOfZone, props.coordinate),
        [props.coordinateOfZone, props.coordinate, sudoku]
    );

    const markAsCurrentCell = () => sudoku.setCurrentCell(Optional.of(cell));

    const isFocusedByUser = (): boolean => Cell.isEqual(sudoku.currentCell, Optional.ofNonNull(cell));

    const getClassFocused = () => {
        if (isFocusedByUser() && !cell.isPlaceholder()) {
            return "bg:sky-80"
        } else {
            return "bg:sky-88"
        }
    }

    const getPlaceholderOrValueByUser = () => {
        if (cell.isPlaceholder()) {
            return <p className={"font:bold"}>{cell.value}</p>
        } else {
            // Handle the case of input for the user
            if (cell.value === 0) {
                return <p className={"font:italic"}>{'  '}</p>
            } else {
                return <p className={"font:italic"}>{cell.value}</p>
            }
        }
    }

    return (
        <div onClick={() => markAsCurrentCell()}
             className={"display:flex flex-grow:1 b:2px|solid|sky-92 align-items:center justify-content:center white-space:pre-wrap " + getClassFocused()}>
            {getPlaceholderOrValueByUser()}
        </div>
    )
}