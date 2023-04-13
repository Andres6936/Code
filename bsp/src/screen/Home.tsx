import {useContext, useEffect, useState} from "react";
import {AppContext, IAppContext} from "../context/AppContext";

const BSP = {};
const songs = [
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
    return (
        <div>
            <b>Title</b> = {BSP.SONG.title || "<i>none</i>"}<br/>
            <b>Date</b> = {BSP.SONG.date || "<i>none</i>"}<br/>
            <b>Author</b> = {BSP.SONG.author || "<i>none</i>"}<br/>
            <b>BPM</b> = {BSP.SONG.bpm} {BSP.SONG.divide ? BSP.SONG.divide + "steps per beat" : ""}<br/>
            <h2>Comment</h2>{BSP.SONG.comment || "<i>none</i>"}<br/>
        </div>
    )
}

export function Home() {
    useEffect(() => {
        for (var s = '', i = 0; i < songs.length; i++) {
            s += `<a id=z href=?${songs[i]}>${songs[i]}</a>`;
        }
        const script = document.createElement("script");
        const element = document.querySelector("div#z7i");
        if (element) {
            element.innerHTML = s
        }

        if (location.search.length && songs.indexOf(location.search.slice(1)) > -1) {
            const s2 = document.createElement("script");
            script.src = "bsp.js";
            s2.src = "songs/" + location.search.slice(1) + ".js";
            document.head.append(script), document.head.append(s2);
        }
    }, [])

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
            <div id="z7i"></div>
            <Description/>
        </div>
    )
}