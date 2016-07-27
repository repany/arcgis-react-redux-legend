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
            },
            setCurrentScale: function setCurrentScale(currentScale) {
                dispatch((0, _mapLegendActions.setCurrentScale)(currentScale));
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
                var setCurrentScale = _props.setCurrentScale;
                var setInitialLegend = _props.setInitialLegend;


                var imageLyr = new _MapImageLayer2.default({
                    url: "https://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Hurricane_Active/MapServer"
                });

                var map = new _Map2.default({
                    basemap: "topo",
                    layers: [imageLyr]
                });

                var view = new _SceneView2.default({
                    container: _reactDom2.default.findDOMNode(this.refs.mapView),
                    map: map,
                    padding: { right: 280 }
                });

                imageLyr.then(function () {
                    view.goTo({
                        center: [130, 0]
                    });
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

                    view.watch('scale', function (newScale) {
                        setCurrentScale(newScale);
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXG1hcC12aWV3LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxRQUFNLGtCQUFrQixTQUFsQixlQUFrQixDQUFDLEtBQUQsRUFBVztBQUMvQixlQUFPLEVBQVA7QUFDSCxLQUZEOztBQUlBLFFBQU0scUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLFFBQUQsRUFBYztBQUNyQyxlQUFPO0FBQ0gsOEJBQWtCLDBCQUFDLElBQUQsRUFBTyxLQUFQLEVBQWlCO0FBQy9CLHlCQUFTLHdDQUFpQixJQUFqQixFQUF1QixLQUF2QixDQUFUO0FBQ0gsYUFIRTtBQUlILDZCQUFpQix5QkFBQyxZQUFELEVBQWtCO0FBQy9CLHlCQUFTLHVDQUFnQixZQUFoQixDQUFUO0FBQ0g7QUFORSxTQUFQO0FBUUgsS0FURDs7UUFXTSxLOzs7Ozs7Ozs7OztnREFFa0I7QUFBQSw2QkFFcUMsS0FBSyxLQUYxQztBQUFBLG9CQUVSLEtBRlEsVUFFUixLQUZRO0FBQUEsb0JBRUQsZUFGQyxVQUVELGVBRkM7QUFBQSxvQkFFZ0IsZ0JBRmhCLFVBRWdCLGdCQUZoQjs7O0FBSWhCLG9CQUFNLFdBQVcsNEJBQWtCO0FBQy9CLHlCQUFLO0FBRDBCLGlCQUFsQixDQUFqQjs7QUFJQSxvQkFBTSxNQUFNLGtCQUFRO0FBQ2hCLDZCQUFTLE1BRE87QUFFaEIsNEJBQVEsQ0FBQyxRQUFEO0FBRlEsaUJBQVIsQ0FBWjs7QUFLQSxvQkFBTSxPQUFPLHdCQUFjO0FBQ3ZCLCtCQUFXLG1CQUFTLFdBQVQsQ0FBcUIsS0FBSyxJQUFMLENBQVUsT0FBL0IsQ0FEWTtBQUV2Qix5QkFBSyxHQUZrQjtBQUd2Qiw2QkFBUyxFQUFFLE9BQU8sR0FBVDtBQUhjLGlCQUFkLENBQWI7O0FBTUEseUJBQVMsSUFBVCxDQUFjLFlBQVc7QUFDckIseUJBQUssSUFBTCxDQUFVO0FBQ04sZ0NBQVEsQ0FBQyxHQUFELEVBQU0sQ0FBTjtBQURGLHFCQUFWO0FBR0gsaUJBSkQ7O0FBTUEscUJBQUssSUFBTCxDQUFVLFlBQVc7O0FBRWpCLHlCQUFLLElBQUksR0FBVCxJQUFnQixLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLEtBQWhDLEVBQXVDOztBQUVuQyw2Q0FBVyxJQUFYLENBQWdCLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBaEIsRUFBNEMsUUFBNUMsRUFBc0QsVUFBVSxLQUFWLEVBQWlCOztBQUVuRSxnQ0FBSSxZQUFZLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsQ0FDWCxHQURXLENBQ1AsVUFBQyxDQUFEO0FBQUEsdUNBQU8sRUFBRSxNQUFUO0FBQUEsNkJBRE8sRUFFWCxNQUZXLENBRUosVUFBQyxJQUFELEVBQU8sSUFBUDtBQUFBLHVDQUFnQixRQUFRLElBQXhCO0FBQUEsNkJBRkksQ0FBaEI7O0FBSUEsZ0NBQUksU0FBSixFQUFlO0FBQ1gsaURBQWlCLElBQWpCLEVBQXVCLEtBQXZCO0FBQ0g7QUFDSix5QkFURDtBQVVIOztBQUVELHlCQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQW9CLFVBQVMsUUFBVCxFQUFtQjtBQUNuQyx3Q0FBZ0IsUUFBaEI7QUFDSCxxQkFGRDtBQUdILGlCQW5CRDtBQW9CSDs7O3FDQUVRO0FBQUEsb0JBRUcsS0FGSCxHQUVhLEtBQUssS0FGbEIsQ0FFRyxLQUZIOzs7QUFJTCxvQkFBTSxXQUFXO0FBQ2IsMkJBQU8sTUFETTtBQUViLDRCQUFRO0FBRkssaUJBQWpCOztBQUtBLHVCQUNJO0FBQUE7QUFBQSxzQkFBSyxPQUFPLFFBQVosRUFBc0IsT0FBTyxLQUE3QixFQUFvQyxLQUFJLFNBQXhDO0FBQWtELHlFQUFXLE9BQU8sS0FBbEI7QUFBbEQsaUJBREo7QUFHSDs7Ozs7O3NCQUdVLHlCQUFRLGVBQVIsRUFBeUIsa0JBQXpCLEVBQTZDLEtBQTdDLEMiLCJmaWxlIjoiY29tcG9uZW50c1xcbWFwLXZpZXcuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcblxyXG5pbXBvcnQgTWFwTGVnZW5kIGZyb20gJ2FwcC9jb21wb25lbnRzL21hcC1sZWdlbmQnXHJcblxyXG5pbXBvcnQgeyBzZXRDdXJyZW50U2NhbGUsIHNldEluaXRpYWxMZWdlbmQgfSBmcm9tICdhcHAvYWN0aW9ucy9tYXAtbGVnZW5kLWFjdGlvbnMnXHJcblxyXG5pbXBvcnQgTWFwIGZyb20gXCJlc3JpL01hcFwiXHJcbmltcG9ydCBTY2VuZVZpZXcgZnJvbSBcImVzcmkvdmlld3MvU2NlbmVWaWV3XCJcclxuaW1wb3J0IE1hcEltYWdlTGF5ZXIgZnJvbSBcImVzcmkvbGF5ZXJzL01hcEltYWdlTGF5ZXJcIlxyXG5pbXBvcnQgd2F0Y2hVdGlscyBmcm9tICdlc3JpL2NvcmUvd2F0Y2hVdGlscydcclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xyXG4gICAgcmV0dXJuIHsgfVxyXG59XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2V0SW5pdGlhbExlZ2VuZDogKHZpZXcsIG1hcElkKSA9PiB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHNldEluaXRpYWxMZWdlbmQodmlldywgbWFwSWQpKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0Q3VycmVudFNjYWxlOiAoY3VycmVudFNjYWxlKSA9PiB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHNldEN1cnJlbnRTY2FsZShjdXJyZW50U2NhbGUpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTWFwVWkgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgICAgXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuXHJcbiAgICAgICAgY29uc3QgeyBtYXBJZCwgc2V0Q3VycmVudFNjYWxlLCBzZXRJbml0aWFsTGVnZW5kIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgICAgIGNvbnN0IGltYWdlTHlyID0gbmV3IE1hcEltYWdlTGF5ZXIoe1xyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly90bXNlcnZpY2VzMS5lc3JpLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9MaXZlRmVlZHMvSHVycmljYW5lX0FjdGl2ZS9NYXBTZXJ2ZXJcIlxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoe1xyXG4gICAgICAgICAgICBiYXNlbWFwOiBcInRvcG9cIixcclxuICAgICAgICAgICAgbGF5ZXJzOiBbaW1hZ2VMeXJdXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBTY2VuZVZpZXcoe1xyXG4gICAgICAgICAgICBjb250YWluZXI6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5tYXBWaWV3KSxcclxuICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IHsgcmlnaHQ6IDI4MCB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaW1hZ2VMeXIudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmlldy5nb1RvKHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjogWzEzMCwgMF1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB2aWV3LnRoZW4oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBseXIgaW4gdmlldy5tYXAubGF5ZXJzLml0ZW1zKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgd2F0Y2hVdGlscy5vbmNlKHZpZXcubWFwLmxheWVycy5pdGVtc1tseXJdLCAnbG9hZGVkJywgZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbGxMb2FkZWQgPSB2aWV3Lm1hcC5sYXllcnMuaXRlbXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoYSkgPT4gYS5sb2FkZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHByZXYgJiYgY3VycilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbExvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJbml0aWFsTGVnZW5kKHZpZXcsIG1hcElkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZpZXcud2F0Y2goJ3NjYWxlJywgZnVuY3Rpb24obmV3U2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHNldEN1cnJlbnRTY2FsZShuZXdTY2FsZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgY29uc3QgeyBtYXBJZCB9ID0gdGhpcy5wcm9wc1xyXG5cclxuICAgICAgICBjb25zdCBtYXBTdHlsZSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e21hcFN0eWxlfSBtYXBJZD17bWFwSWR9IHJlZj0nbWFwVmlldyc+PE1hcExlZ2VuZCBtYXBJZD17bWFwSWR9IC8+PC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShNYXBVaSlcclxuIl19