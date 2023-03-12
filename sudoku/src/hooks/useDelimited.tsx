import {Cell} from "../types/Cell";

export function useDelimited(board: number[]) {
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