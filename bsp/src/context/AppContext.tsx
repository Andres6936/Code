import React, {useMemo} from 'react'
import {useBSP} from "../logic/useBSP";
import {Song} from "../types/Song";
import {Optional} from "typescript-optional";

export interface IAppContext {
    getCurrentSong: () => Optional<Song>,
    playSong: (song: Song) => void,
    isPaused: () => boolean,
    suspend: () => void,
    resume: () => void,
}

export const AppContext = React.createContext<IAppContext>({
    getCurrentSong: () => {
        console.warn("Not Implemented")
        return Optional.empty();
    },
    playSong: () => console.warn("Not Implemented"),
    isPaused: () => {
        console.warn("Not Implemented")
        return true
    },
    suspend: () => console.warn("Not Implemented"),
    resume: () => console.warn("Not Implemented"),
})

interface Props {
    children: React.ReactNode
}

export function AppContextProvider(props: Props) {
    const BSP = useBSP();

    const getCurrentSong = (): Optional<Song> => {
        if (BSP.getCurrentSong().isPresent()) {
            return Optional.of(BSP.getCurrentSong().get())
        } else {
            return Optional.empty();
        }
    }

    const playSong = (song: Song) => {
        BSP.changeSong(Optional.of(song));
        BSP.startSong();
    }

    const isPaused = (): boolean => BSP.isPaused

    const suspend = () => BSP.pause();

    const resume = () => BSP.resume();

    return (
        <AppContext.Provider value={{
            getCurrentSong,
            playSong,
            isPaused,
            suspend,
            resume,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}