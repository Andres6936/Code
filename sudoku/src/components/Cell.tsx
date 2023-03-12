import React, {useState} from "react";
import {Coordinate} from "../types/Coordinate";
import {UseBoard} from "../hooks/useBoard";

interface Props {
    board: UseBoard,
    coordinate: Coordinate
}

export function Cell(props: Props) {
    const [cell, setCell] = useState(props.board.getCell({x: props.coordinate.x, y: props.coordinate.y}))
    const [notes, setNotes] = useState();
    const [number, setNumber] = useState<number>(0);
    const [solution, setSolution] = useState()
    const [isWrongNumber, setIsWrongNumber] = useState<boolean>(false);

    const getValue = () => {
        if (cell && cell.value) {
            return cell.value
        } else {
            return ''
        }
    }

    const checkInput = () => {
        if (solution && solution !== number) {
            setIsWrongNumber(true);
        }

        if (solution && solution === number) {
            setIsWrongNumber(false);
        }
    }

    return (
        <div onInput={() => checkInput()}
             className={"display:flex flex-grow:1 b:1px|solid|#CCC align-items:center justify-content:center"}>
            <p className={"font:bold"}>{getValue()}</p>
        </div>
    )
}