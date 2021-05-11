import React from 'react';
import { useItemsContext } from '../../../../services/ItemsContext';

export const DraggableCodeBlock = ({ name }) => {
  const { state, dispatch } = useItemsContext();
  var className = "shadow droppable-element code-block transform hover:scale-110 motion-reduce:transform-none " + name.replace(" ", "-")

  let [lastItem] = state.layout.slice(-1)
  let yPos = lastItem === undefined ? 0 : lastItem.y + 1

  const item = { w: 1, h: 1, x: 0, y: yPos, i: name }

  return (
    <div className={className} aria-label={`${name} block`} draggable={true} onClick={() => {
      dispatch({ type: "addItem", payload: { name: name, layoutItem: item, layout: [...state.layout, item]}})
    }} unselectable="on" onDragStart={e => e.dataTransfer.setData("blockType", name)}>
      {name}
    </div>
  )
}