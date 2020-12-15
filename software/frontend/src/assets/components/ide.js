import React from 'react';
import '../css/ide.css'
import Grid from '../components/grid'
import Selector from '../components/selector'

const loops = ["for-loop", "while"]
const movement = ["forward", "backward", "left", "right", "left turn", "right turn"]

class IDE extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blockTypes: loops
        }
    }

    handleLoops = () => {
        this.setState({ blockTypes: loops })
    }

    handleMovement = () => {
        this.setState({ blockTypes: movement })
    }

    render() {
        return (
            <div className="row outline">
                <div className="col-1 bg-lblue padding-0">
                    <div className="vr"></div>
                    <Selector type="loops" selectionHandler={this.handleLoops} active={this.state.blockTypes == loops} />
                    <Selector type="movement" selectionHandler={this.handleMovement} active={this.state.blockTypes == movement} />
                </div>
                <div className="col-2 bg-lgrey pt-2">
                    {this.state.blockTypes.map(blockName => <DraggableCodeBlock name={blockName} />)}
                </div>
                <div className="col-9 bg-dark overflow" style={{height: '50vh'}}>
                    <h1 className="h4 text-white">Code area</h1>
                    <Grid />
                </div>
            </div>
        )
    }
}

function DraggableCodeBlock(props) {
    var className = "droppable-element code-block " + props.name
    return (
        <div className={className} draggable={true} unselectable="on" onDragStart={e => e.dataTransfer.setData("blockType", props.name)}>{props.name}</div>
    )
}


export default IDE