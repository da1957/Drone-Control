import React from 'react';
import './ide.css';
import { Grid } from '../Grid/grid';
import Sidebar from './Sidebar';

function IDE() {
    const movement = ["forward", "backward", "left", "right", "up", "down"]
    const rotation = ["turn left", "turn right"]
    const loops = ["for loop", "end for", "while", "end while"]

    const items = [{category: "Movement", array: movement}, {category: "Rotation", array: rotation}, {category: "Loops", array: loops}]

    return (
        <div className="inline-flex w-full my-2" style={{minHeight: "50vh"}}> 
            <Sidebar items={items} />
            <Grid />
        </div>
    )
}

export default IDE