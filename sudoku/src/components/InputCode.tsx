import React, {useContext, useEffect, useState} from "react";
import {crc8, eee} from "../hooks/useLogic";
import {ISudokuContext, SudokuContext} from "../context/SudokuContext";

interface Props {
    className?: string
}

export function InputCode(props: Props) {
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
            sudoku.loadBoardByHash(btoa(arst(output)).replace(/=/g, ""));

        } else {
            sudoku.loadBoardByHash(puzzleCode);
        }
    }, [puzzleCode])

    return (
        <div className={props.className}>
            <label className="color:white" htmlFor="c0de">
                Puzzle code:
            </label>
            <input
                value={puzzleCode}
                onChange={({target}) => setPuzzleCode(target.value)}
                className="py:0.3rem px:2rem bg:blue-60 border:none r:1rem color:white"
                id="c0de"
                placeholder="Paste sudoku string here"
                spellCheck="false"
            />
        </div>
    )
}