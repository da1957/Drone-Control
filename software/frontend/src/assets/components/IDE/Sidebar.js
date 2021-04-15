import { useState } from 'react';
import { DraggableCodeBlock } from './CodeBlocks/codeBlocks';
import Loops from '../../img/loop.svg';
import Movement from '../../img/movement.svg';
import Rotation from '../../img/rotation.svg';

const SidebarLink = ({ name, items }) => {
    const [open, setOpen] = useState(false);
    const img = {"Loops": Loops, "Movement": Movement, "Rotation": Rotation}

    return (
    <div>
        <span onClick={() => setOpen(!open)} className={`no-text-decoration flex items-center p-2 text-gray-500 transition-colors rounded-md hover:bg-indigo-100 ${open ? "bg-indigo-100" : ""}`} role="button" aria-haspopup="true" aria-expanded={open ? "true" : "false"} >
            <span className="w-7">
                <img src={img[name]} alt={name} />
            </span>
            <span className="ml-2 text-sm"> {name} </span>
            <span className="ml-auto" aria-hidden="true">
                <svg className={`w-4 h-4 transition-transform transform ${open ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </span>
        </span>
        {open &&
        <div role="menu" className="mt-2 space-y-2 px-7" aria-label="Dashboards">
            {/* {items.map(item => <SidebarItem key={item} item={item} />)} */}
            {items.map(item => <DraggableCodeBlock name={item} key={item}/>)}
        </div>
        }
    </div>
    )
}

const Sidebar = ({ items }) => {

    return (
    <nav aria-label="main" className="flex-initial w-64 px-2 space-y-2 hover:overflow-y-auto">
        {items.map(item => <SidebarLink key={item.category} name={item.category} items={item.array} />)}
    </nav>
    )
}

export default Sidebar