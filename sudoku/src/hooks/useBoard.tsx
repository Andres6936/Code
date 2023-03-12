import {Coordinate} from "../types/Coordinate";

function useDelimited(board: number[]) {
    const zones = []
    let axisX = 0;
    let axisY = 0;
    for (let index = 0; index < board.length; index++) {
        zones.push({
            x: axisX,
            y: axisY,
            value: board.at(index)
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
    const zones = useDelimited(board);

    const getZone = ({x, y}: Coordinate): number[] | null => {
        return null;
    }

    const getCell = ({x, y}: Coordinate): number | null => {
        return null;
    }

    return {zones, getZone, getCell}
}