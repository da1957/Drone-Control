import React from 'react';
import '../assets/css/about.css'

const About = () => {
    return (
        <div className="container-fluid h-100 d-flex flex-column">
                    <div className="align-self-center">
                        <h1 className="mt-3" style={{'text-decoration': 'underline'}}>about</h1>
                    </div>
                    <div className="align-self-center flex-fill">
                        <p>hello hello hello hello hello</p>
                    </div>
                    <div className="align-self-center mt-auto footer">
                        <div>Icons made by <span className="cursor-pointer" href="https://www.freepik.com" title="Freepik">Freepik</span> from <span className="cursor-pointer" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</span></div>
                    </div>
        </div>
    );
}

export default About