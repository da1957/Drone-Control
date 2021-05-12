const TourAlert = ({ setTourAlert, setIsTourOpen }) => {
    return (
        <div data-testid="tour" className="bg-white flex items-center">
            <div className="bg-gray-100 rounded flex items-start text-gray-700 mb-2 mx-auto shadow-lg">
                <div className="w-1 self-stretch bg-blue-500">
                </div>
                <div className="flex items-center space-x-2 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-blue-500 w-5" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.5 5h3l-1 10h-1l-1-10zm1.5 14.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" /></svg>
                    <h3 className="tracking-wider flex-1">
                        This is your first time visiting, would you like a tour?
                    </h3>
                    <button onClick={() => {setIsTourOpen(true); setTourAlert(false)}} className="bg-blue-500 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        <span className="text-white px-2">yes</span>
                    </button>
                </div>
                <button className="mr-2 mt-2 fill-current text-gray-600 hover:text-gray-900" style={{width: "9px", height: "9px"}} onClick={() => setTourAlert(false)}>
                    {/* <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.1 9.1">
                        <path d="M5.9 4.5l2.8-2.8c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L4.5 3.1 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4l2.8 2.8L.3 7.4c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3L4.5 6l2.8 2.8c.3.2.5.3.8.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.9 4.5z"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TourAlert