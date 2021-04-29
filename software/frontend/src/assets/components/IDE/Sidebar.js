import { DraggableCodeBlock } from './CodeBlocks/codeBlocks';
import { Disclosure, Transition } from '@headlessui/react';
import Loops from '../../img/loop.svg';
import Movement from '../../img/movement.svg';
import Rotation from '../../img/rotation.svg';
import { useItemsContext } from '../../../services/ItemsContext';

const moveTour = (dispatch) => {
    //Have to wait 250ms for animation to play out so tour can find panel
    setTimeout(function () {
        dispatch({type: "incStep"})
    }, 250);
}

const SidebarLink = ({ name, items }) => {
    const img = { "Loops": Loops, "Movement": Movement, "Rotation": Rotation }
    const { dispatch } = useItemsContext();

    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <div onClick={() => moveTour(dispatch)}>
                        <Disclosure.Button className={`no-text-decoration w-full flex items-center p-2 text-gray-500 transition-colors rounded-md hover:bg-blue-100 focus:outline-none ${open ? "bg-blue-100" : ""}`} data-tut={`reactour_${name}`}>
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
                    </div>
                    <Transition
                        show={open}
                        enter="origin-top transform transition duration-250 ease-out"
                        enterFrom="scale-0"
                        enterTo="scale-100"
                        leave="origin-top transform  transition duration-250 ease-out"
                        leaveFrom="scale-100"
                        leaveTo="scale-0"
                    >
                        <Disclosure.Panel data-tut={`reactour_${name}_opened`} static>
                            <div role="menu" className="mt-2 space-y-2 px-7" aria-label="Dashboards">
                                {items.map(item => <DraggableCodeBlock name={item} key={item} />)}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}

const Sidebar = ({ items }) => {

    return (
        <nav aria-label="main" className="flex-initial w-64 px-2 space-y-2 hover:overflow-y-auto" data-tut="reactour_selector">
            {items.map(item => <SidebarLink key={item.category} name={item.category} items={item.array} />)}
        </nav>
    )
}

export default Sidebar