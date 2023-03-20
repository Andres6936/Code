import {OptionalCell} from "../types/Cell";
import {Coordinate} from "../types/Coordinate";

export interface UseZone {
    getCell: (coordinate: Coordinate) => number | null
}

export function useZone(zone: OptionalCell[] | null): UseZone {
    const getCell = (coordinate: Coordinate): number | null => {
        if (coordinate.x === 0 && coordinate.y === 0) {
            return zone?.at(0)?.value ?? null;
        } else if (coordinate.x === 1 && coordinate.y === 0) {
            return zone?.at(1)?.value ?? null;
        } else if (coordinate.x === 2 && coordinate.y === 0) {
            return zone?.at(2)?.value ?? null;
        } else if (coordinate.x === 0 && coordinate.y === 1) {
            return zone?.at(3)?.value ?? null;
        } else if (coordinate.x === 1 && coordinate.y === 1) {
            return zone?.at(4)?.value ?? null;
        } else if (coordinate.x === 2 && coordinate.y === 1) {
            return zone?.at(5)?.value ?? null;
        } else if (coordinate.x === 0 && coordinate.y === 2) {
            return zone?.at(6)?.value ?? null;
        } else if (coordinate.x === 1 && coordinate.y === 2) {
            return zone?.at(7)?.value ?? null;
        } else if (coordinate.x === 2 && coordinate.y === 2) {
            return zone?.at(8)?.value ?? null;
        }

        return null;
    }

    return {getCell}
}