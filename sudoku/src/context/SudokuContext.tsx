import React, {useMemo, useState} from "react";
import {useSudoku, UseSudoku} from "../hooks/useSudoku";
import {Cell} from "../types/Cell";
import {Optional} from "typescript-optional";
import {Coordinate} from "../types/Coordinate";
import {useZone} from "../hooks/useZone";

export interface ISudokuContext {
    // Manager for the current board of Sudoku and the solution board
    // of current board Sudoku.
    sudoku: UseSudoku,
    // The current cell selected for the user, this cell can be null
    // if the user not selected any cell or the state of application
    // is beginning to run.
    currentCell: Optional<Cell>,
    // Function used for change the current cell selected for the user,
    // the use of this function produce a new render, the parameter of
    // this function can be null for indicate that the user not has
    // selected any cell.
    setCurrentCell: (cell: Optional<Cell>) => void,
    // Function used for change the value of cell in the board, is needed
    // provider the coordinate in the board and the coordinate of cell.
    setValueOfCell: (coordinateOfBoard: Coordinate, coordinateOfCell: Coordinate) => void
}

export const SudokuContext = React.createContext<ISudokuContext>({
    // Generally the Sudoku is instanced immediately to start the application.
    sudoku: {} as UseSudoku,
    // The initial state of cell is null, the user not selected any cell
    // when the application start.
    currentCell: Optional.empty(),
    // Emit a warning if the developer try use this function in the
    // current state.
    setCurrentCell: () => console.warn("Not Implemented"),
    setValueOfCell: () => console.warn("Not Implemented"),
})

interface ISudokuProvider {
    // Generally, more context or the principal content of application
    children: React.ReactNode,
}

export function SudokuProvider(props: ISudokuProvider) {
    // Use of use memo for avoid generate a new sudoku each interaction
    // of user with the state global of Context.
    const sudoku: UseSudoku = useMemo(() => useSudoku(), [])

    // The initial state of cell is null, the user not selected any cell
    // when the application start.
    const [currentCell, setCurrentCell] = useState<Optional<Cell>>(Optional.empty())

    const setValueOfCell = (coordinateOfBoard: Coordinate, coordinateOfCell: Coordinate) => {
        const zone = sudoku.board.getZone(coordinateOfCell);
        const cell = useZone(zone).getCell(coordinateOfCell);

        console.log(cell, 'Cell in Board')
    }

    return (
        <SudokuContext.Provider value={{
            sudoku,
            currentCell,
            setCurrentCell,
            setValueOfCell,
        }}>
            {props.children}
        </SudokuContext.Provider>
    )
}