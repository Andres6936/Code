import React from "react";

interface IButton {
    number: number
}

function Button(props: IButton) {
    return (
        <button className={"px:1.5rem py:1rem bg:sky-88 border:none r:1rem"}>
            <p className={"m:0 p:0 font-size:1.5rem font:bold color:sky-50"}>
                {props.number}
            </p>
        </button>
    )
}

export function InputNotes() {
    return (
        <div id="n0tez">
            <div className={"display:flex flex:row gap:0.5rem align-items:center justify-content:center"}>
                <Button number={1}/>
                <Button number={2}/>
                <Button number={3}/>
                <Button number={4}/>
                <Button number={5}/>
            </div>

            <div className={"mt:1rem display:flex flex:row gap:0.5rem align-items:center justify-content:center"}>
                <Button number={6}/>
                <Button number={7}/>
                <Button number={8}/>
                <Button number={9}/>
            </div>
        </div>
    )
}