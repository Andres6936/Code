import React from "react";
import {useSudoku, UseSudoku} from "../hooks/useSudoku";

interface ISudokuContext {
    sudoku: UseSudoku
}

export const SudokuContext = React.createContext<ISudokuContext>({
    sudoku: {} as UseSudoku
})

interface ISudokuProvider {
    children: React.ReactNode,
}

export function SudokuProvider(props: ISudokuProvider) {
    const sudoku = useSudoku();

    return (
        <SudokuContext.Provider value={{
            sudoku: sudoku
        }}>
            {props.children}
        </SudokuContext.Provider>
    )
}