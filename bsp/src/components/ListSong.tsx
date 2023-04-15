import {useContext} from "react";
import {AppContext, IAppContext} from "../context/AppContext";
import {TypeSong} from "../types/TypeSong";
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
import {useAutomation} from "../songs/Automation";
import {Song} from "../types/Song";

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
