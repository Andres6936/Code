import React, {useMemo, useState} from "react";
import {useSudoku, UseSudoku} from "../hooks/useSudoku";
import {Cell} from "../types/Cell";
import {Optional} from "typescript-optional";

interface ISudokuContext {
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
    setCurrentCell: (cell: Optional<Cell>) => void
}

export const SudokuContext = React.createContext<ISudokuContext>({
    sudoku: {} as UseSudoku,
    currentCell: Optional.empty(),
    setCurrentCell: () => console.warn("Not Implemented")
})

interface ISudokuProvider {
    children: React.ReactNode,
}

export function SudokuProvider(props: ISudokuProvider) {
    const sudoku = useMemo(() => useSudoku(), [])
    const [currentCell, setCurrentCell] = useState<Optional<Cell>>(Optional.empty())

    return (
        <SudokuContext.Provider value={{
            sudoku,
            currentCell,
            setCurrentCell
        }}>
            {props.children}
        </SudokuContext.Provider>
    )
}