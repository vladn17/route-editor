import React from 'react';

export default class MapRoute extends React.PureComponent {
  componentDidMount() {
    this.route = new window.ymaps.Polyline(this.props.data, null, {
      strokeWidth: 3,
    });
    this.props.map.geoObjects.add(this.route);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data.length !== data.length) {
      this.route.geometry.setCoordinates(data);
    }
    else {
      for(let i=0; i<data.length; i++) {
        if (data[i] !== prevProps.data[i]) {
          this.route.geometry.setCoordinates(data);
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.map.geoObjects.remove(this.route);
  }

  render() {
    return null;
  }
}