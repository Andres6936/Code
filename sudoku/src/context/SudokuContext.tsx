import React, {useMemo, useState} from "react";
import {useSudoku, UseSudoku} from "../hooks/useSudoku";
import {Cell} from "../types/Cell";
import {Optional} from "typescript-optional";

interface ISudokuContext {
    sudoku: UseSudoku,
    currentCell: Optional<Cell>,
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