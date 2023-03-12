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
        }

        return null;
    }

    const getCell = ({x, y}: Coordinate): Cell => {
        return null;
    }

    return {zones, getZone, getCell}
}