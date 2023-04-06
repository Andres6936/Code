import React, {useEffect} from "react";
import {Zone} from "./Zone";

export function Board() {
    useEffect(() => {
        addEventListener('keydown', onKeyDown);

        return () => {
            removeEventListener('keydown', onKeyDown);
        }
    }, [])

    const onKeyDown = (event: KeyboardEvent) => {
        console.log(event.key, 'Key')
    }

    return (
        <div className="sudoku max-w:35rem my:2rem">
            <div className={"display:flex flex:row"}>
                <Zone coordinate={{x: 0, y: 0}}/>
                <Zone coordinate={{x: 1, y: 0}}/>
                <Zone coordinate={{x: 2, y: 0}}/>
            </div>

            <div className={"display:flex flex:row"}>
                <Zone coordinate={{x: 0, y: 1}}/>
                <Zone coordinate={{x: 1, y: 1}}/>
                <Zone coordinate={{x: 2, y: 1}}/>
            </div>

            <div className={"display:flex flex:row"}>
                <Zone coordinate={{x: 0, y: 2}}/>
                <Zone coordinate={{x: 1, y: 2}}/>
                <Zone coordinate={{x: 2, y: 2}}/>
            </div>
        </div>
    )
}