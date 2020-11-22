import React from 'react';
import '../css/ide.css'
import Grid from '../components/grid'

class IDE extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="row outline">
                <div className="col-1 bg-lblue">
                    <div className="vr"></div>
                </div>
                <div className="col-2 bg-lgrey">

                </div>
                <div className="col-9 bg-dark" style={{height: '50vh'}}>
                    <h1 className="h4 text-white">Code area</h1>
                    <Grid />
                </div>
            </div>
        )
    }
}

export default IDE