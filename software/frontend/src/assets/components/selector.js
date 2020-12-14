import React from 'react'
import '../css/ide.css'

class Selector extends React.Component {
    render() {
        return (
            <div className={"code-type text-center".concat(this.props.active ? " bg-active" : "")} onClick={this.props.selectionHandler}> 
                <a className="btn">{this.props.type}</a>
            </div>
        )
    }
}

export default Selector