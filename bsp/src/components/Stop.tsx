import {useContext, useState} from "react";
import {AppContext, IAppContext} from "../context/AppContext";
import {IconPlay} from "./icons/IconPlay";

type TypeState = "Stop" | "Resume";

export function Stop() {
    const appContext = useContext<IAppContext>(AppContext)
    const [currentState, setCurrentState] = useState<TypeState>('Stop')

    const onSwithPlay = () => {
        if (appContext.isPaused()) {
            appContext.resume()
            setCurrentState("Stop")
        } else {
            appContext.suspend()
            setCurrentState("Resume")
        }
    }

    const getIconByState = () => {
        if (currentState === "Stop") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                     className="bi bi-pause-fill color:blue-50" viewBox="0 0 16 16">
                    <path
                        d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                </svg>
            )
        } else if (currentState === "Resume") {
            return (
                <IconPlay/>
            )
        } else {
            console.error("Current State Not Implemented")
        }
    }

    return (
        <div
            className={"display:flex align-items:center justify-content:center p:0.5rem position:absolute top:15 right:20 r:50% b:2px|solid|blue-50"}
            onClick={onSwithPlay}>
            {getIconByState()}
        </div>
    )
}