import React from 'react'
import ReactDOM from 'react-dom/client'
import '@master/css';
import {Sudoku} from "./screen/Sudoku";
import {SudokuProvider} from "./context/SudokuContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <SudokuProvider>
            <Sudoku/>
        </SudokuProvider>
    </React.StrictMode>,
)
