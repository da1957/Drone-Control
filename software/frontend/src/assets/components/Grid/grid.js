import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { InputGroup, FormControl, Col, Button } from 'react-bootstrap'
import './grid.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

function VariableSelector(props) {
    return (
        <Col> 
            <InputGroup>
                <FormControl data-item={props.item.i} data-type="variable" type="text" placeholder="i" aria-label="variable" value={props.loopData[props.item.i].variable} onChange={props.onFormChange.bind(this)} />
                <InputGroup.Prepend>
                    {props.item.i.split('.')[0] === "for-loop" ? 
                        <InputGroup.Text>&#x2264;</InputGroup.Text> :
                        <InputGroup.Text>&#x2265;</InputGroup.Text>
                    }
                </InputGroup.Prepend>
                <FormControl data-item={props.item.i} data-type="value" type="text" placeholder="1" aria-label="value" value={props.loopData[props.item.i].value} onChange={props.onFormChange.bind(this)} />
            </InputGroup>
        </Col>
    )
}

export function createProgram(items, loopData) {
    //Dont want this func changing main items array
    var itemsCopy = [...items]
    var cmds = []

    for (var index = 0; index < itemsCopy.length; index++) {
        let item = itemsCopy[index]
        let itemName = item.i.split('.')[0]

        //This seems like bad code to me but then again so does all JS
        //Works as /xxx/.test(string) looks for substring xxx in string
        //As we are switching on true first case that evaluates to true will be picked
        //TODO: Refactor this
        var loopItems = []
        switch(true) {
                case /for-loop/.test(itemName):
                    loopItems = itemsCopy.slice(index+1)

                    if (loopData[item.i].value > 0) { //if loop val is 0 items below should only appear once but they are already in array
                        for (var i = 0; i < loopData[item.i].value; i++) {
                            itemsCopy.push.apply(itemsCopy, loopItems)
                        }
                    }

                    break
                case /while/.test(itemName):
                    loopItems = itemsCopy.slice(index+1)

                    if (loopData[item.i].value > 0) { //if loop val is 0 items below should only appear once but they are already in array
                        for (var j = loopData[item.i].value; j > 0; j--) {
                            itemsCopy.push.apply(itemsCopy, loopItems)
                        }
                    }
                    break
                case /turn/.test(itemName):
                    let turn_cmd = "cmd.".concat(itemName.replace(' ', '_'), "(45)")
                    cmds.push(turn_cmd)
                    break
                default:
                    let cmd = "cmd.".concat(itemName, "(1)")
                    cmds.push(cmd)
                    break
        }
    }

    var cmdsString = "commands = [".concat(cmds, "]")

    var program = `import math
import plot
import time
from simulator.controller import MissionPlanner, PositionController

# set this to True to enable the mission planner
use_planned_mission = True

class InternalCode:
    def __init__(self, simulator):
        print("initializing simulation at %s" % time.time())

        self.simulator = simulator

        if use_planned_mission:
            mission = MissionPlanner()
            self.mission_setup(mission)
            self.controller = PositionController(self.simulator.drone, mission.commands, True)

    def mission_setup(self, planner):
        import quadrotor.command as cmd

        ${cmdsString}

        planner.add_commands(commands)

    def measurement_callback(self, t, dt, navdata):
        """
        called for each measurement done by the drone
        """

        if use_planned_mission:
            # apply the computed control to as simulation input
            lin_vel, yaw_vel = self.controller.compute_input()
            self.simulator.set_input_world(lin_vel, yaw_vel)

        # plot navdata in 2d graph:

        # callback time step:
        plot.plot("d_time",  dt)

        # onboard speed:
        plot.plot("v_x",  navdata.vx)
        plot.plot("v_y",  navdata.vy)
        plot.plot("v_z",  navdata.vz)

`
    return program
}


