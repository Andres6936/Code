import {useContext, useEffect, useState} from "react";
import {AppContext, IAppContext} from "../context/AppContext";
import {Optional} from "typescript-optional";
import {Song} from "../types/Song";
import {useOld} from "../songs/Old";
import {useMono} from "../songs/Mono";
import {useCool} from "../songs/Cool";
import {usePoly} from "../songs/Poly";
import {useSwell} from "../songs/Swell";
import {useOrgan} from "../songs/Organ";
import {useStormlord2} from "../songs/Stormlord2";
import {useWavetablez} from "../songs/Wavetablez";
import {useWavetablez2} from "../songs/Wavetablez2";
import {useAutomation2} from "../songs/Automation2";
import {useWavetablez3} from "../songs/Wavetablez3";
import { useAutomation } from "../songs/Automation";

type TypeSong =
    "old" |
    "mono" |
    "cool" |
    "poly" |
    "swell" |
    "organ" |
    "stormlord2" |
    "automation" |
    "wavetablez" |
    "wavetablez2" |
    "automation2" |
    "wavetablez3";

function Stop() {
    const appContext = useContext<IAppContext>(AppContext)
    const [currentState, setCurrentState] = useState<string>('Stop')

    const onSwithPlay = () => {
        if (appContext.isPaused()) {
            appContext.resume()
            setCurrentState("Stop")
        } else {
            appContext.suspend()
            setCurrentState("Resume")
        }
    }

    return (
        <a onClick={onSwithPlay} href="#" id="wat">{currentState}</a>
    )
}

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

interface ISong {
    song: TypeSong
}

export function ButtonSong(props: ISong) {
    const appContext = useContext<IAppContext>(AppContext)

    const getSong = (): Song => {
        switch (props.song) {
            case "old":
                return useOld();
            case "mono":
                return useMono();
            case "cool":
                return useCool();
            case "poly":
                return usePoly();
            case "swell":
                return useSwell();
            case "organ":
                return useOrgan();
            case "stormlord2":
                return useStormlord2()
            case "automation":
                return useAutomation()
            case "wavetablez":
                return useWavetablez()
            case "wavetablez2":
                return useWavetablez2()
            case "automation2":
                return useAutomation2()
            case "wavetablez3":
                return useWavetablez3()
        }
    }

    const onClick = () => appContext.playSong(getSong());

    return (
        <div className={"p:1rem r:1rem min-w:5rem bg:white text:center"} onClick={onClick}>
            <p>{props.song}</p>
        </div>
    )
}

export function ListSong() {
    const songs: TypeSong[] = [
        "old",
        "mono",
        "organ",
        "cool",
        "poly",
        "swell",
        "stormlord2",
        "automation",
        "automation2",
        "wavetablez",
        "wavetablez2",
        "wavetablez3",
    ];

    return (
        <div className={"display:flex flex:row flex:wrap gap:1rem"}>
            {songs.map(song => <ButtonSong key={song} song={song}/>)}
        </div>
    )
}

export function Home() {
    return (
        <div className={"display:flex flex:col p:1rem min-h:100vh bg:black"}>
            <div className={"display:flex align-items:center justify-content:space-between"}>
                <div className={"r:50% w:2rem h:2rem border:1px|white|solid color:white display:flex align-items:center justify-content:center" }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                </div>

                <div className={"r:50% w:2rem h:2rem border:1px|white|solid color:white display:flex align-items:center justify-content:center" }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-nested" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </div>
            </div>

            <h1 className={"font-family:bahnschrift font-size:2.5rem color:white uppercase"}>Your Playlist</h1>

            <div className={"display:flex flex:row align-items:center justify-content:space-between bb:1px|solid|#CCC"}>
                <div className={"color:white opacity:0.5 font-size:1.2rem font-family:bahnschrift"}>
                    <p className={"p:0 mb:0.4rem"}>Search ...</p>
                </div>
                <div className={"color:white opacity:0.5"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
            </div>

            <Stop/>
            <ListSong/>
            <Description/>
        </div>
    )
}