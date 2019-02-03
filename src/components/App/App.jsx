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
    };
    this.cache = {};
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleKeyDown = (e) => {
    if(e.keyCode === 13) {

      if(this.cache[this.state.inputValue]) {
        this.setState(state => ({
          points: state.points.concat({name: this.state.inputValue, coords: this.cache[this.state.inputValue]}),
          inputValue: '',
        }));
        return;
      }

      window.ymaps.geocode(this.state.inputValue, { results: 1})
        .then(res => {
          const geoObject = res.geoObjects.get(0);
          const coords = geoObject.geometry.getCoordinates();
          this.cache[this.state.inputValue] = coords;
          this.setState(state => ({
            points: state.points.concat({name: this.state.inputValue, coords}),
            inputValue: '',
          }));
        })
        .catch(error => console.log(error));
    }
  };

  handleDelete = (index) => () => {
    this.setState(state => ({
      points: [...state.points.slice(0, index), ...state.points.slice(index+1)]
    }))
  };

  handleMoveMarker = (index, newcoords) => {
    window.ymaps.geocode(newcoords, { results: 1})
      .then(res => {
        const geoObject = res.geoObjects.get(0);
        const name = geoObject.properties.get('text');
        this.setState(state => ({
          points: state.points.map((point, i) => index === i ? {name: name, coords: newcoords} : point)
        }))
      })
      .catch(error => console.log(error));
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
    })
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
          <Map points={this.state.points} handleMoveMarker={this.handleMoveMarker}/>
        </div>
      </div>
    );
  }
}

export default App;
