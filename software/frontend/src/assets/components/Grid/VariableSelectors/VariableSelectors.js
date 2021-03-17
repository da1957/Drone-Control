import { useState } from 'react'
import { InputGroup, FormControl, Col } from 'react-bootstrap'

export function LoopVariableSelector({item, variableData, onFormChange}) {
  return (
      <Col> 
          <InputGroup>
              <FormControl data-item={item.i} data-type="variable" type="text" placeholder="i" aria-label="variable" value={variableData[item.i].variable} onChange={onFormChange.bind(this)} />
              <InputGroup.Prepend>
                  {item.i.split('.')[0] === "for-loop" ? 
                      <InputGroup.Text>&#x2264;</InputGroup.Text> :
                      <InputGroup.Text>&#x2265;</InputGroup.Text>
                  }
              </InputGroup.Prepend>
              <FormControl data-item={item.i} data-type="value" type="text" placeholder="1" aria-label="value" value={variableData[item.i].value} onChange={onFormChange.bind(this)} />
          </InputGroup>
      </Col>
  )
}

export function VariableSelector({item, variableData, onFormChange, type}) {
  const defaultVals = {"movement": "distance", "turn" : "angle"}
  const [placeholder, setPlaceholder] = useState(defaultVals[type])

  return (
      <Col>
          <InputGroup>
              <FormControl data-item={item.i} data-type="value" type="text" placeholder={placeholder} 
                        onFocus={() => setPlaceholder("")} 
                        onBlur={() => setPlaceholder(defaultVals[type])} 
                        aria-label="value" value={variableData[item.i].value} onChange={onFormChange.bind(this)} />
          </InputGroup>
      </Col>
  )
}