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

export function ListSong() {
    const getSongByName = (name: TypeSong): Song => {
        switch (name) {
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

    return (
        <div className={"display:flex flex:row p:0.4rem flex:wrap"}>
            {songs.map(song => <ButtonSong key={song} song={getSongByName(song)}/>)}
        </div>
    )
}


interface ISong {
    song: Song
}

function ButtonSong(props: ISong) {
    const appContext = useContext<IAppContext>(AppContext)


    const onClick = () => appContext.playSong(props.song);

    return (
        <div className={"rt:2rem py:8rem w:100% bg:gold-80 text:center"} onClick={onClick}>
            <p>{props.song.title}</p>
        </div>
    )
}
