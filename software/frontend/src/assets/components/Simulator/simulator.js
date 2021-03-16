import './simulator.css';
import { Row, Col, Spinner } from 'react-bootstrap';
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
        <Row>
            <Col>
                <div className={loaded ? "hide" : "center"}>
                    <Spinner variant="secondary" animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
                <div id="viewport" className={!loaded ? "hide" : ""}>
                    <iframe id="simulator" title="simulator" width="100%" height="100%" src="https://hopeful-sammet-24b01a.netlify.app/" scrolling="no"></iframe>
                </div>
            </Col>
        </Row>
    )
}

export default Simulator