import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './grid.css'
import './addCmds'
import createProgram from './addCmds';
import GridElement from './GridElement/GridElement';
import { useItemsContext } from '../../../services/ItemsContext';

const ResponsiveGridLayout = WidthProvider(Responsive)

const withHooksHOC = (Component) => {
    return (props) => {
        const { state, dispatch } = useItemsContext();

        return <Component state={state} dispatch={dispatch} {...props} />
    }
}

class Grid extends React.Component {
    sendMsg = () => {
        //Currently simulator does not respond but leaving here incase we need it in the future
        const handleResponse = function (e) {
            // console.log(e.data)
        }
        window.addEventListener("message", handleResponse, false)

        let program = createProgram(this.props.state.layout, this.props.state.variableData)

        var iframe = document.getElementById("simulator")
        iframe.contentWindow.postMessage(JSON.stringify({ message: "new program", program: program }), "*")

        //Dont think this works but we arent recieving messages yet anyway
        return () => window.removeEventListener("message", handleResponse)
    }

    onFormChange = (event) => {
        var newvariableData = this.props.state.variableData
        var itemId = event.target.getAttribute("data-item")
        var type = event.target.getAttribute("data-type")

        if (type === "value") {
            newvariableData[itemId].value = event.target.value
        } else {
            newvariableData[itemId].variable = event.target.value
        }

        this.props.dispatch({ type: "formChange", payload: newvariableData })
        this.updateStorage()
    }

    onBreakPointChange = (breakpoint, cols) => {
        this.props.dispatch({ type: "breakpointChange", payload: { breakpoint: breakpoint, cols: cols } })
        this.updateStorage()
    }

    onLayoutChange = (layout) => {
        var sorted = [...layout]
         
        //I do not know why this has to be sorted, layout should be sorted, but sometimes it isnt
        //sometimes this also sorts backwards and I dont know why
        //but I do know without sorting it breaks and I wasted half an hour trying to remove it
        sorted.sort((x, y) => {
            //JS sort functions just need a negative or positive num to sort
            //This will find y pos of both items then negate them to get order
            return layout.find(obj => obj.i === x.i).y - layout.find(obj => obj.i === y.i).y
        })

        this.props.dispatch({ type: "layoutChange", payload: sorted })
        this.updateStorage()
    }

    removeItem(item) {
        let newVariableData = {...this.props.state.variableData}
        delete newVariableData[item.i]

        if (Object.keys(newVariableData).length === 0) this.props.dispatch({type: "resetCount"})

        this.props.dispatch({ type: "removeItem", payload:{
            items: this.props.state.items.filter(x => x !== item), 
            variableData: newVariableData
        }})
        this.updateStorage()
    }

    onDrop = (layout, layoutItem, event) => {
        //This will retrieve data added to event when block is dragged
        var blockType = event.dataTransfer.getData("blockType")

        this.props.dispatch({ type: "addItem", payload: { name: blockType, layoutItem: layoutItem, layout: layout } })
        this.updateStorage()

    }
    updateStorage() {
        localStorage.removeItem("state")
        localStorage.setItem("state", JSON.stringify(this.props.state))
    }

    //React Life Cyle
    componentDidMount() {
        const state = localStorage.getItem("state")
        if (state) {
            this.props.dispatch({type: "setState", payload: JSON.parse(state)})
        }
    }

    render() {
        return (
            <div className="flex flex-col w-full bg-gray-600 rounded">
                <div className="py-1 bg-gray-500 rounded">
                    <button className="block ml-auto mr-1 bg-blue-500 rounded py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={this.sendMsg}>
                        <span className="text-white px-2">load code</span>
                    </button>
                </div>
                <div className="h-full my-2 overflow-y-auto overflow-x-hidden overscroll-none scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-gray-600">
                    <ResponsiveGridLayout containerPadding={[10, 0]} style={{ height: "100%" }} onLayoutChange={this.onLayoutChange} onBreakpointChange={this.onBreakPointChange} isDroppable={true} onDrop={this.onDrop} {...this.props}>
                        {this.props.state.items.map((item) => (<GridElement key={item.i} item={item} variableData={this.props.state.variableData} onFormChange={this.onFormChange} removeItem={this.removeItem.bind(this, item)} />))}
                    </ResponsiveGridLayout>
                </div>
                <div></div>
            </div>
        )
    }
}

Grid.defaultProps = {
    className: "layout",
    cols: { lg: 1, md: 1, sm: 1, xs: 1, xxs: 1 },
    rowHeight: 40,
    items: 0,
    compactType: "vertical"
}

export default withHooksHOC(Grid);
