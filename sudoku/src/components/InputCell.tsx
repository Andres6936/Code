import React, {useState} from "react";
import {Coordinate} from "../types/Coordinate";
import {Cell} from "../types/Cell";
import {useZone} from "../hooks/useZone";
import {Optional} from "typescript-optional";

const EMPTY_PLACEHOLDER_VALUE = 0 as const;

interface Props {
    zone: Optional<Cell>[] | null,
    coordinate: Coordinate
}

export function InputCell(props: Props) {
    const cell = useZone(props.zone).getCell(props.coordinate);

    const [notes, setNotes] = useState();
    const [input, setInput] = useState<number>(0);
    const [solution, setSolution] = useState()
    const [isWrongNumber, setIsWrongNumber] = useState<boolean>(false);

    const getPlaceholder = (): number | string => {
        if (cell) {
            const placeholder = cell.map(item => item.value).orElse(EMPTY_PLACEHOLDER_VALUE);
            return placeholder === EMPTY_PLACEHOLDER_VALUE ? '  ' : placeholder;
        } else {
            return '  '
        }
    }

    const checkInput = () => {
        if (solution && solution !== input) {
            setIsWrongNumber(true);
        }

        if (solution && solution === input) {
            setIsWrongNumber(false);
        }
    }

    return (
        <div onInput={() => checkInput()}
             className={"display:flex flex-grow:1 b:1px|solid|#CCC align-items:center justify-content:center white-space:pre-wrap"}>
            <p className={"font:bold"}>{getPlaceholder()}</p>
        </div>
    )
}