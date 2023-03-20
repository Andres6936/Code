import {Cell} from "../types/Cell";
import {Coordinate} from "../types/Coordinate";
import {Optional} from "typescript-optional";

export interface UseZone {
    getCell: (coordinate: Coordinate) => Optional<Cell>
}

export function useZone(zone: Optional<Cell>[]): UseZone {
    const panic = ({x, y}: Coordinate) => {
        throw new TypeError(`The coordinate (${x}, ${y}) not exist in the Sudoku zone`)
    }

    const getCell = (coordinate: Coordinate): Optional<Cell> => {
        if (coordinate.x === 0 && coordinate.y === 0) {
            return zone.at(0) ?? Optional.empty();
        } else if (coordinate.x === 1 && coordinate.y === 0) {
            return zone.at(1) ?? Optional.empty();
        } else if (coordinate.x === 2 && coordinate.y === 0) {
            return zone.at(2) ?? Optional.empty();
        } else if (coordinate.x === 0 && coordinate.y === 1) {
            return zone.at(3) ?? Optional.empty();
        } else if (coordinate.x === 1 && coordinate.y === 1) {
            return zone.at(4) ?? Optional.empty();
        } else if (coordinate.x === 2 && coordinate.y === 1) {
            return zone.at(5) ?? Optional.empty();
        } else if (coordinate.x === 0 && coordinate.y === 2) {
            return zone.at(6) ?? Optional.empty();
        } else if (coordinate.x === 1 && coordinate.y === 2) {
            return zone.at(7) ?? Optional.empty();
        } else if (coordinate.x === 2 && coordinate.y === 2) {
            return zone.at(8) ?? Optional.empty();
        }

        return panic({x: coordinate.x, y: coordinate.y});
    }

    return {getCell}
}