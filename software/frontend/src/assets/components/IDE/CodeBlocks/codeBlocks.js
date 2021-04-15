import React from 'react';

export const DraggableCodeBlock = ({name}) => {
  var className = "shadow droppable-element code-block transform hover:scale-110 motion-reduce:transform-none " + name.replace(" ", "-")

  return (
      <div className={className} aria-label={name} draggable={true} unselectable="on" onDragStart={e => e.dataTransfer.setData("blockType", name)}>{name}</div>
  )
}
