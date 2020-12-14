import React from 'react';
import '../css/ide.css'
import Grid from '../components/grid'

class IDE extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blockTypes: ["for-loop", "while", "forward", "backward", "left", "right", "left turn", "right turn"]
        }
    }

    render() {
        return (
            <div className="row outline">
                <div className="col-1 bg-lblue">
                    <div className="vr"></div>
                </div>
                <div className="col-2 bg-lgrey pt-2">
                    {this.state.blockTypes.map(blockName => <DraggableCodeBlock name={blockName} />)}
                </div>
                <div className="col-9 bg-dark" style={{height: '50vh'}}>
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