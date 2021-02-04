import React from 'react'

class Selector extends React.Component {
    render() {
        return (
            <div className={"text-center".concat(this.props.active ? " bg-active" : "")} onClick={this.props.selectionHandler}> 
                <a className="btn">{this.props.type}</a>
            </div>
        )
    }
}

export default Selector