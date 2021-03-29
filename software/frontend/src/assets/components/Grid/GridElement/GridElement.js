import { Col } from 'react-bootstrap'
import { LoopVariableSelector, VariableSelector } from '../VariableSelectors/VariableSelectors'
import '../grid.css'

function GridElement(props) {
  //Create correct classname with blocktype and size
  //Have to split at a delim as each grid item needs a unique key so had to give them a number
  var blockType = props.item.i.split('.')[0]
  var customClassName = "droppable-element code-block row ".concat(blockType)

  var loop = false
  //TODO: set to constant
  var type = "movement"

  if (["for-loop", "while"].includes(blockType)) {
      customClassName = customClassName.concat(" no-flex-wrap")
      loop = true
  } else if (["turn left", "turn right"].includes(blockType)) {
      type = "turn"
  }

  return (
    <div className={`${customClassName} ${props.className}`} key={props.item.i} style={props.style} data-grid={props.item} 
                    onMouseUp={props.onMouseUp} onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} onTouchEnd={props.onTouchEnd}>
      <Col>
          <p className="mb-0 mt-1">{blockType}</p>
      </Col>

      {loop && 
          <LoopVariableSelector variableData={props.variableData} item={props.item} onFormChange={props.onFormChange} />
      }

      {!loop &&
          <VariableSelector item={props.item} variableData={props.variableData} onFormChange={props.onFormChange} type={type} />
      }

      <Col>
          <a href="/#" className="btn" onClick={props.removeItem}>close</a>
      </Col>
    </div>
  )
}

export default GridElement