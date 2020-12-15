import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Button } from 'reactstrap';
import '../css/ide.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ["for-loop.0", "while.1"].map(function(i) {
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
            loopValues: {"for-loop.0": 1, "while.1": 1}
        };
    }

    //TODO: Make a seperate block component, I tried but had problems with grid layout not rendering it, think you need to pass in lots of props
    //https://github.com/STRML/react-grid-layout/issues/299
    createElement(item) {
        //Create correct classname with blocktype and size
        //Have to split at a delim as each grid item needs a unique key so had to give them a number
        var blockType = item.i.split('.')[0]
        var className = "droppable-element code-block ".concat(blockType)

        var inputRequired = false

        if (blockType === "for-loop" || blockType === "while") {
            className = className.concat(" row no-flex-wrap")
            inputRequired = true
        } else {
            className = className.concat(" row")
        }

        return (
          <div className={className} key={item.i} data-grid={item}>
              <div className="col-7">
                <p>{blockType}</p>
              </div>
            {inputRequired &&
                    <div className="input-group input-group-sm col-3">
                        <div className="input-group-prepend">
                            <span class="input-group-text">i &#60;</span>
                        </div>
                        <input type="text" class="form-control" placeholder="1" aria-label="Less than" value={this.state.loopValues[item.i]} onChange={this.onFormChange.bind(this, item)}/>
                    </div>
            }
            <div className="col-2">
                <a className="btn" onClick={this.removeItem.bind(this, item)}>close</a>
            </div>
          </div>
        );
    }

    onFormChange = (item, event) => {
        var newLoopValues = this.state.loopValues
        newLoopValues[item.i] = event.target.value

        this.setState({ loopValues: newLoopValues })
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

        if (blockType == "for-loop" || blockType == "while") {
            var newLoopValues = this.state.loopValues
            newLoopValues[uniqueName] = 1
            this.setState({ loopValues: newLoopValues })

            width = 2
        }  

        //idk why this is needed but had a weird problem where it would have wrong y value so bodged it for now
        var yVal = layoutItem.y > 0 ? layoutItem.y -1 : layoutItem.y
        this.setState({items: this.state.items.concat({i: uniqueName, x: layoutItem.x, y: yVal, w:width, h:1, isResizable: false}), 
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
    rowHeight: 30,
    verticalCompact: false
}

export default Grid