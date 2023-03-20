import {Optional} from "typescript-optional";

export interface Cell {
    x: number,
    y: number,
    value: number
}

export function isEqual(origin: Optional<Cell>, target: Optional<Cell>) {
    if (origin.isEmpty() || target.isEmpty()) {
        return false;
    }

    return isEqualOf(origin.get(), target.get());
}

function isEqualOf(origin: Cell, target: Cell) {
    return origin.x === target.x && origin.y === target.y && origin.value === target.value
}