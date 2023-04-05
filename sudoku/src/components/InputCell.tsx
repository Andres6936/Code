import React, {useContext, useEffect, useState} from "react";
import {Coordinate} from "../types/Coordinate";
import {Cell, isEqual} from "../types/Cell";
import {useZone} from "../hooks/useZone";
import {Optional} from "typescript-optional";
import {SudokuContext} from "../context/SudokuContext";

const EMPTY_PLACEHOLDER_VALUE = 0 as const;

interface Props {
    // The zone in the board where the cell is located
    zone: Cell[],
    // Coordinate relative to zone
    coordinate: Coordinate
}

export function InputCell(props: Props) {
    const sudoku = useContext(SudokuContext);
    const cell: Cell = useZone(props.zone).getCell(props.coordinate);

    const [notes, setNotes] = useState();
    const [input, setInput] = useState<number>(0);
    const [solution, setSolution] = useState()
    const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false);
    const [isWrongNumber, setIsWrongNumber] = useState<boolean>(false);

    // Avoid the use of cell as dependency, the value only is evaluated only once
    useEffect(() => {
        setIsPlaceholder(cell.value !== EMPTY_PLACEHOLDER_VALUE)
    }, [])

    const isFocusedByUser = () => {
        return isEqual(sudoku.currentCell, Optional.ofNonNull(cell));
    }

    const getClassFocused = () => {
        if (isFocusedByUser() && !isPlaceholder) {
            return "bg:sky-80"
        } else {
            return "bg:sky-88"
        }
    }

    const getPlaceholder = (): number | string => {
        const placeholder = cell.value;
        return placeholder === EMPTY_PLACEHOLDER_VALUE ? '  ' : placeholder;
    }

    const checkInput = () => {
        sudoku.setCurrentCell(Optional.ofNonNull(cell));

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