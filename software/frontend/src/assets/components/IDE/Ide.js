import React, { useReducer } from 'react';
import './ide.css';
import Grid from '../Grid/Grid';
import Sidebar from './Sidebar';
import ItemsContext from '../../../services/ItemsContext';
import ItemsReducer from '../../../services/ItemsReducer';

function init(initialItems) {
    return {
        items: initialItems,
        layout: initialItems,
        count: 0,
        variableData: {},
    }
}
function IDE() {
    const movement = ["forward", "backward", "left", "right", "up", "down"]
    const rotation = ["turn left", "turn right"]
    const loops = ["for loop", "end for", "while", "end while"]

    const sidebarItems = [{ category: "Movement", array: movement }, { category: "Rotation", array: rotation }, { category: "Loops", array: loops }]

    const [state, dispatch] = useReducer(ItemsReducer, [], init)
    const providerState = { state, dispatch }

    return (
        <div className="inline-flex w-full my-2" style={{ minHeight: "50vh" }}>
            <ItemsContext.Provider value={providerState}>
                <Sidebar items={sidebarItems} />
                <Grid />
            </ItemsContext.Provider>
        </div>
    )
}
export default IDE