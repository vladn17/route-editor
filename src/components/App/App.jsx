import React, { Component } from 'react';
import Map from '../Map'
import PointInput from '../PointInput'
import PointsList from '../PointsList'
import styles from './App.module.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      inputValue: '',
      mapCenter: [55.76, 37.64],
    };
    this.cache = {};
  }

  handleCenterMove = (coords) => {
    this.setState({
      mapCenter: coords,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleKeyDown = (e) => {
    if(e.keyCode === 13) {
      this.setState(state => ({
        points: state.points.concat({name: state.inputValue, coords: state.mapCenter}),
        inputValue: '',
      }));
    }
  };

  handleDelete = (index) => () => {
    this.setState(state => ({
      points: [...state.points.slice(0, index), ...state.points.slice(index+1)]
    }));
  };

  handleMoveMarker = (index, newcoords) => {
    this.setState(state => ({
      points: state.points.map((point, i) => index === i ? {...point, coords: newcoords} : point)
    }));
  };

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const points = this.state.points.slice();
    const [moved] = points.splice(result.source.index, 1);
    points.splice(result.destination.index, 0, moved);
    this.setState({
      points: points,
    });
  };

  render() {
    return (
      <div>
        <div className={styles.header}>
          <h1>Route Editor</h1>
        </div>
        <div className={styles.content}>
          <div className={styles["route-points-block"]}>
            <PointInput handleChange={this.handleChange} handleKeyDown={this.handleKeyDown} value={this.state.inputValue}/>
            <PointsList points={this.state.points} onDragEnd={this.onDragEnd} handleDelete={this.handleDelete}/>
          </div>
          <Map
            defaultCenter={[55.76, 37.64]}
            defaultZoom={9} points={this.state.points}
            handleMoveMarker={this.handleMoveMarker}
            handleCenterMove={this.handleCenterMove}/>
        </div>
      </div>
    );
  }
}

export default App;
