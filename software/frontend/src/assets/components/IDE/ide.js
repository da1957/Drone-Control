import React from 'react';
import './ide.css';
import { Grid } from '../Grid/grid';
import { CodeBlocks } from './CodeBlocks/codeBlocks';
import { Row, Col, Tab, Nav } from 'react-bootstrap'

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
            <SelectorItem name="Loops" />
        </Nav>
    )
}

function IDE() {
    const movement = ["forward", "backward", "left", "right", "turn left", "turn right"]
    const loops = ["for-loop", "while"]

    const items = [{category: "Movement", array: movement}, {category: "Loops", array: loops}]

    return (
            <Tab.Container defaultActiveKey="Movement">
                <Row style={{height: '50vh'}}>
                    <Col sm={2} className="bg-light pt-2" style={{ 'borderRight': '1px solid #ccc' }}>
                        <Selector />
                    </Col>
                    <Col sm={2} className="bg-light pt-2">
                        <CodeBlocks items={items}/>
                    </Col>
                    <Col sm={8} className="bg-dark">
                        <Grid />
                    </Col>
                </Row>
            </Tab.Container>
    )
}

export default IDE