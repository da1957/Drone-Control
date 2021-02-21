import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { InputGroup, FormControl, Col, Button } from 'react-bootstrap'
import '../css/grid.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

function VariableSelector(props) {
    return (
        <Col> 
            <InputGroup>
                <FormControl data-item={props.item.i} data-type="variable" type="text" placeholder="i" aria-label="variable" value={props.loopData[props.item.i].variable} onChange={props.onFormChange.bind(this)} />
                <InputGroup.Prepend>
                    <InputGroup.Text>&#x2264;</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl data-item={props.item.i} data-type="value" type="text" placeholder="1" aria-label="value" value={props.loopData[props.item.i].value} onChange={props.onFormChange.bind(this)} />
            </InputGroup>
        </Col>
    )
}

function createProgram(items, loopData) {
    let string = `import math
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

        commands = [
            cmd.down(0.5),
            cmd.right(1),
            cmd.turn_left(45),
            cmd.forward(math.sqrt(2)),
            cmd.turn_right(45),
            cmd.right(1),
            cmd.turn_left(45),
            cmd.forward(math.sqrt(0.5)),
            cmd.turn_left(90),
            cmd.forward(math.sqrt(0.5)),
            cmd.turn_left(45),
            cmd.forward(1),
            cmd.turn_right(45),
            cmd.backward(math.sqrt(2)),
            cmd.turn_left(45),
            cmd.forward(1),
        ]

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
    return string
}


class Grid extends React.Component {
    state = {
        items: ["for-loop.0", "while.1"].map((i) => {
            return {
                i: i.toString(),
                x: 0,
                y: 0,
                w: 2,
                h: 1,
                isResizable: false,
            };
        }),
        counter: 2,
        loopData: {"for-loop.0": {value: 1, variable: "i"}, "while.1": {value: 1, variable: "j"}}
    };  
    sendMsg = () => {
        //Currently simulator does not respond but leaving here incase we need it in the future
        const handleResponse = function(e) {
            console.log(e.data)
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
                    <a className="btn" onClick={this.removeItem.bind(this, item)}>close</a>
                </Col>
            </div>
        );
    }
    onBreakPointChange = (breakpoint, cols) => {
        this.setState({breakpoint: breakpoint, cols: cols})
    }

    onLayoutChange = (layout) => {
        //this.props.onLayoutChange(layout);
        this.setState({layout: layout});
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
                <Button className="mt-2" onClick={this.sendMsg} style={{display: "block", "marginRight": "0", "marginLeft": "auto"}}>run</Button>
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

export default Grid