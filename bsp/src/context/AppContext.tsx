import React, {useMemo} from 'react'
import {useBSP} from "../logic/useBSP";
import {Song} from "../types/Song";
import {Optional} from "typescript-optional";

export interface IAppContext {
    getCurrentSong: () => Optional<Song>,
    isPaused: () => boolean,
    suspend: () => void,
    resume: () => void,
}

export const AppContext = React.createContext<IAppContext>({
    getCurrentSong: () => {
        console.warn("Not Implemented")
        return Optional.empty();
    },
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
    const BSP = useMemo(() => useBSP(), [])
    
    const getCurrentSong = (): Optional<Song> => {
        if (BSP.SONG) {
            return Optional.of(BSP.SONG)
        } else {
            return Optional.empty();
        }
    }

    const isPaused = () => BSP.paused
    
    const suspend = () => {
        BSP.ctx.suspend();
        BSP.paused = true;
    }
    
    const resume = () => {
        BSP.ctx.resume();
        BSP.paused = false;
    }
    
    return (
        <AppContext.Provider value={{
            getCurrentSong,
            isPaused,
            suspend,
            resume,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}