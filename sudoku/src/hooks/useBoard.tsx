import {Coordinate} from "../types/Coordinate";
import {Cell} from "../types/Cell";
import {useDelimited} from "./useDelimited";
import {Optional} from "typescript-optional";

export interface UseBoard {
    zones: Cell[],
    getCell: ({x, y}: Coordinate) => Optional<Cell>,
    getZone: ({x, y}: Coordinate) => Optional<Cell>[]
}

export function useBoard(board: number[]): UseBoard {
    const zones: Cell[] = useDelimited(board);

    const getCells = (coordinates: Array<[number, number]>): Optional<Cell>[] => {
        const values: Optional<Cell>[] = []
        for (let [x, y] of coordinates) {
            values.push(getCell({x, y}))
        }
        return values
    }

    const panic = ({x, y}: Coordinate): never => {
        throw new TypeError(`The coordinate (${x}, ${y}) not exist in the Sudoku board`)
    }

    const getZone = ({x, y}: Coordinate): Optional<Cell>[] => {
        if (x === 0 && y === 0) {
            return getCells([
                [0, 0], [1, 0], [2, 0],
                [0, 1], [1, 1], [2, 1],
                [0, 2], [1, 2], [2, 2],
            ])
        } else if (x === 1 && y === 0) {
            return getCells([
                [3, 0], [4, 0], [5, 0],
                [3, 1], [4, 1], [5, 1],
                [3, 2], [4, 2], [5, 2],
            ])
        } else if (x === 2 && y === 0) {
            return getCells([
                [6, 0], [7, 0], [8, 0],
                [6, 1], [7, 1], [8, 1],
                [6, 2], [7, 2], [8, 2],
            ])
        } else if (x === 0 && y === 1) {
            return getCells([
                [0, 3], [1, 3], [2, 3],
                [0, 4], [1, 4], [2, 4],
                [0, 5], [1, 5], [2, 5],
            ])
        } else if (x === 1 && y === 1) {
            return getCells([
                [3, 3], [4, 3], [5, 3],
                [3, 4], [4, 4], [5, 4],
                [3, 5], [4, 5], [5, 5],
            ])
        } else if (x === 2 && y === 1) {
            return getCells([
                [6, 3], [7, 3], [8, 3],
                [6, 4], [7, 4], [8, 4],
                [6, 5], [7, 5], [8, 5],
            ])
        } else if (x === 0 && y === 2) {
            return getCells([
                [0, 6], [1, 6], [2, 6],
                [0, 7], [1, 7], [2, 7],
                [0, 8], [1, 8], [2, 8],
            ])
        } else if (x === 1 && y === 2) {
            return getCells([
                [3, 6], [4, 6], [5, 6],
                [3, 7], [4, 7], [5, 7],
                [3, 8], [4, 8], [5, 8],
            ])
        } else if (x === 2 && y === 2) {
            return getCells([
                [6, 6], [7, 6], [8, 6],
                [6, 7], [7, 7], [8, 7],
                [6, 8], [7, 8], [8, 8],
            ])
        }

        return panic({x, y});
    }


    const getCell = ({x, y}: Coordinate): Optional<Cell> => {
        const value = zones.find(zone => zone.x === x && zone.y === y);
        return Optional.ofNullable(value)
    }

    return {zones, getZone, getCell}
}