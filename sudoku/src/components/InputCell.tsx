import React, {useContext, useState} from "react";
import {Coordinate} from "../types/Coordinate";
import {Cell} from "../types/Cell";
import {useZone} from "../hooks/useZone";
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
    const cell: Cell = useZone(props.zone).getCell(props.coordinate);

    const [input, setInput] = useState<number>(0);
    const [solution, setSolution] = useState()
    const [isWrongNumber, setIsWrongNumber] = useState<boolean>(false);

    const isFocusedByUser = () => {
        return Cell.isEqual(sudoku.currentCell, Optional.ofNonNull(cell));
    }

    const getClassFocused = () => {
        if (isFocusedByUser() && !cell.isPlaceholder()) {
            return "bg:sky-80"
        } else {
            return "bg:sky-88"
        }
    }

    const getPlaceholder = (): number | string => {
        return cell.isPlaceholder() ? cell.value : '  '
    }

    const checkInput = () => {
        sudoku.setCurrentCell(Optional.of(cell));
        sudoku.setCurrentCoordinateOfZone(Optional.of(props.coordinateOfZone));

        if (solution && solution !== input) {
            setIsWrongNumber(true);
        }

        if (solution && solution === input) {
            setIsWrongNumber(false);
        }
    }

    return (
        <div onClick={() => checkInput()}
             className={"display:flex flex-grow:1 b:2px|solid|sky-92 align-items:center justify-content:center white-space:pre-wrap " + getClassFocused()}>
            <p className={"font:bold"}>{getPlaceholder()}</p>
        </div>
    )
}