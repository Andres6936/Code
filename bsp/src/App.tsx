import React from 'react'
import ReactDOM from 'react-dom/client'
import '@master/css';
import {Home} from "./screen/Home";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Home/>
    </React.StrictMode>,
)
