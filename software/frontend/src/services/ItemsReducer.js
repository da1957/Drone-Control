function reducer(state, action) {
    switch (action.type) {
        case 'addItem': {
            return addItem(state, action.payload)
        }
        case 'removeItem': {
            return { ...state, items: action.payload.items, variableData: action.payload.variableData }
        }
        case 'formChange': {
            return { ...state, variableData: action.payload }
        }
        case 'breakpointChange': {
            return { ...state, breakpoint: action.payload.breakpoint, cols: action.payload.cols }
        }
        case 'layoutChange': {
            return { ...state, layout: action.payload }
        }
        case 'setState': {
            return action.payload
        }
        case 'resetCount': {
            return { ...state, count: 0 }
        }
        default: {
            return state
        }
    }
}

const addItem = (state, payload) => {
    var uniqueName = `${payload.name}.${state.count}`

    var newvariableData = state.variableData

    //Selecting correct default val based on block type
    if (["for loop", "while"].includes(payload.name)) {
        newvariableData[uniqueName] = { value: 1, variable: "i" }
    } else if (["turn left", "turn right"].includes(payload.name)) {
        newvariableData[uniqueName] = { value: 45 }
    } else {
        newvariableData[uniqueName] = { value: 1 }
    }

    //Setting item props
    payload.layoutItem.i = uniqueName
    payload.layoutItem.isResizable = false
    var sorted = [...payload.layout]

    sorted.sort((x, y) => {
        //JS sort functions just need a negative or positive num to sort
        //This will find y pos of both items then negate them to get order
        return payload.layout.find(obj => obj.i === x.i).y - payload.layout.find(obj => obj.i === y.i).y
    })

    const newState = {
        items: sorted,
        layout: sorted,
        count: state.count + 1,
        variableData: newvariableData
    }

    return newState

}

export default reducer
