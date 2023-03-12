import React from "react";
import {InputCode} from "../components/InputCode";
import {InputNotes} from "../components/InputNotes";
import {Board} from "../components/Board";
import {InputOptions} from "../components/InputOptions";

export function Sudoku() {
    return (
        <>
            <InputCode/>
            <InputNotes/>
            <Board/>
            <InputOptions/>
            <div className="info"/>
        </>
    )
}