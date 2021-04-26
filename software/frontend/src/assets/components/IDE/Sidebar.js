import { DraggableCodeBlock } from './CodeBlocks/codeBlocks';
import { Disclosure, Transition } from '@headlessui/react';
import Loops from '../../img/loop.svg';
import Movement from '../../img/movement.svg';
import Rotation from '../../img/rotation.svg';

const SidebarLink = ({ name, items, addItem }) => {
    const img = { "Loops": Loops, "Movement": Movement, "Rotation": Rotation }

    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className={`no-text-decoration w-full flex items-center p-2 text-gray-500 transition-colors rounded-md hover:bg-blue-100 focus:outline-none ${open ? "bg-blue-100" : ""}`}>
                        <span className="w-7">
                            <img src={img[name]} alt={name} />
                        </span>
                        <span className="ml-2 text-sm"> {name} </span>
                        <span className="ml-auto" aria-hidden="true">
                            <svg className={`w-4 h-4 transition-transform transform ${open ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </Disclosure.Button>
                    <Transition
                        show={open}
                        enter="origin-top transform transition duration-250 ease-out"
                        enterFrom="scale-0"
                        enterTo="scale-100"
                        leave="origin-top transform  transition duration-250 ease-out"
                        leaveFrom="scale-100"
                        leaveTo="scale-0"
                    >
                        <Disclosure.Panel static>
                            <div role="menu" className="mt-2 space-y-2 px-7" aria-label="Dashboards">
                                {items.map(item => <DraggableCodeBlock name={item} key={item} addItem={addItem}/>)}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}

const Sidebar = ({ items, addItem }) => {

    return (
        <nav aria-label="main" className="flex-initial w-64 px-2 space-y-2 hover:overflow-y-auto">
            {items.map(item => <SidebarLink key={item.category} name={item.category} items={item.array} addItem={addItem} />)}
        </nav>
    )
}

export default Sidebar