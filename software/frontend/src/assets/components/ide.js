import React from 'react';
import '../css/ide.css';
import Grid from '../components/grid';
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
            <SelectorItem name="Loops" />
            <SelectorItem name="Movement" />
        </Nav>
    )
}

function CodeBlocks(props) {
    return (
        <Tab.Content>
            {Object.entries(props.items).map(([key, value]) => (
                <Tab.Pane eventKey={key}>
                    {value}
                </Tab.Pane>
            ))}
        </Tab.Content>
    )
}
function DraggableCodeBlock(props) {
    var className = "droppable-element code-block " + props.name
    return (
        <div className={className} draggable={true} unselectable="on" onDragStart={e => e.dataTransfer.setData("blockType", props.name)}>{props.name}</div>
    )
}

function IDE() {
    const loops = ["for-loop", "while"]
    const movement = ["forward", "backward", "left", "right", "left turn", "right turn"]
    
    const loopItems = (loops.map(blockName => <DraggableCodeBlock name={blockName} />));
    const movementItems = (movement.map(blockName => <DraggableCodeBlock name={blockName} />));

    const items = {"Loops": loopItems, "Movement": movementItems}

    return (
            <Tab.Container defaultActiveKey="Loops">
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