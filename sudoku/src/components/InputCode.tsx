import React, {useContext, useEffect, useState} from "react";
import {crc8, eee} from "../hooks/useLogic";
import {ISudokuContext, SudokuContext} from "../context/SudokuContext";
import {useLoad} from "../hooks/useLoad";

export function InputCode() {
    const sudoku = useContext<ISudokuContext>(SudokuContext)
    const [puzzleCode, setPuzzleCode] = useState<string>(sudoku.getHashBoard())

    useEffect(() => {
        if (puzzleCode.length === 81) {
            for (var packed: number[] = [], i = 0; i < 81; i += 2) {
                const num1 = Number(puzzleCode[i]);
                const num2 = Number(puzzleCode[i + 1]);

                let digit = 0;
                if (num1 >= 1 && num1 <= 9) digit += num1 << 4;
                if (num2 >= 1 && num2 <= 9) digit += num2;
                packed.push(digit);
            }
            const crc: number = crc8(packed);
            const output: number[] = [crc].concat(eee(packed, [crc]));
            console.log(output);
            // @ts-ignore
            useLoad(btoa(arst(output)).replace(/=/g, ""));

        } else {
            useLoad(puzzleCode);
        }
    }, [puzzleCode])

    return (
        <>
            <label className="label" htmlFor="c0de">
                Puzzle code:
            </label>
            <input
                value={puzzleCode}
                onChange={({target}) => setPuzzleCode(target.value)}
                className="code"
                id="c0de"
                placeholder="Paste sudoku string here"
                spellCheck="false"
            />
        </>
    )
}