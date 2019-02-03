import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import icon from './delete.svg'
import styles from './Point.module.css'

const Point = ({name, index, handleDelete}) => (
  <Draggable draggableId={name+index} index={index}>
    {(provided) => (
      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={styles.point}>
        <span>{name}</span>
        <img className={styles.icon} src={icon} alt="Delete" onClick={handleDelete(index)}/>
      </div>
    )}
  </Draggable>
);

export default Point;