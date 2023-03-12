import React, {useState} from "react";
import {Coordinate} from "../types/Coordinate";

interface Props {
    coordinate: Coordinate
}

export function Cell(props: Props) {
    const [notes, setNotes] = useState();
    const [number, setNumber] = useState<number>(0);
    const [solution, setSolution] = useState()
    const [isWrongNumber, setIsWrongNumber] = useState<boolean>(false);

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
            <p className={"font:bold"}>{number === 0 ? "" : number}</p>
        </div>
    )
}