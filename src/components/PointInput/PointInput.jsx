import React from 'react'
import styles from './PointInput.module.css'

const InputPoint = ({handleChange, handleKeyDown, value}) => (
  <input className={styles.input} name="inputValue" onChange={handleChange} onKeyDown={handleKeyDown} value={value}/>
);

export default InputPoint;