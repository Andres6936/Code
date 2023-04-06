import {Cell} from "../types/Cell";
import {Coordinate} from "../types/Coordinate";

export interface UseZone {
    getCell: (coordinate: Coordinate) => Cell
}

export function useZone(zone: readonly Cell[]): UseZone {
    const panic = ({x, y}: Coordinate) => {
        throw new TypeError(`The coordinate (${x}, ${y}) not exist in the Sudoku zone`)
    }

    const getCell = (coordinate: Coordinate): Cell => {
        if (coordinate.x === 0 && coordinate.y === 0) {
            return getCellEmptyIfNull(zone.at(0));
        } else if (coordinate.x === 1 && coordinate.y === 0) {
            return getCellEmptyIfNull(zone.at(1));
        } else if (coordinate.x === 2 && coordinate.y === 0) {
            return getCellEmptyIfNull(zone.at(2));
        } else if (coordinate.x === 0 && coordinate.y === 1) {
            return getCellEmptyIfNull(zone.at(3));
        } else if (coordinate.x === 1 && coordinate.y === 1) {
            return getCellEmptyIfNull(zone.at(4));
        } else if (coordinate.x === 2 && coordinate.y === 1) {
            return getCellEmptyIfNull(zone.at(5));
        } else if (coordinate.x === 0 && coordinate.y === 2) {
            return getCellEmptyIfNull(zone.at(6));
        } else if (coordinate.x === 1 && coordinate.y === 2) {
            return getCellEmptyIfNull(zone.at(7));
        } else if (coordinate.x === 2 && coordinate.y === 2) {
            return getCellEmptyIfNull(zone.at(8));
        }

        return panic({x: coordinate.x, y: coordinate.y});
    }

    const getCellEmptyIfNull = (cell: Cell | undefined): Cell => {
        if (cell) {
            return cell
        } else {
            return new Cell(-1, -1, false, 0)
        }
    }

    return {getCell}
}