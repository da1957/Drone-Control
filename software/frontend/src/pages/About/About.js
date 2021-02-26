import React from 'react';
import './about.css'

const About = () => {
    return (
        <div className="container-fluid h-100 d-flex flex-column">
                    <div className="align-self-center">
                        <h1 className="mt-3" style={{'text-decoration': 'underline'}}>about</h1>
                    </div>
                    <div className="align-self-center flex-fill">
                        <p>Drone simulator provided by <a href="https://jsturm.de/wp/teaching/autonavx-slides/">AUTONAVx</a></p>
                    </div>
                    <div className="align-self-center mt-auto footer">
                        <div>Icons made by <a className="hidden-link" href="https://www.freepik.com" title="Freepik">Freepik</a> from <a className="hidden-link" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    </div>
        </div>
    );
}

export default About