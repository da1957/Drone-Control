import { useState } from 'react'

export function LoopVariableSelector({ item, variableData, onFormChange }) {
    return (
        <div className="flex flex-col justify-center items-center rounded-lg">
            <form>
                <div className="flex flex-col rounded-lg overflow-hidden sm:flex-row">
                    <input className="p-1 w-1/2 bg-gray-100 text-gray-600 border-gray-200 border-2 outline-none placeholder-gray-500 focus:bg-white" data-item={item.i} data-type="variable" type="text" placeholder="i" aria-label="variable" value={variableData[item.i].variable} onChange={onFormChange.bind(this)} />
                    <div className="flex items-center px-3 bg-gray-600 text-gray-100 font-medium">
                        {item.i.split('.')[0] === "for loop" ?
                            <span>&#x2264;</span> :
                            <span>&#60;</span>
                        }
                    </div>
                    <input className="p-1 bg-gray-100 text-gray-600 border-gray-200 border-2 outline-none placeholder-gray-500 focus:bg-white" data-item={item.i} data-type="value" type="text" placeholder="1" aria-label="value" value={variableData[item.i].value} onChange={onFormChange.bind(this)} />
                </div>
            </form>
        </div>
    )
}

export function VariableSelector({ item, variableData, onFormChange, type }) {
    const defaultVals = { "movement": "distance", "turn": "angle" }
    const [placeholder, setPlaceholder] = useState(defaultVals[type])

    return (
        <div>
            <input type="text" data-item={item.i} data-type="value" className="border-grey-light p-1 rounded bg-gray-100 text-gray-800 border-gray-200 border-2 outline-none placeholder-gray-500 focus:bg-white" placeholder={placeholder}
                defaultValue={variableData[item.i].value}
                onFocus={() => setPlaceholder("")}
                onBlur={() => setPlaceholder(defaultVals[type])}
                onChange={onFormChange.bind(this)} />
        </div>
    )
}