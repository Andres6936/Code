import {Cell} from "../types/Cell";
import {Coordinate} from "../types/Coordinate";
import {Optional} from "typescript-optional";

export interface UseZone {
    getCell: (coordinate: Coordinate) => Optional<Cell> | null
}

export function useZone(zone: Optional<Cell>[] | null): UseZone {
    const getCell = (coordinate: Coordinate): Optional<Cell> | null => {
        if (coordinate.x === 0 && coordinate.y === 0) {
            return zone?.at(0) ?? null;
        } else if (coordinate.x === 1 && coordinate.y === 0) {
            return zone?.at(1) ?? null;
        } else if (coordinate.x === 2 && coordinate.y === 0) {
            return zone?.at(2) ?? null;
        } else if (coordinate.x === 0 && coordinate.y === 1) {
            return zone?.at(3) ?? null;
        } else if (coordinate.x === 1 && coordinate.y === 1) {
            return zone?.at(4) ?? null;
        } else if (coordinate.x === 2 && coordinate.y === 1) {
            return zone?.at(5) ?? null;
        } else if (coordinate.x === 0 && coordinate.y === 2) {
            return zone?.at(6) ?? null;
        } else if (coordinate.x === 1 && coordinate.y === 2) {
            return zone?.at(7) ?? null;
        } else if (coordinate.x === 2 && coordinate.y === 2) {
            return zone?.at(8) ?? null;
        }

        return null;
    }

    return {getCell}
}