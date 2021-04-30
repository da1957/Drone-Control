import SidebarLink from './SidebarLink'

const Sidebar = ({ items }) => {

    return (
        <nav aria-label="main" className="flex-initial w-64 px-2 space-y-2 hover:overflow-y-auto" data-tut="reactour_selector">
            {items.map(item => <SidebarLink key={item.category} name={item.category} items={item.array} />)}
        </nav>
    )
}

export default Sidebar