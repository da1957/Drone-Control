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
                    w: 1,
                    h: 1,
                    isResizable: false,
                };
            }),
            counter: 2,
        };

        this.onBreakPointChange = this.onBreakPointChange(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    //TODO: Make a seperate block component, I tried but had problems with grid layout not rendering it, think you need to pass in lots of props
    //https://github.com/STRML/react-grid-layout/issues/299
    createElement(item) {
        //Create correct classname with blocktype and size
        //Have to split at a delim as each grid item needs a unique key so had to give them a number
        var blockType = item.i.split('.')[0]
        var className = "droppable-element code-block ".concat(blockType)

        blockType === "for-loop" || blockType === "while" 
            ? className = className.concat(" col-4") 
            : className = className.concat(" col-2")

        return (
          <div className={className} key={item.i} data-grid={item}>
            {blockType}
            <Button close onClick={this.removeItem.bind(this, item)}>x</Button>
          </div>
        );
      }

    onBreakPointChange(breakpoint, cols) {
        this.setState({breakpoint: breakpoint, cols: cols})
    }

    onLayoutChange(layout) {
        //this.props.onLayoutChange(layout);
        this.setState({layout: layout});
    }

    removeItem(item) {
        this.setState({items: this.state.items.filter(x => x !== item)})
    }

    onDrop = (layout, layoutItem, event) => {
        //This will retrieve data added to event when block is dragged
        var blockType = event.dataTransfer.getData("blockType")

        //idk why this is needed but had a weird problem where it would have wrong y value so bodged it for now
        var yVal = layoutItem.y > 0 ? layoutItem.y -1 : layoutItem.y
        this.setState({items: this.state.items.concat({i: blockType + "." + this.state.counter, x: layoutItem.x, y: yVal, w:1, h:1, isResizable: false}), 
        counter: this.state.counter + 1})
    }

    render() {
        return (
            <div>
                <ResponsiveGridLayout onLayoutChange={this.onLayoutChange}  onBreakpointChange={this.onBreakPointChange} isDroppable={true} onDrop={this.onDrop} {...this.props}>
                    {this.state.items.map(i => this.createElement(i))}
                </ResponsiveGridLayout>
            </div>
        )
    }
}

Grid.defaultProps = {
    className: "layout",
    cols: {lg: 1, md: 1, sm: 1, xs: 1, xxs: 1},
    rowHeight: 30
}

export default Grid