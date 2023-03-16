import React, {useState} from "react";
import {Coordinate} from "../types/Coordinate";
import {OptionalCell} from "../types/Cell";
import {useZone} from "../hooks/useZone";

interface Props {
    zone: OptionalCell[] | null,
    coordinate: Coordinate
}

export function Cell(props: Props) {
    const placeholder = useZone(props.zone).getCell(props.coordinate);

    const [notes, setNotes] = useState();
    const [number, setNumber] = useState<number>(0);
    const [solution, setSolution] = useState()
    const [isWrongNumber, setIsWrongNumber] = useState<boolean>(false);

    const getValue = () => {
        if (placeholder) {
            return placeholder;
        } else {
            return '  '
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
             className={"display:flex flex-grow:1 b:1px|solid|#CCC align-items:center justify-content:center white-space:pre-wrap"}>
            <p className={"font:bold"}>{getValue()}</p>
        </div>
    )
}