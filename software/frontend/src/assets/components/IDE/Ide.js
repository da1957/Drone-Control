import React, { useReducer } from 'react';
import './ide.css';
import Grid from '../Grid/Grid';
import Sidebar from './Sidebar/Sidebar';
import ItemsContext from '../../../services/ItemsContext';
import ItemsReducer from '../../../services/ItemsReducer';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

function init(initialItems) {
    return {
        items: initialItems,
        layout: initialItems,
        count: 0,
        variableData: {},
        step: 0,
    }
}

const steps = [
    {
        selector: '[data-tut="reactour_selector"]',
        content: "Code blocks are found in the sidebar, divided into sections.",
        stepInteraction: false,
        action: () => {document.querySelector("[data-tour-elem='right-arrow']").classList.remove("hide")}
    },
    {
        selector: '[data-tut="reactour_Movement"]',
        content: "Each section can be expanded to show the code blocks, click on 'Movement'.",
        action: () => {document.querySelector("[data-tour-elem='right-arrow']").classList.add("hide")}
    },
    {
        selector: '[data-tut="reactour_Movement_opened"]',
        content: "From here you can either click or drag a code block to add it to your program.",
        stepInteraction: false,
        action: () => {document.querySelector("[data-tour-elem='right-arrow']").classList.remove("hide")}
    },
    {
        selector: '[data-tut="reactour_ide"]',
        content: "Try adding some code blocks.",
        action: () => {document.querySelector("[data-tour-elem='right-arrow']").classList.remove("hide")}
    },
    {
        selector: '[data-tut="reactour_grid"]',
        content: "You can now drag code blocks to rearrange them.",
    },
    {
        selector: '[data-tut="reactour_loadcode"]',
        content: "And then load your program into the drone simulator by clicking 'load code'."
    },
    {
        selector: '[data-tut="reactour_simulator"]',
        content: "Now you can use the controls on the drone simulator to start and stop the simulation.",
        position: 'bottom'
    },
    {
        selector: '[data-tut="reactour_save"]',
        content: "And finally download your program to be uploaded and modified later."
    }
]

function IDE({ isTourOpen, setIsTourOpen }) {
    const movement = ["forward", "backward", "left", "right", "up", "down"]
    const rotation = ["turn left", "turn right"]
    const loops = ["for loop", "end for", "while", "end while"]

    const sidebarItems = [{ category: "Movement", array: movement }, { category: "Rotation", array: rotation }, { category: "Loops", array: loops }]

    const [state, dispatch] = useReducer(ItemsReducer, [], init)
    const providerState = { state, dispatch }

    const disableBody = target => disableBodyScroll(target)
    const enableBody = target => enableBodyScroll(target)

    return (
        <>
        <Tour
            steps={steps}
            isOpen={isTourOpen}
            onRequestClose={() => setIsTourOpen(false)}
            goToStep={state.step}
            closeWithMask={false}
            scrollDuration={100}
            getCurrentStep={curr => dispatch({type: "setStep", payload: curr})}
            lastStepNextButton={<span className="text-base" onClick={() => setIsTourOpen(false)}>Done!</span>}
            onAfterOpen={disableBody}
            onBeforeClose={enableBody}
        />
        <div className="inline-flex w-full my-2" style={{ minHeight: "50vh" }} data-tut="reactour_ide" >
            <ItemsContext.Provider value={providerState}>
                <Sidebar items={sidebarItems}/>
                <Grid />
            </ItemsContext.Provider>
        </div>
        </>
    )
}

export default IDE