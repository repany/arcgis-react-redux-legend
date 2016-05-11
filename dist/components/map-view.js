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


                var permitsLyr = new _MapImageLayer2.default({
                    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/PoolPermits/MapServer"
                });

                var map = new _Map2.default({
                    basemap: "dark-gray",
                    layers: [permitsLyr]
                });

                var view = new _SceneView2.default({
                    container: _reactDom2.default.findDOMNode(this.refs.mapView),
                    map: map
                });

                permitsLyr.then(function () {
                    view.goTo(permitsLyr.fullExtent);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXG1hcC12aWV3LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxRQUFNLGtCQUFrQixTQUFsQixlQUFrQixDQUFDLEtBQUQsRUFBVztBQUMvQixlQUFPLEVBQVA7QUFDSCxLQUZEOztBQUlBLFFBQU0scUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLFFBQUQsRUFBYztBQUNyQyxlQUFPO0FBQ0gsOEJBQWtCLDBCQUFDLElBQUQsRUFBTyxLQUFQLEVBQWlCO0FBQy9CLHlCQUFTLHdDQUFpQixJQUFqQixFQUF1QixLQUF2QixDQUFUO0FBQ0g7QUFIRSxTQUFQO0FBS0gsS0FORDs7UUFRTSxLOzs7Ozs7Ozs7OztnREFFa0I7QUFBQSw2QkFFb0IsS0FBSyxLQUZ6QjtBQUFBLG9CQUVSLEtBRlEsVUFFUixLQUZRO0FBQUEsb0JBRUQsZ0JBRkMsVUFFRCxnQkFGQzs7O0FBSWhCLG9CQUFNLGFBQWEsNEJBQWtCO0FBQ2pDLHlCQUFLO0FBRDRCLGlCQUFsQixDQUFuQjs7QUFJQSxvQkFBTSxNQUFNLGtCQUFRO0FBQ2hCLDZCQUFTLFdBRE87QUFFaEIsNEJBQVEsQ0FBQyxVQUFEO0FBRlEsaUJBQVIsQ0FBWjs7QUFLQSxvQkFBTSxPQUFPLHdCQUFjO0FBQ3ZCLCtCQUFXLG1CQUFTLFdBQVQsQ0FBcUIsS0FBSyxJQUFMLENBQVUsT0FBL0IsQ0FEWTtBQUV2Qix5QkFBSztBQUZrQixpQkFBZCxDQUFiOztBQUtBLDJCQUFXLElBQVgsQ0FBZ0IsWUFBVztBQUN2Qix5QkFBSyxJQUFMLENBQVUsV0FBVyxVQUFyQjtBQUNILGlCQUZEOztBQUlBLHFCQUFLLElBQUwsQ0FBVSxZQUFXOztBQUVqQix5QkFBSyxJQUFJLEdBQVQsSUFBZ0IsS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFnQixLQUFoQyxFQUF1Qzs7QUFFbkMsNkNBQVcsSUFBWCxDQUFnQixLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLEtBQWhCLENBQXNCLEdBQXRCLENBQWhCLEVBQTRDLFFBQTVDLEVBQXNELFVBQVUsS0FBVixFQUFpQjs7QUFFbkUsZ0NBQUksWUFBWSxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLEtBQWhCLENBQ1gsR0FEVyxDQUNQLFVBQUMsQ0FBRDtBQUFBLHVDQUFPLEVBQUUsTUFBVDtBQUFBLDZCQURPLEVBRVgsTUFGVyxDQUVKLFVBQUMsSUFBRCxFQUFPLElBQVA7QUFBQSx1Q0FBZ0IsUUFBUSxJQUF4QjtBQUFBLDZCQUZJLENBQWhCOztBQUlBLGdDQUFJLFNBQUosRUFBZTtBQUNYLGlEQUFpQixJQUFqQixFQUF1QixLQUF2QjtBQUNIO0FBQ0oseUJBVEQ7QUFVSDtBQUNKLGlCQWZEO0FBZ0JIOzs7cUNBRVE7QUFBQSxvQkFFRyxLQUZILEdBRWEsS0FBSyxLQUZsQixDQUVHLEtBRkg7OztBQUlMLG9CQUFNLFdBQVc7QUFDYiwyQkFBTyxNQURNO0FBRWIsNEJBQVE7QUFGSyxpQkFBakI7O0FBS0EsdUJBQ0k7QUFBQTtvQkFBQSxFQUFLLE9BQU8sUUFBWixFQUFzQixPQUFPLEtBQTdCLEVBQW9DLEtBQUksU0FBeEM7b0JBQWtELHFEQUFXLE9BQU8sS0FBbEI7QUFBbEQsaUJBREo7QUFHSDs7Ozs7O3NCQUdVLHlCQUFRLGVBQVIsRUFBeUIsa0JBQXpCLEVBQTZDLEtBQTdDLEMiLCJmaWxlIjoiY29tcG9uZW50c1xcbWFwLXZpZXcuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcblxyXG5pbXBvcnQgTWFwTGVnZW5kIGZyb20gJ2FwcC9jb21wb25lbnRzL21hcC1sZWdlbmQnXHJcblxyXG5pbXBvcnQgeyBzZXRJbml0aWFsTGVnZW5kIH0gZnJvbSAnYXBwL2FjdGlvbnMvbWFwLWxlZ2VuZC1hY3Rpb25zJ1xyXG5cclxuaW1wb3J0IE1hcCBmcm9tIFwiZXNyaS9NYXBcIlxyXG5pbXBvcnQgU2NlbmVWaWV3IGZyb20gXCJlc3JpL3ZpZXdzL1NjZW5lVmlld1wiXHJcbmltcG9ydCBNYXBJbWFnZUxheWVyIGZyb20gXCJlc3JpL2xheWVycy9NYXBJbWFnZUxheWVyXCJcclxuaW1wb3J0IHdhdGNoVXRpbHMgZnJvbSAnZXNyaS9jb3JlL3dhdGNoVXRpbHMnXHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcclxuICAgIHJldHVybiB7IH1cclxufVxyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldEluaXRpYWxMZWdlbmQ6ICh2aWV3LCBtYXBJZCkgPT4ge1xyXG4gICAgICAgICAgICBkaXNwYXRjaChzZXRJbml0aWFsTGVnZW5kKHZpZXcsIG1hcElkKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1hcFVpIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgICAgIFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgbWFwSWQsIHNldEluaXRpYWxMZWdlbmQgfSA9IHRoaXMucHJvcHNcclxuXHJcbiAgICAgICAgY29uc3QgcGVybWl0c0x5ciA9IG5ldyBNYXBJbWFnZUxheWVyKHtcclxuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vc2FtcGxlc2VydmVyNi5hcmNnaXNvbmxpbmUuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL1Bvb2xQZXJtaXRzL01hcFNlcnZlclwiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3QgbWFwID0gbmV3IE1hcCh7XHJcbiAgICAgICAgICAgIGJhc2VtYXA6IFwiZGFyay1ncmF5XCIsXHJcbiAgICAgICAgICAgIGxheWVyczogW3Blcm1pdHNMeXJdXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBTY2VuZVZpZXcoe1xyXG4gICAgICAgICAgICBjb250YWluZXI6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5tYXBWaWV3KSxcclxuICAgICAgICAgICAgbWFwOiBtYXBcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBwZXJtaXRzTHlyLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZpZXcuZ29UbyhwZXJtaXRzTHlyLmZ1bGxFeHRlbnQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHZpZXcudGhlbihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGx5ciBpbiB2aWV3Lm1hcC5sYXllcnMuaXRlbXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB3YXRjaFV0aWxzLm9uY2Uodmlldy5tYXAubGF5ZXJzLml0ZW1zW2x5cl0sICdsb2FkZWQnLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFsbExvYWRlZCA9IHZpZXcubWFwLmxheWVycy5pdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKChhKSA9PiBhLmxvYWRlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgocHJldiwgY3VycikgPT4gcHJldiAmJiBjdXJyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEluaXRpYWxMZWdlbmQodmlldywgbWFwSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBjb25zdCB7IG1hcElkIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgICAgIGNvbnN0IG1hcFN0eWxlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17bWFwU3R5bGV9IG1hcElkPXttYXBJZH0gcmVmPSdtYXBWaWV3Jz48TWFwTGVnZW5kIG1hcElkPXttYXBJZH0gLz48L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1hcFVpKVxyXG4iXX0=