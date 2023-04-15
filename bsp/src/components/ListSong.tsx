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

const PIXEL_OFFSET_Y: number = 25;

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

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min);
}

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

    const getRandomBackgroundColor = () => {
        const random: number = getRandomInt(0, 10);
        switch (random) {
            case 0:
                return "gold-80";
            case 1:
                return "grass-80";
            case 2:
                return "green-80";
            case 3:
                return "cyan-80";
            case 4:
                return "teal-80";
            case 5:
                return "violet-50";
            case 6:
                return "purple-50";
            case 7:
                return "fuchsia-50";
            case 8:
                return "pink-50";
            case 9:
                return "red-50";
            default:
                return "blue-50"
        }
    }

    const getTranslateForConsecutivesElements = (position: number) => {
        if (position > 0) {
            return `translateY(-${PIXEL_OFFSET_Y * position}px)`
        }
    }

    return (
        <div className={"display:flex flex:row p:0.4rem flex:wrap"}>
            {songs.map((song: TypeSong, index: number) => (
                <ButtonSong
                    key={song}
                    song={getSongByName(song)}
                    backgroundColor={getRandomBackgroundColor()}
                    className={getTranslateForConsecutivesElements(index)}/>
            ))}
        </div>
    )
}


interface ISong {
    song: Song,
    className?: string,
    backgroundColor: string,
}

function ButtonSong(props: ISong) {
    const appContext = useContext<IAppContext>(AppContext)

    const getBackgroundClass = () => " bg:" + props.backgroundColor

    const onClick = () => appContext.playSong(props.song);

    return (
        <div
            className={(props.className ?? " ") + " display:flex flex:row gap:1rem px:1rem align-items:center justify-content:space-between rt:2rem min-h:16rem w:100% text:center "
                + getBackgroundClass()} onClick={onClick}>
            <div className={"display:flex flex:1 justify-content:center"}>
                <div className={"r:50% bg:black w:6rem h:6rem"}/>
            </div>
            <div className={"display:flex flex:col flex:3"}>
                <h1 className={"text:start font-family:bahnschrift uppercase m:0 p:0"}>{props.song.title}</h1>
                <p className={"text:start font-family:bahnschrift opacity:0.5 m:0 p:0"}>Author: {props.song.author}</p>
                <p className={"text:start font-family:bahnschrift text:ellipsis opacity:0.5 m:0 p:0"}>Description: {props.song.comment}</p>
            </div>
        </div>
    )
}
