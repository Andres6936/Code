import {Coordinate} from "../types/Coordinate";
import {Cell} from "../types/Cell";
import {useDelimited} from "./useDelimited";
import {Optional} from "typescript-optional";

export interface UseBoard {
    isFill: () => boolean,
    isValid: (solution: readonly number[]) => boolean
    getCell: ({x, y}: Coordinate) => Cell,
    getZone: ({x, y}: Coordinate) => Cell[],
    setCellValueAt: (coordinate: Coordinate, value: number) => Optional<Cell[]>
}

/**
 * Hook used for convert the one-dimension board coordinate to
 * two-dimension board coordinate, the values in the board not
 * will be mutated.
 *
 * @param board An Sudoku board, the param is an array with exactly 81
 * elements in these, indicate each cell in the board and the value.
 *
 * @param zonesDefault Generally is used for update the state of UI.
 */
export function useBoard(board: readonly number[], zonesDefault: Cell[] = []): UseBoard {
    const zones: Cell[] = zonesDefault.length > 0 ? zonesDefault : useDelimited(board);

    const getCells = (coordinates: Array<[number, number]>): Cell[] => {
        const values: Cell[] = []
        for (let [x, y] of coordinates) {
            values.push(getCell({x, y}))
        }
        return values
    }

    const getValueCellAt = (board: readonly number[], x: number, y: number): number => {
        // Get the index of cell in the one dimensional array that
        // represent the board with the values of solution.
        const index: number = (y * 9) + x;
        const value = board.at(index)
        if (value) {
            return value
        }
        return panic({x, y});
    }

    const isValid = (solution: readonly number[]): boolean => {
        for (let cell of zones) {
            const solutionValue = getValueCellAt(solution, cell.x, cell.y);
            if (cell.value !== solutionValue) {
                return false
            }
        }
        return true;
    }

    const isFill = (): boolean => zones.every(cell => cell.value !== 0)

    const panic = ({x, y}: Coordinate): never => {
        throw new TypeError(`The coordinate (${x}, ${y}) not exist in the Sudoku board`)
    }

    const getZone = ({x, y}: Coordinate): Cell[] => {
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


    const getCell = ({x, y}: Coordinate): Cell => {
        const value = zones.find(zone => zone.x === x && zone.y === y);
        if (value) {
            return value;
        }
        return panic({x, y});
    }

    const setCellValueAt = ({x, y}: Coordinate, value: number): Optional<Cell[]> => {
        const cell = zones.find(zone => zone.x === x && zone.y === y);
        if (cell) {
            cell.value = value

            return Optional.of(zones);
        }

        return Optional.empty();
    }

    return {isFill, isValid, getZone, getCell, setCellValueAt}
}