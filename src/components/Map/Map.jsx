import React from 'react';
import MapMarker from "../MapMarker";
import MapRoute from "../MapRoute";

export default class Map extends React.PureComponent {
  componentDidMount() {
    window.ymaps.ready(() => {
      this.map = new window.ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 9,
      });
    });
  }

  render() {
    const points  = this.props.points.map((point, index) => {
      return <MapMarker key={index} index={index} coords={point.coords}
                        name={point.name} map={this.map}
                        handleMoveMarker={this.props.handleMoveMarker}/>
    });
    const routeData = this.props.points.map(point => point.coords);
    return (
      <>
        <div id="map" style={{width: '50vw', height: '90vh'}}></div>
        {points}
        {routeData.length > 1 && <MapRoute data={routeData} map={this.map}/>}
      </>
    )
  }
}