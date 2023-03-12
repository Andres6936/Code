import React, {useEffect} from "react";

export function Sudoku() {
    useEffect(() => {

    }, [])

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
            <div id="n0tez">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
            </div>
            <table className="sudoku">
                <tbody>
                <tr>
                    <td id="b1"/>
                    <td id="b1"/>
                    <td id="b1"/>
                    <td id="b2"/>
                    <td id="b2"/>
                    <td id="b2"/>
                    <td id="b3"/>
                    <td id="b3"/>
                    <td id="b3"/>
                </tr>
                <tr>
                    <td id="b1"/>
                    <td id="b1"/>
                    <td id="b1"/>
                    <td id="b2"/>
                    <td id="b2"/>
                    <td id="b2"/>
                    <td id="b3"/>
                    <td id="b3"/>
                    <td id="b3"/>
                </tr>
                <tr>
                    <td id="b1"/>
                    <td id="b1"/>
                    <td id="b1"/>
                    <td id="b2"/>
                    <td id="b2"/>
                    <td id="b2"/>
                    <td id="b3"/>
                    <td id="b3"/>
                    <td id="b3"/>
                </tr>
                <tr>
                    <td id="b4"/>
                    <td id="b4"/>
                    <td id="b4"/>
                    <td id="b5"/>
                    <td id="b5"/>
                    <td id="b5"/>
                    <td id="b6"/>
                    <td id="b6"/>
                    <td id="b6"/>
                </tr>
                <tr>
                    <td id="b4"/>
                    <td id="b4"/>
                    <td id="b4"/>
                    <td id="b5"/>
                    <td id="b5"/>
                    <td id="b5"/>
                    <td id="b6"/>
                    <td id="b6"/>
                    <td id="b6"/>
                </tr>
                <tr>
                    <td id="b4"/>
                    <td id="b4"/>
                    <td id="b4"/>
                    <td id="b5"/>
                    <td id="b5"/>
                    <td id="b5"/>
                    <td id="b6"/>
                    <td id="b6"/>
                    <td id="b6"/>
                </tr>
                <tr>
                    <td id="b7"/>
                    <td id="b7"/>
                    <td id="b7"/>
                    <td id="b8"/>
                    <td id="b8"/>
                    <td id="b8"/>
                    <td id="b9"/>
                    <td id="b9"/>
                    <td id="b9"/>
                </tr>
                <tr>
                    <td id="b7"/>
                    <td id="b7"/>
                    <td id="b7"/>
                    <td id="b8"/>
                    <td id="b8"/>
                    <td id="b8"/>
                    <td id="b9"/>
                    <td id="b9"/>
                    <td id="b9"/>
                </tr>
                <tr>
                    <td id="b7"/>
                    <td id="b7"/>
                    <td id="b7"/>
                    <td id="b8"/>
                    <td id="b8"/>
                    <td id="b8"/>
                    <td id="b9"/>
                    <td id="b9"/>
                    <td id="b9"/>
                </tr>
                </tbody>
            </table>
            <button onClick={() => "generate()"}>Generate Puzzle</button>
            <div className="info"/>
        </>
    )
}