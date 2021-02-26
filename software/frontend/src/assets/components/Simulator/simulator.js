import './simulator.css';
import { Row, Col } from 'react-bootstrap';

function Simulator() {
    return (
        <Row>
            <Col>
                <div id="viewport">
                    <iframe id="simulator" title="simulator" width="100%" height="100%" src="https://hopeful-sammet-24b01a.netlify.app/" scrolling="no"></iframe>
                </div>
            </Col>
        </Row>
    )
}

export default Simulator