import React from "react";
import {InputCode} from "../components/InputCode";
import {InputNotes} from "../components/InputNotes";
import {Board} from "../components/Board";
import {InputOptions} from "../components/InputOptions";

export function Sudoku() {
    return (
        <div className={"min-h:100vh display:flex align-items:center justify-content:center "}>
            <div className={"display:flex flex:col w:50rem "}>
                <InputCode/>
                <InputNotes/>
                <Board/>
                <InputOptions/>
                <div className="info"/>
            </div>
        </div>
    )
}