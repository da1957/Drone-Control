import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { InputGroup, FormControl, Col } from 'react-bootstrap'
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