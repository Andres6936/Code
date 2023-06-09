import {useContext, useEffect, useState} from "react";
import {AppContext, IAppContext} from "../context/AppContext";
import {Optional} from "typescript-optional";
import {Song} from "../types/Song";
import {Stop} from "../components/Stop";
import {ListSong} from "../components/ListSong";
import {IconFinger} from "../components/icons/IconFinger";

function Description() {
    const appContext = useContext<IAppContext>(AppContext)
    const song: Optional<Song> = appContext.getCurrentSong()

    const renderDescription = () => {
        if (song.isPresent()) {
            const information = song.get();
            return (
                <div>
                    <b>Title</b> = {information.title || "<i>none</i>"}<br/>
                    <b>Date</b> = {information.date || "<i>none</i>"}<br/>
                    <b>Author</b> = {information.author || "<i>none</i>"}<br/>
                    <b>BPM</b> = {information.bpm} {information.divide ? information.divide + "steps per beat" : ""}<br/>
                    <h2>Comment</h2>{information.comment || "<i>none</i>"}<br/>
                </div>
            )
        } else {
            return null
        }
    }

    return renderDescription();
}

export function Home() {
    return (
        <div className={"display:flex flex:col min-h:100vh bg:black"}>
            <div className={"display:flex flex:col p:1rem"}>
                <div className={"display:flex align-items:center justify-content:space-between"}>
                    <div
                        className={"r:50% w:2rem h:2rem border:1px|white|solid color:white display:flex align-items:center justify-content:center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                             className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </div>

                    <div
                        className={"r:50% w:2rem h:2rem border:1px|white|solid color:white display:flex align-items:center justify-content:center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-list-nested" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </div>
                </div>

                <h1 className={"font-family:antonio font-size:3.5rem color:white uppercase"}>Your Playlist</h1>

                <div
                    className={"display:flex flex:row align-items:center justify-content:space-between bb:1px|solid|#CCC mb:1rem"}>
                    <div className={"color:white opacity:0.5 font-size:1.2rem font-family:bahnschrift"}>
                        <p className={"p:0 mb:0.4rem"}>Search ...</p>
                    </div>
                    <div className={"color:white opacity:0.5"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                             className="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <ListSong/>
            <Description/>

            <div
                className={"position:sticky display:flex flex:row align-items:center gap:1rem bottom:3 left:3 right:3 bg:fade-84 r:2rem p:1rem"}>
                <div>
                    <div className={"display:flex align-items:center justify-content:center bg:black r:50% w:5rem h:5rem"}>
                        <div
                            className={"display:flex align-items:center justify-content:center r:50% bg:blue-50 p:0.3rem "}>
                            <IconFinger className={"color:white"}/>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className={"font-family:antonio uppercase m:0 p:0"}>You need to calm down</h2>
                    <p className={"font-family:arial m:0 mt:0.3rem p:0 opacity:0.8"}>Taylor Swift</p>
                    <div className={"display:flex flex:row align-items:center justify-content:space-between"}>
                        <p className={"font-family:arial opacity:0.8 color:blue-50"}>1:04</p>
                        <p className={"font-family:arial opacity:0.8"}>3:29</p>
                    </div>
                </div>
                <Stop/>
            </div>
        </div>
    )
}