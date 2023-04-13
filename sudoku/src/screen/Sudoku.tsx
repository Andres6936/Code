import React from "react";
import {InputCode} from "../components/InputCode";
import {InputNotes} from "../components/InputNotes";
import {Board} from "../components/Board";
import {InputOptions} from "../components/InputOptions";

export function Sudoku() {
    return (
        <div className={"min-h:100vh bg:blue-50  display:flex "}>
            <div className={"display:flex flex:col w:50rem"}>
                <InputCode className={"flex:1"}/>
                <div className={"flex:4 bg:white px:8 rt:2rem"}>
                    <Board/>
                    <InputNotes/>
                    <InputOptions/>
                    <div className="info"/>
                </div>
            </div>
        </div>
    )
}