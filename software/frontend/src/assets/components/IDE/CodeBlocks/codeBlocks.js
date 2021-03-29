import React from 'react';
import { Tab} from 'react-bootstrap'

export const DraggableCodeBlock = ({name}) => {
  var className = "droppable-element code-block " + name

  return (
      <div className={className} aria-label={name} draggable={true} unselectable="on" onDragStart={e => e.dataTransfer.setData("blockType", name)}>{name}</div>
  )
}

export const CodeBlocks = ({ items }) => {
  return (
      <Tab.Content>
          {items.map(item => {
              return(
                  <Tab.Pane key={item.category} eventKey={item.category} aria-label={item.category}>
                      {item.array.map(x => <DraggableCodeBlock name={x} key={x}/>)}
                  </Tab.Pane>
              )
          })}
      </Tab.Content>
  )
}