export class Grid extends React.Component {
    state = {
        items: ["forward.1", "turn left.2", "forward.3"].map((i) => {
            return {
                i: i.toString(),
                x: 0,
                y: 0,
                w: 1,
                h: 1,
                isResizable: false,
            };
        }),
        counter: 2,
        loopData: {}
    };  
    sendMsg = () => {
        //Currently simulator does not respond but leaving here incase we need it in the future
        const handleResponse = function(e) {
            // console.log(e.data)
        }
        window.addEventListener("message", handleResponse, false)

        //Currently doing nothing but will create the program string by replacing the command array with our code blocks
        let program = createProgram(this.state.items, this.state.loopData)
    
        var iframe = document.getElementById("simulator")
        iframe.contentWindow.postMessage(JSON.stringify({message: "new program", program: program}), "*")

        //Dont think this works but we arent recieving messages yet anyway
        return () => window.removeEventListener("message", handleResponse)
    }
    onFormChange = (event) => {
        var newloopData = this.state.loopData
        var itemId = event.target.getAttribute("data-item")
        var type = event.target.getAttribute("data-type")
        
        if (type === "value") {
            newloopData[itemId].value = event.target.value
        } else {
            newloopData[itemId].variable = event.target.value
        }

        this.setState({ loopData: newloopData })
    }

    //TODO: Make a seperate block component, I tried but had problems with grid layout not rendering it, think you need to pass in lots of props
    //https://github.com/STRML/react-grid-layout/issues/299
    createElement(item) {
        //Create correct classname with blocktype and size
        //Have to split at a delim as each grid item needs a unique key so had to give them a number
        var blockType = item.i.split('.')[0]
        var className = "droppable-element code-block row ".concat(blockType)

        var inputRequired = false

        if (["for-loop", "while"].includes(blockType)) {
            className = className.concat(" no-flex-wrap")
            inputRequired = true
        }

        return (
            <div className={className} key={item.i} data-grid={item}>
                <Col>
                    <p className="mb-0 mt-1">{blockType}</p>
                </Col>

                {inputRequired && 
                    <VariableSelector {...this.state} item={item} onFormChange={this.onFormChange} />
                }

                <Col>
                    <a href="/#" className="btn" onClick={this.removeItem.bind(this, item)}>close</a>
                </Col>
            </div>
        );
    }
    onBreakPointChange = (breakpoint, cols) => {
        this.setState({breakpoint: breakpoint, cols: cols})
    }

    onLayoutChange = (layout) => {
        //this.props.onLayoutChange(layout);
        
        let sorted = [...this.state.items]

        //On layout change need to modify order of items array so we know what comes first when passing to AUTONAVx
        if (this.state.items.length > 1) {
            sorted.sort((x, y) => {
                //JS sort functions just need a negative or positive num to sort
                //This will find y pos of both items then negate them to get order
                return layout.find(obj => obj.i === x.i).y - layout.find(obj => obj.i === y.i).y
            })
        }
        
        this.setState({layout: layout, items: sorted});
    }

    removeItem(item) {
        this.setState({items: this.state.items.filter(x => x !== item)})
    }

    onDrop = (layout, layoutItem, event) => {
        //This will retrieve data added to event when block is dragged
        var blockType = event.dataTransfer.getData("blockType")
        var uniqueName = blockType + "." + this.state.counter
        var width = 1

        if (["for-loop", "while"].includes(blockType)) {
            var newloopData = this.state.loopData
            newloopData[uniqueName] = {value: 1, variable: "i"}
            this.setState({ loopData: newloopData })

            width = 2
        }  

        this.setState({items: this.state.items.concat({i: uniqueName, x: layoutItem.x, y: layoutItem.y, w:width, h:1, isResizable: false}), 
            counter: this.state.counter + 1})

    }

    render() {
        return (
            <div>
                <div>
                <Button className="mt-2" onClick={this.sendMsg} style={{display: "block", "marginRight": "0", "marginLeft": "auto"}}>load code</Button>
                </div>
                <ResponsiveGridLayout onLayoutChange={this.onLayoutChange}  onBreakpointChange={this.onBreakPointChange} isDroppable={true} onDrop={this.onDrop} {...this.props}>
                    {this.state.items.map((i) => this.createElement(i))}
                </ResponsiveGridLayout>
            </div>
        )
    }
}

Grid.defaultProps = {
    className: "layout",
    cols: {lg: 2, md: 2, sm: 2, xs: 2, xxs: 2},
    rowHeight: 40,
    vertical: false
}