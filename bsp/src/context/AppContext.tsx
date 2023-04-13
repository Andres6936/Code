import React, {useMemo} from 'react'
import {useBSP} from "../logic/useBSP";

export interface IAppContext {
    isPaused: () => boolean,
    suspend: () => void,
    resume: () => void,
}

export const AppContext = React.createContext<IAppContext>({
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
            isPaused,
            suspend,
            resume,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}