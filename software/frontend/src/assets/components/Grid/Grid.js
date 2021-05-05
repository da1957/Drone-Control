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

    constructor(props) {
        super(props)
        
        this.state = {
            fileDownloadUrl: null,
        };
        this.saveBlocks = this.saveBlocks.bind(this);
        this.uploadBlocks = this.uploadBlocks.bind(this);
        this.loadBlocks = this.loadBlocks.bind(this);
    }

    sendMsg = () => {
        if (this.props.state.step === 5) this.props.dispatch({type: "incStep"})
        //Currently simulator does not respond but leaving here incase we need it in the future
        const handleResponse = function (e) {
            // console.log(e.data)
        }
        window.addEventListener("message", handleResponse, false)

        var sorted = [...this.props.state.layout]
        sorted.sort((x, y) => {
            //JS sort functions just need a negative or positive num to sort
            //This will find y pos of both items then negate them to get order
            return sorted.find(obj => obj.i === x.i).y - sorted.find(obj => obj.i === y.i).y
        })

        let program = createProgram(sorted, this.props.state.variableData)

        var iframe = document.getElementById("simulator")
        iframe.contentWindow.postMessage(JSON.stringify({ message: "new program", program: program }), "https://hopeful-sammet-24b01a.netlify.app/")

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
        this.props.dispatch({ type: "layoutChange", payload: layout })
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
        const JSONstate = localStorage.getItem("state")
        if (JSONstate) {
            let state = JSON.parse(JSONstate)

            //need to update items with correct order, items may not be saved with updated y vals
            //layout always has updated y vals but also needs to be sorted for items
            //may be a better way to do this but this works
            state.items = state.layout.sort((x, y) => {
                return state.layout.find(obj => obj.i === x.i).y - state.layout.find(obj => obj.i === y.i).y
            })

            this.props.dispatch({type: "setState", payload: state})
        }
    }

    saveBlocks(event) {
        event.preventDefault();
        let blocks = localStorage.getItem("state");
        const blob = new Blob([blocks]);
        const fileDownloadUrl = URL.createObjectURL(blob);

        this.setState ({fileDownloadUrl: fileDownloadUrl}, 
            () => {
              this.dofileDownload.click(); 
              // Free up storage
              URL.revokeObjectURL(fileDownloadUrl);
              this.setState({fileDownloadUrl: ""})
          })
    }

    uploadBlocks(event) {
        event.preventDefault();
        this.dofileUpload.click()
    }

    loadBlocks(event) {
        const fileObj = event.target.files[0];
        const reader = new FileReader();
          
        let fileloaded = e => {
            const fileContents = e.target.result;
            localStorage.removeItem("state")
            localStorage.setItem("state", fileContents)

            const JSONstate = localStorage.getItem("state")
            if (JSONstate) {
                let state = JSON.parse(JSONstate)

                state.items = state.layout.sort((x, y) => {
                    return state.layout.find(obj => obj.i === x.i).y - state.layout.find(obj => obj.i === y.i).y
                })

                this.props.dispatch({type: "setState", payload: state})
            }
        }
      
        fileloaded = fileloaded.bind(this);
        reader.onload = fileloaded;
        reader.readAsText(fileObj);
    }

    render() {
        return (
            <div className="flex flex-col w-full bg-gray-600 rounded">
                <a className="hidden" download = "program.txt" href={this.state.fileDownloadUrl} ref={e=>this.dofileDownload = e}>download</a>
                <input type="file" className="hidden" multiple={false} accept=".txt,.text,text/csv,text/plain" onChange={event => this.loadBlocks(event)} ref={e=>this.dofileUpload = e} />
                <div className="py-1 bg-gray-500 rounded">
                    <div className="btns">
                        <button className="block ml-auto mr-1 bg-blue-500 rounded py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={this.saveBlocks}>
                            <span className="text-white px-2">save codeblocks</span>
                        </button>
                        <button className="block ml-auto mr-1 bg-blue-500 rounded py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={this.uploadBlocks}>
                            <span className="text-white px-2">upload codeblocks</span>
                        </button>
                        <button data-tut="reactour_loadcode" className="block ml-auto mr-1 bg-blue-500 rounded py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={this.sendMsg}>
                            <span className="text-white px-2">load code</span>
                        </button>
                    </div>
                </ div>
                <div data-tut="reactour_grid" className="h-full my-2 overflow-y-auto overflow-x-hidden overscroll-none scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-gray-600">
                    <ResponsiveGridLayout containerPadding={[10, 0]} style={{ height: "100%" }} onLayoutChange={this.onLayoutChange} onBreakpointChange={this.onBreakPointChange} isDroppable={true} onDrop={this.onDrop} {...this.props}>
                        {this.props.state.items.map((item) => (<GridElement key={item.i} item={item} variableData={this.props.state.variableData} onFormChange={this.onFormChange} removeItem={this.removeItem.bind(this, item)} />))}
                    </ResponsiveGridLayout>
                </div>
            </div>
        )
    }
}

Grid.defaultProps = {
    className: "layout",
    cols: { lg: 1, md: 1, sm: 1, xs: 1, xxs: 1 },
    rowHeight: 40,
    compactType: "vertical"
}

export default withHooksHOC(Grid);
