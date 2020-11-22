import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Button } from 'reactstrap';
import '../css/ide.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

class myFirstGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items: [0, 1, 2, 3].map(function(i) {
                return {
                    i: i.toString(),
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1,
                    isResizable: false,
                };
            }),
            counter: 4,
        };

        this.addItem = this.addItem.bind(this);
        this.onBreakPointChange = this.onBreakPointChange(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    createElement(item) {
        return (
          <div className="bg-lblue" key={item.i} data-grid={item}>
            {<span>{item.i}</span>}
            <Button className="remove" size="sm" onClick={this.removeItem.bind(this, item)}>x</Button>
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
    
    addItem() {
        var ypos = this.state.items[this.state.items.length - 1].y + 1
        var xpos = this.state.items[this.state.items.length - 1].x + 1
        
        this.setState({items: this.state.items[this.state.items.length - 1].w = 2})
        this.setState({items: this.state.items.concat({i: "n" + this.state.counter, x: xpos, y: ypos, w: 1, h: 1, isResizable: false}), counter: this.state.counter + 1});

    }

    removeItem(item) {
        this.setState({items: this.state.items.filter(x => x != item)})
    }

    render() {
        return (
            <div>   
                <Button onClick={() => {this.addItem()}}>Add Box</Button>
                <ResponsiveGridLayout onLayoutChange={this.onLayoutChange}  onBreakpointChange={this.onBreakPointChange}  {...this.props}>
                    {this.state.items.map(item => this.createElement(item))}
                </ResponsiveGridLayout>
            </div>
        )
    }
}

myFirstGrid.defaultProps = {
    className: "layout",
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 30
}

export default myFirstGrid