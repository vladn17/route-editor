import React from 'react';

export default class MapMarker extends React.PureComponent {
  componentDidMount() {
    const { name, coords } = this.props;
    this.marker = new window.ymaps.Placemark(coords, {
      balloonContent: name,
    }, {
      draggable: true,
    });
    this.marker.events.add('dragend', (e) => {
      this.props.handleMoveMarker(this.props.index, e.get('target').geometry.getCoordinates());
    });
    this.props.map.geoObjects.add(this.marker);
    this.props.map.setCenter(coords);
  }

  componentDidUpdate(prevProps) {
    const { coords, name } = this.props;
    if(prevProps.coords[0] !== coords[0] || prevProps.coords[1] !== coords[1]){
      this.marker.geometry.setCoordinates(coords);
      this.marker.properties.set({balloonContent: name});
    }
  }

  componentWillUnmount() {
    this.props.map.geoObjects.remove(this.marker);
    this.marker.events.remove('dragend', (e) => {
      this.props.handleMoveMarker(this.props.index, e.get('target').geometry.getCoordinates());
    });
  }

  render() {
    return null;
  }


}