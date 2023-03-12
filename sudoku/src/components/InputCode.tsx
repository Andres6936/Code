import React from "react";

export function InputCode() {
    return (
        <>
            <label className="label" htmlFor="c0de">
                Puzzle code:
            </label>
            <input
                className="code"
                id="c0de"
                placeholder="Paste sudoku string here"
                spellCheck="false"
            />
        </>
    )
}