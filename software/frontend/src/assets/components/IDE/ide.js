import React from 'react';
import './ide.css';
import { Grid } from '../Grid/grid';
import { CodeBlocks } from './CodeBlocks/codeBlocks';
import { Row, Col, Tab, Nav } from 'react-bootstrap'
import Sidebar from './Sidebar';

function SelectorItem(props) {
    return (
        <Nav.Item>
            <Nav.Link eventKey={props.name}>{props.name}</Nav.Link>
        </Nav.Item>
    )
}

function Selector() {
    return (
        <Nav variant="pills" className="flex-column">
            <SelectorItem name="Movement" />
            <SelectorItem name="Rotation" />
            <SelectorItem name="Loops" />
        </Nav>
    )
}

function IDE() {
    const movement = ["forward", "backward", "left", "right", "up", "down"]
    const rotation = ["turn left", "turn right"]
    const loops = ["for-loop", "while"]

    const items = [{category: "Movement", array: movement}, {category: "Rotation", array: rotation}, {category: "Loops", array: loops}]

    return (
        // <div>
        //     <Tab.Container defaultActiveKey="Movement">
        //         <Row style={{height: '50vh'}}>
        //             <Col sm={2} className="bg-light pt-2" style={{ 'borderRight': '1px solid #ccc' }}>
        //                 <Selector />
        //             </Col>
        //             <Col sm={2} className="bg-light pt-2">
        //                 <CodeBlocks items={items}/>
        //             </Col>
        //             <Col sm={8} className="bg-dark">
        //                 <Grid />
        //             </Col>
        //         </Row>
        //     </Tab.Container>
        //     <Sidebar items={items} />
        // </div>

        <div className="inline-flex w-100 mt-2">
            <Sidebar items={items} />
            <Grid />
        </div>
    )
}

export default IDE