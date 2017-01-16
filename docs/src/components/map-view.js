import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as esriLoader from "esri-loader";
import {MapLegend,setInitialLegend} from "../../../dist/arcgis-redux-legend";

class MapUi extends React.Component {
  initialState = {view: null};

  state = this.initialState;

  componentWillMount() {
    const {mapId, setInitialLegend} = this.props;

    if (!esriLoader.isLoaded()) {
      // lazy load the ArcGIS API
      esriLoader.bootstrap(err => {
        if (err) {
          console.error(err);
          return;
        }

        esriLoader.dojoRequire(
          [
            "esri/Map",
            "esri/views/SceneView",
            "esri/layers/MapImageLayer",
            "esri/core/watchUtils",
            "dojo/on"
          ],
          (Map, SceneView, MapImageLayer, watchUtils) => {
            const layer1 = new MapImageLayer({
              url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/RedlandsEmergencyVehicles/MapServer"
            });

            const layer2 = new MapImageLayer({
              url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer"
            });

            const map = new Map({basemap: "topo", layers: [layer1, layer2]});

            const view = new SceneView({
              container: ReactDOM.findDOMNode(this.refs.mapView),
              map: map,
              padding: {right: 280}
            });

            layer2.then(function() {
              view.goTo(layer2.fullExtent);
            });

            this.setState({view: view});

            if (!view) {
              return;
            }

            setInitialLegend(view, mapId);
          }
        );
      });
    }
  }

  render() {
    const {mapId} = this.props;
    const {view} = this.state;

    const mapStyle = {width: "100%", height: "100%"};

    return (
      <div style={mapStyle} mapId={mapId} ref="mapView">
        <MapLegend mapId={mapId} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setInitialLegend: (view, mapId) => {
      dispatch(setInitialLegend(view, mapId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapUi)