import {Cell} from "../types/Cell";
import {Coordinate} from "../types/Coordinate";
import {Optional} from "typescript-optional";

export interface UseZone {
    getCell: (coordinate: Coordinate) => number | null
}

export function useZone(zone: Optional<Cell>[] | null): UseZone {
    const getCell = (coordinate: Coordinate): number | null => {
        if (coordinate.x === 0 && coordinate.y === 0) {
            return zone?.at(0)?.map(cell => cell.value).orNull() ?? null;
        } else if (coordinate.x === 1 && coordinate.y === 0) {
            return zone?.at(1)?.map(cell => cell.value).orNull() ?? null;
        } else if (coordinate.x === 2 && coordinate.y === 0) {
            return zone?.at(2)?.map(cell => cell.value).orNull() ?? null;
        } else if (coordinate.x === 0 && coordinate.y === 1) {
            return zone?.at(3)?.map(cell => cell.value).orNull() ?? null;
        } else if (coordinate.x === 1 && coordinate.y === 1) {
            return zone?.at(4)?.map(cell => cell.value).orNull() ?? null;
        } else if (coordinate.x === 2 && coordinate.y === 1) {
            return zone?.at(5)?.map(cell => cell.value).orNull() ?? null;
        } else if (coordinate.x === 0 && coordinate.y === 2) {
            return zone?.at(6)?.map(cell => cell.value).orNull() ?? null;
        } else if (coordinate.x === 1 && coordinate.y === 2) {
            return zone?.at(7)?.map(cell => cell.value).orNull() ?? null;
        } else if (coordinate.x === 2 && coordinate.y === 2) {
            return zone?.at(8)?.map(cell => cell.value).orNull() ?? null;
        }

        return null;
    }

    return {getCell}
}