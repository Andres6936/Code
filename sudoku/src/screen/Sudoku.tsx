import React from "react";
import {InputCode} from "../components/InputCode";
import {InputNotes} from "../components/InputNotes";
import {Board} from "../components/Board";
import {InputOptions} from "../components/InputOptions";

export function Sudoku() {
    return (
        <div className={"min-h:100vh bg:blue-50  display:flex "}>
            <div className={"display:flex flex:col w:50rem"}>
                <div className={"flex:1"}>
                    <InputOptions/>
                    <InputCode className={"display:flex gap:1rem flex:1 align-items:center justify-content:center"}/>
                </div>
                <div className={"flex:3 bg:white px:8 rt:2rem"}>
                    <Board/>
                    <InputNotes/>
                    <div className="info"/>
                </div>
            </div>
        </div>
    )
}