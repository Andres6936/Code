import {Coordinate} from "../types/Coordinate";
import {Cell} from "../types/Cell";

function useDelimited(board: number[]) {
    const zones: Cell[] = []
    let axisX = 0;
    let axisY = 0;
    for (let index = 0; index < board.length; index++) {
        zones.push({
            x: axisX,
            y: axisY,
            value: board.at(index) as number
        })
        axisX += 1;
        if (axisX === 9) {
            axisX = 0;
            axisY += 1;
        }
    }
    return zones;
}

export function useBoard(board: number[]) {
    const zones: Cell[] = useDelimited(board);

    const getCells = (coordinates: Array<[number, number]>): Cell[] => {
        const values: Cell[] = []
        for (let [x, y] of coordinates) {
            values.push(getCell({x, y}))
        }
        return values
    }

    const getZone = ({x, y}: Coordinate): Cell[] | null => {
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

        return null;
    }

    const getCell = ({x, y}: Coordinate): Cell => {
        return null;
    }

    return {zones, getZone, getCell}
}