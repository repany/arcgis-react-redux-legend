define(['exports', 'react', 'react-dom', 'react-redux', 'app/components/map-legend', 'app/actions/map-legend-actions', 'esri/Map', 'esri/views/SceneView', 'esri/layers/MapImageLayer', 'esri/core/watchUtils'], function (exports, _react, _reactDom, _reactRedux, _mapLegend, _mapLegendActions, _Map, _SceneView, _MapImageLayer, _watchUtils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _mapLegend2 = _interopRequireDefault(_mapLegend);

    var _Map2 = _interopRequireDefault(_Map);

    var _SceneView2 = _interopRequireDefault(_SceneView);

    var _MapImageLayer2 = _interopRequireDefault(_MapImageLayer);

    var _watchUtils2 = _interopRequireDefault(_watchUtils);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var mapStateToProps = function mapStateToProps(state) {
        return {};
    };

    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return {
            setInitialLegend: function setInitialLegend(view, mapId) {
                dispatch((0, _mapLegendActions.setInitialLegend)(view, mapId));
            }
        };
    };

    var MapUi = function (_Component) {
        _inherits(MapUi, _Component);

        function MapUi() {
            _classCallCheck(this, MapUi);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(MapUi).apply(this, arguments));
        }

        _createClass(MapUi, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _props = this.props;
                var mapId = _props.mapId;
                var setInitialLegend = _props.setInitialLegend;


                var imageLyr = new _MapImageLayer2.default({
                    url: "https://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer"
                });

                var map = new _Map2.default({
                    basemap: "dark-gray",
                    layers: [imageLyr]
                });

                var view = new _SceneView2.default({
                    container: _reactDom2.default.findDOMNode(this.refs.mapView),
                    map: map
                });

                imageLyr.then(function () {
                    view.goTo(imageLyr.fullExtent);
                });

                view.then(function () {

                    for (var lyr in view.map.layers.items) {

                        _watchUtils2.default.once(view.map.layers.items[lyr], 'loaded', function (value) {

                            var allLoaded = view.map.layers.items.map(function (a) {
                                return a.loaded;
                            }).reduce(function (prev, curr) {
                                return prev && curr;
                            });

                            if (allLoaded) {
                                setInitialLegend(view, mapId);
                            }
                        });
                    }
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var mapId = this.props.mapId;


                var mapStyle = {
                    width: '100%',
                    height: '100%'
                };

                return _react2.default.createElement(
                    'div',
                    { style: mapStyle, mapId: mapId, ref: 'mapView' },
                    _react2.default.createElement(_mapLegend2.default, { mapId: mapId })
                );
            }
        }]);

        return MapUi;
    }(_react.Component);

    exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MapUi);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXG1hcC12aWV3LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxRQUFNLGtCQUFrQixTQUFsQixlQUFrQixDQUFDLEtBQUQsRUFBVztBQUMvQixlQUFPLEVBQVA7QUFDSCxLQUZEOztBQUlBLFFBQU0scUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLFFBQUQsRUFBYztBQUNyQyxlQUFPO0FBQ0gsOEJBQWtCLDBCQUFDLElBQUQsRUFBTyxLQUFQLEVBQWlCO0FBQy9CLHlCQUFTLHdDQUFpQixJQUFqQixFQUF1QixLQUF2QixDQUFUO0FBQ0g7QUFIRSxTQUFQO0FBS0gsS0FORDs7UUFRTSxLOzs7Ozs7Ozs7OztnREFFa0I7QUFBQSw2QkFFb0IsS0FBSyxLQUZ6QjtBQUFBLG9CQUVSLEtBRlEsVUFFUixLQUZRO0FBQUEsb0JBRUQsZ0JBRkMsVUFFRCxnQkFGQzs7O0FBSWhCLG9CQUFNLFdBQVcsNEJBQWtCO0FBQy9CLHlCQUFLO0FBRDBCLGlCQUFsQixDQUFqQjs7QUFJQSxvQkFBTSxNQUFNLGtCQUFRO0FBQ2hCLDZCQUFTLFdBRE87QUFFaEIsNEJBQVEsQ0FBQyxRQUFEO0FBRlEsaUJBQVIsQ0FBWjs7QUFLQSxvQkFBTSxPQUFPLHdCQUFjO0FBQ3ZCLCtCQUFXLG1CQUFTLFdBQVQsQ0FBcUIsS0FBSyxJQUFMLENBQVUsT0FBL0IsQ0FEWTtBQUV2Qix5QkFBSztBQUZrQixpQkFBZCxDQUFiOztBQUtBLHlCQUFTLElBQVQsQ0FBYyxZQUFXO0FBQ3JCLHlCQUFLLElBQUwsQ0FBVSxTQUFTLFVBQW5CO0FBQ0gsaUJBRkQ7O0FBSUEscUJBQUssSUFBTCxDQUFVLFlBQVc7O0FBRWpCLHlCQUFLLElBQUksR0FBVCxJQUFnQixLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLEtBQWhDLEVBQXVDOztBQUVuQyw2Q0FBVyxJQUFYLENBQWdCLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBaEIsRUFBNEMsUUFBNUMsRUFBc0QsVUFBVSxLQUFWLEVBQWlCOztBQUVuRSxnQ0FBSSxZQUFZLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsQ0FDWCxHQURXLENBQ1AsVUFBQyxDQUFEO0FBQUEsdUNBQU8sRUFBRSxNQUFUO0FBQUEsNkJBRE8sRUFFWCxNQUZXLENBRUosVUFBQyxJQUFELEVBQU8sSUFBUDtBQUFBLHVDQUFnQixRQUFRLElBQXhCO0FBQUEsNkJBRkksQ0FBaEI7O0FBSUEsZ0NBQUksU0FBSixFQUFlO0FBQ1gsaURBQWlCLElBQWpCLEVBQXVCLEtBQXZCO0FBQ0g7QUFDSix5QkFURDtBQVVIO0FBQ0osaUJBZkQ7QUFnQkg7OztxQ0FFUTtBQUFBLG9CQUVHLEtBRkgsR0FFYSxLQUFLLEtBRmxCLENBRUcsS0FGSDs7O0FBSUwsb0JBQU0sV0FBVztBQUNiLDJCQUFPLE1BRE07QUFFYiw0QkFBUTtBQUZLLGlCQUFqQjs7QUFLQSx1QkFDSTtBQUFBO0FBQUEsc0JBQUssT0FBTyxRQUFaLEVBQXNCLE9BQU8sS0FBN0IsRUFBb0MsS0FBSSxTQUF4QztBQUFrRCx5RUFBVyxPQUFPLEtBQWxCO0FBQWxELGlCQURKO0FBR0g7Ozs7OztzQkFHVSx5QkFBUSxlQUFSLEVBQXlCLGtCQUF6QixFQUE2QyxLQUE3QyxDIiwiZmlsZSI6ImNvbXBvbmVudHNcXG1hcC12aWV3LmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5cclxuaW1wb3J0IE1hcExlZ2VuZCBmcm9tICdhcHAvY29tcG9uZW50cy9tYXAtbGVnZW5kJ1xyXG5cclxuaW1wb3J0IHsgc2V0SW5pdGlhbExlZ2VuZCB9IGZyb20gJ2FwcC9hY3Rpb25zL21hcC1sZWdlbmQtYWN0aW9ucydcclxuXHJcbmltcG9ydCBNYXAgZnJvbSBcImVzcmkvTWFwXCJcclxuaW1wb3J0IFNjZW5lVmlldyBmcm9tIFwiZXNyaS92aWV3cy9TY2VuZVZpZXdcIlxyXG5pbXBvcnQgTWFwSW1hZ2VMYXllciBmcm9tIFwiZXNyaS9sYXllcnMvTWFwSW1hZ2VMYXllclwiXHJcbmltcG9ydCB3YXRjaFV0aWxzIGZyb20gJ2VzcmkvY29yZS93YXRjaFV0aWxzJ1xyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XHJcbiAgICByZXR1cm4geyB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzZXRJbml0aWFsTGVnZW5kOiAodmlldywgbWFwSWQpID0+IHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goc2V0SW5pdGlhbExlZ2VuZCh2aWV3LCBtYXBJZCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNYXBVaSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICAgICBcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG5cclxuICAgICAgICBjb25zdCB7IG1hcElkLCBzZXRJbml0aWFsTGVnZW5kIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgICAgIGNvbnN0IGluZnJhTHlyID0gbmV3IE1hcEltYWdlTGF5ZXIoe1xyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9zYW1wbGVzZXJ2ZXI2LmFyY2dpc29ubGluZS5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvRW5lcmd5L0luZnJhc3RydWN0dXJlL01hcFNlcnZlclwiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3QgbWFwID0gbmV3IE1hcCh7XHJcbiAgICAgICAgICAgIGJhc2VtYXA6IFwiZGFyay1ncmF5XCIsXHJcbiAgICAgICAgICAgIGxheWVyczogW2luZnJhTHlyXVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgU2NlbmVWaWV3KHtcclxuICAgICAgICAgICAgY29udGFpbmVyOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWFwVmlldyksXHJcbiAgICAgICAgICAgIG1hcDogbWFwXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaW5mcmFMeXIudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmlldy5nb1RvKGluZnJhTHlyLmZ1bGxFeHRlbnQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHZpZXcudGhlbihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGx5ciBpbiB2aWV3Lm1hcC5sYXllcnMuaXRlbXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB3YXRjaFV0aWxzLm9uY2Uodmlldy5tYXAubGF5ZXJzLml0ZW1zW2x5cl0sICdsb2FkZWQnLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFsbExvYWRlZCA9IHZpZXcubWFwLmxheWVycy5pdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKChhKSA9PiBhLmxvYWRlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgocHJldiwgY3VycikgPT4gcHJldiAmJiBjdXJyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEluaXRpYWxMZWdlbmQodmlldywgbWFwSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBjb25zdCB7IG1hcElkIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgICAgIGNvbnN0IG1hcFN0eWxlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17bWFwU3R5bGV9IG1hcElkPXttYXBJZH0gcmVmPSdtYXBWaWV3Jz48TWFwTGVnZW5kIG1hcElkPXttYXBJZH0gLz48L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1hcFVpKVxyXG4iXX0=
