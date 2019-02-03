import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Point from '../Point'

const PointsList = ({points, onDragEnd, handleDelete}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="points">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {points.map((point,index) => <Point key={index} name={point.name} index={index} handleDelete={handleDelete}/>)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
};

export default PointsList;