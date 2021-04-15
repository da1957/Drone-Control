import './simulator.css';
import { useEffect, useState } from 'react';

function Simulator() {
    useEffect(() => {
        const handleMsg = function(e) {
            if(e.data.source === "drone simulator" && e.data.message === "drone loaded") {
                setLoaded(true)
                window.removeEventListener("message", handleMsg)
            }
        }

        window.addEventListener("message", handleMsg, false);
    })

    const [loaded, setLoaded] = useState(false);

    return (
        <div className="flex justify-center items-center">
                <svg className={`absolute animate-spin h-10 w-10 ${loaded ? "hide" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            <div id="viewport" className={!loaded ? "hide" : ""}>
                <iframe id="simulator" title="simulator" width="100%" height="100%" src="https://hopeful-sammet-24b01a.netlify.app/" scrolling="no"></iframe>
            </div>
        </div>
    )
}

export default Simulator