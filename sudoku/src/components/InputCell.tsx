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
    coordinateOfZone: Coordinate,
    // Apply radius top left
    rtl?: boolean,
    // Apply radius top right
    rtr?: boolean,
    // Apply radius bottom left
    rbl?: boolean,
    // Apply radius bottom right
    rbr?: boolean,
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
            return "bg:sky-78"
        } else {
            return "bg:sky-86"
        }
    }

    const getPlaceholderOrValueByUser = () => {
        if (cell.isPlaceholder()) {
            return <p className={"m:0 px:0.7rem py:0.5rem font:bold font-size:1.5rem opacity:0.5"}>{cell.value}</p>
        } else {
            // Handle the case of input for the user
            if (cell.value === 0) {
                return <p className={"m:0 px:0.7rem py:0.5rem font:italic font-size:1.5rem"}>{'  '}</p>
            } else {
                return <p className={"m:0 px:0.7rem py:0.5rem font:bold font-size:1.5rem"}>{cell.value}</p>
            }
        }
    }

    const getStlyeRadius = () : string => {
        if (props.rtl) {
            return " rtl:1.5rem "
        } else if (props.rtr) {
            return " rtr:1.5rem "
        } else if (props.rbl) {
            return " rbl:1.5rem "
        } else if (props.rbr) {
            return " rbr:1.5rem "
        } else {
            return ""
        }
    }

    return (
        <div onClick={() => markAsCurrentCell()}
             className={"display:flex flex-grow:1 b:2px|solid|sky-90 align-items:center justify-content:center white-space:pre-wrap "
             + getClassFocused() + getStlyeRadius()}>
            {getPlaceholderOrValueByUser()}
        </div>
    )
}