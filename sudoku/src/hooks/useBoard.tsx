import {Coordinate} from "../types/Coordinate";

function useDelimited(board: number[]) {
    const zones = []
    for (let index = 0; index < board.length; index++) {
        zones.push({
            x: 0,
            y: 0,
            value: board.at(index)
        })
    }
    return zones;
}

export function useBoard(board: number[]) {
    const zones = useDelimited(board);

    const getZone = ({x, y}: Coordinate): number[] | null => {
        return null;
    }

    const getCell = ({x, y}: Coordinate): number | null => {
        return null;
    }

    return {zones, getZone, getCell}
}