import {Cell} from "../types/Cell";


/**
 * Hook used for convert the one-dimension board coordinate to
 * two-dimension board coordinate, the values in the board not
 * will be mutated.
 *
 * @param board An Sudoku board, the param is an array with exactly 81
 * elements in these, indicate each cell in the board and the value.
 */
export function useDelimited(board: readonly number[]): Cell[] {
    const zones: Cell[] = []
    let axisX = 0;
    let axisY = 0;
    for (let index = 0; index < board.length; index++) {
        zones.push({
            x: axisX,
            y: axisY,
            value: board.at(index) as number
        })
        // Advance in the X-axis
        axisX += 1;
        // If reach the 9 element in the X-axis, advance in the Y-axis and
        // reset the X-axis to begin.
        if (axisX === 9) {
            // Reset the X-axis to begin
            axisX = 0;
            // Advance in the Y-axis
            axisY += 1;
        }
    }
    return zones;
}