import React from 'react'
import ReactDOM from 'react-dom/client'
import '@master/css';
import {Sudoku} from "./screen/Sudoku";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Sudoku/>
    </React.StrictMode>,
)
