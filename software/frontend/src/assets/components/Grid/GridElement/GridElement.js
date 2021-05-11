import { LoopVariableSelector, VariableSelector } from '../VariableSelectors/VariableSelectors'
import '../grid.css'

function GridElement(props) {
  //Create correct classname with blocktype and size
  //Have to split at a delim as each grid item needs a unique key so had to give them a number
  var blockType = props.item.i.split('.')[0]
  var customClassName = `droppable-element code-block row ${blockType.replace(" ", "-")}`

  var loop = false
  var endLoop = false
  //TODO: set to constant
  var type = "movement"

  if (blockType === "for loop" || blockType === "while") {
    customClassName = customClassName.concat(" no-flex-wrap")
    loop = true
  } else if (["end for", "end while"].includes(blockType)) {
    endLoop = true
  } else if (["turn left", "turn right"].includes(blockType)) {
    type = "turn"
  }

  return (
    <div className={`flex items-center ${customClassName} ${props.className} shadow`} key={props.item.i} style={props.style} data-grid={props.item}
      onMouseUp={props.onMouseUp} onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} onTouchEnd={props.onTouchEnd}>
      <div className="flex justify-between mx-4 items-center w-full">
        <div className="w-24">
          <span className="font-medium tracking-wide text-xl">{blockType}</span>
        </div>

        {loop && !endLoop &&
          <LoopVariableSelector variableData={props.variableData} item={props.item} onFormChange={props.onFormChange} />
        }

        {!loop && !endLoop &&
          <VariableSelector item={props.item} variableData={props.variableData} onFormChange={props.onFormChange} type={type} />
        }

        <div>
          <button aria-label="remove" className="py-1 px-2 rounded-md bg-gray-700 text-gray-100 font-medium hover:bg-gray-600" onTouchStart={props.removeItem} onClick={props.removeItem}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default GridElement