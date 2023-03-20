export interface Cell {
    x: number,
    y: number,
    value: number
}

export function isEqual(origin: Cell, target: Cell) {
    return origin.x === target.x && origin.y === target.y && origin.value === target.value
}