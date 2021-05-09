import React from 'react';
import { NavLink } from 'react-router-dom'
import DroneLogo from '../../img/drone.svg';
import './navbar.css';

const myNavbar = () => {
    return (
        <div className="h-12">
            <nav className="border-b">
                <div className="mx-auto px-3">
                    <div className="flex items-center justify-between h-11">
                        <div className="flex">
                            <NavLink className="hover:text-gray-800" exact to ="/">
                                <img className="h-12 w-12 inline-block mr-2" src={DroneLogo} alt="DroneLogo"/>
                                <span className="inline-block align-middle font-medium text-lg tracking-wide">dronecontrol</span>
                            </NavLink>
                        </div>
                        <div className="md:block">
                            <div className="flex items-center md:ml-6 space-x-3">
                                <div>
                                    <NavLink className="no-underline text-gray-600 text-lg tracking-wide hover:text-gray-800" activeClassName="text-gray-800" exact to="/">home</NavLink>
                                </div>
                                <div>
                                    <NavLink className="no-underline text-gray-600 text-lg tracking-wide hover:text-gray-800" activeClassName="text-gray-800" exact to="/about">about</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default myNavbar