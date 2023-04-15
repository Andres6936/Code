import {useContext, useEffect, useState} from "react";
import {AppContext, IAppContext} from "../context/AppContext";
import {Optional} from "typescript-optional";
import {Song} from "../types/Song";
import {useAutomation} from "../songs/Old";
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
                return useOrgan();
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
        <div className={"display:flex flex:row gap:1rem"}>
            {songs.map(song => <ButtonSong key={song} song={song}/>)}
        </div>
    )
}

export function Home() {
    return (
        <div>
            <div id="z6i">
                This is a testbed for BSP1, my prototype music sequencer/synth, very much an alpha and not yet fully
                realized. But
                enjoy the music anyway.
                Uses only basic Web Audio API components.
                <a target="_blank" href="http://github.com/bryc/code/tree/master/bsp">Repo/more info here</a>.
            </div>

            <Stop/>
            <ListSong/>
            <Description/>
        </div>
    )
}