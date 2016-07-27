define(['exports', 'react', 'react-redux', 'app/actions/map-legend-actions', 'react-bootstrap'], function (exports, _react, _reactRedux, _mapLegendActions, _reactBootstrap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

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
        return {
            legends: state.mapLegendConfig.legends,
            currentScale: state.mapLegendConfig.currentScale
        };
    };

    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return {
            fetchLegend: function fetchLegend(url, mapId) {
                dispatch((0, _mapLegendActions.fetchLegend)(url, mapId));
            },
            toggleNodeExpanded: function toggleNodeExpanded(id, mapId) {
                dispatch((0, _mapLegendActions.toggleNodeExpanded)(id, mapId));
            },
            toggleNodeVisible: function toggleNodeVisible(id, mapId) {
                dispatch((0, _mapLegendActions.toggleNodeVisible)(id, mapId));
            }
        };
    };

    var MapLegend = function (_Component) {
        _inherits(MapLegend, _Component);

        function MapLegend() {
            _classCallCheck(this, MapLegend);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(MapLegend).apply(this, arguments));
        }

        _createClass(MapLegend, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _props = this.props;
                var legends = _props.legends;
                var mapId = _props.mapId;
                var fetchLegend = _props.fetchLegend;

                var legend = legends[mapId];

                if (legend === null || legend == undefined) return;

                for (var lyr in legend.items) {

                    var url = legend.items[lyr].url;

                    if (url && url != undefined && legend.items[lyr].alreadyLoaded === false) {
                        fetchLegend(url, mapId);
                    }
                }
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps, prevState) {
                var _props2 = this.props;
                var legends = _props2.legends;
                var mapId = _props2.mapId;
                var fetchLegend = _props2.fetchLegend;
                var view = _props2.view;

                var legend = legends[mapId];

                if (legend === null || legend == undefined) return;

                for (var lyr in legend.items) {

                    var url = legend.items[lyr].url;

                    if (url && url != undefined && legend.items[lyr].alreadyLoaded === false) {
                        fetchLegend(url, mapId);
                    }
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _props3 = this.props;
                var legends = _props3.legends;
                var mapId = _props3.mapId;
                var currentScale = _props3.currentScale;
                var toggleNodeExpanded = _props3.toggleNodeExpanded;
                var toggleNodeVisible = _props3.toggleNodeVisible;

                var legend = legends[mapId];

                var nodes = [];
                if (legend !== null && legend !== undefined) {
                    nodes = legend.items;
                }

                var renderSubNodeLegendData = function renderSubNodeLegendData(item) {

                    var imageStyle = {
                        width: item.imageWidth + 8,
                        height: item.imageHeight,
                        backgroundImage: 'url(data:image/png;base64,' + item.image + ')',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block'
                    };

                    var textStyle = {
                        display: 'inline-block',
                        verticalAlign: 'bottom',
                        fontWeight: 500
                    };

                    var marginStyle = { marginLeft: 16 };

                    return _react2.default.createElement(
                        'div',
                        { key: item.id, style: marginStyle },
                        _react2.default.createElement('div', { style: imageStyle }),
                        _react2.default.createElement(
                            'label',
                            { style: textStyle },
                            item.label
                        )
                    );
                };

                var renderSubNodes = function renderSubNodes(item) {

                    var marginStyle = { marginLeft: 8, marginTop: 8 };

                    var subLayerLegendData = item.expanded === true && item.subLayerLegendData !== null && item.subLayerLegendData !== undefined ? item.subLayerLegendData.map(renderSubNodeLegendData) : '';

                    if (item.subLayerScaleRestricted === true && item.subLayerMinScale < currentScale || item.subLayerMaxScale > currentScale) {
                        marginStyle.color = '#dcdcdc';
                    }

                    var subNodeExpander = item.subLayerLegendData === null || item.subLayerLegendData == undefined ? '' : item.expanded ? _react2.default.createElement('i', { onClick: function onClick() {
                            return toggleNodeExpanded(item.id, mapId);
                        }, className: 'fa fa-caret-down click-legend-node' }) : _react2.default.createElement('i', { onClick: function onClick() {
                            return toggleNodeExpanded(item.id, mapId);
                        }, className: 'fa fa-caret-right click-legend-node' });

                    var subNodeCheckbox = item.visible ? _react2.default.createElement(
                        'div',
                        { className: 'inline-block-display bottom-margin' },
                        _react2.default.createElement(
                            _reactBootstrap.Checkbox,
                            { onChange: function onChange() {
                                    return toggleNodeVisible(item.id, mapId);
                                }, checked: true },
                            item.subLayerName
                        )
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'inline-block-display bottom-margin' },
                        _react2.default.createElement(
                            _reactBootstrap.Checkbox,
                            { onChange: function onChange() {
                                    return toggleNodeVisible(item.id, mapId);
                                } },
                            item.subLayerName
                        )
                    );

                    return _react2.default.createElement(
                        'div',
                        { key: item.id, style: marginStyle },
                        subNodeExpander,
                        subNodeCheckbox,
                        subLayerLegendData
                    );
                };

                var renderNodes = function renderNodes(item) {

                    var marginStyle = { marginLeft: 4 };

                    var sublayers = item.expanded === true && item.legendLayers !== null && item.legendLayers !== undefined ? item.legendLayers.map(renderSubNodes) : '';

                    var topNodeExpander = item.legendLayers === null || item.legendLayers == undefined ? '' : item.expanded ? _react2.default.createElement('i', { onClick: function onClick() {
                            return toggleNodeExpanded(item.id, mapId);
                        }, className: 'fa fa-caret-down click-legend-node' }) : _react2.default.createElement('i', { onClick: function onClick() {
                            return toggleNodeExpanded(item.id, mapId);
                        }, className: 'fa fa-caret-right click-legend-node' });

                    var nodeCheckbox = item.visible ? _react2.default.createElement(
                        'div',
                        { className: 'inline-block-display bottom-margin' },
                        _react2.default.createElement(
                            _reactBootstrap.Checkbox,
                            { onChange: function onChange() {
                                    return toggleNodeVisible(item.id, mapId);
                                }, checked: true },
                            item.layerName
                        )
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'inline-block-display bottom-margin' },
                        _react2.default.createElement(
                            _reactBootstrap.Checkbox,
                            { onChange: function onChange() {
                                    return toggleNodeVisible(item.id, mapId);
                                } },
                            item.layerName
                        )
                    );

                    return _react2.default.createElement(
                        'div',
                        { key: item.id, style: marginStyle },
                        topNodeExpander,
                        nodeCheckbox,
                        sublayers
                    );
                };

                return _react2.default.createElement(
                    'div',
                    { id: 'legend' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h5',
                            { className: 'legend-map' },
                            mapId.replace('-', ' - ')
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        nodes.map(renderNodes)
                    )
                );
            }
        }]);

        return MapLegend;
    }(_react.Component);

    exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MapLegend);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXG1hcC1sZWdlbmQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLFFBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsS0FBRCxFQUFXO0FBQy9CLGVBQU87QUFDSCxxQkFBUyxNQUFNLGVBQU4sQ0FBc0IsT0FENUI7QUFFSCwwQkFBYyxNQUFNLGVBQU4sQ0FBc0I7QUFGakMsU0FBUDtBQUlILEtBTEQ7O0FBT0EsUUFBTSxxQkFBcUIsU0FBckIsa0JBQXFCLENBQUMsUUFBRCxFQUFjO0FBQ3JDLGVBQU87QUFDSCx5QkFBYSxxQkFBQyxHQUFELEVBQU0sS0FBTixFQUFnQjtBQUN6Qix5QkFBUyxtQ0FBWSxHQUFaLEVBQWlCLEtBQWpCLENBQVQ7QUFDSCxhQUhFO0FBSUgsZ0NBQW9CLDRCQUFDLEVBQUQsRUFBSyxLQUFMLEVBQWU7QUFDL0IseUJBQVMsMENBQW1CLEVBQW5CLEVBQXVCLEtBQXZCLENBQVQ7QUFDSCxhQU5FO0FBT0gsK0JBQW1CLDJCQUFDLEVBQUQsRUFBSyxLQUFMLEVBQWU7QUFDOUIseUJBQVMseUNBQWtCLEVBQWxCLEVBQXNCLEtBQXRCLENBQVQ7QUFDSDtBQVRFLFNBQVA7QUFXSCxLQVpEOztRQWNNLFM7Ozs7Ozs7Ozs7O2dEQUVrQjtBQUFBLDZCQUV3QixLQUFLLEtBRjdCO0FBQUEsb0JBRVIsT0FGUSxVQUVSLE9BRlE7QUFBQSxvQkFFQyxLQUZELFVBRUMsS0FGRDtBQUFBLG9CQUVRLFdBRlIsVUFFUSxXQUZSOztBQUdoQixvQkFBTSxTQUFTLFFBQVEsS0FBUixDQUFmOztBQUVBLG9CQUFJLFdBQVcsSUFBWCxJQUFtQixVQUFVLFNBQWpDLEVBQTRDOztBQUU1QyxxQkFBSyxJQUFJLEdBQVQsSUFBZ0IsT0FBTyxLQUF2QixFQUE4Qjs7QUFFMUIsd0JBQU0sTUFBTSxPQUFPLEtBQVAsQ0FBYSxH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R0FBZCxFQUFtQixLQUFuQjtBQUE1QjtBQURKLHFCQURKO0FBSUk7QUFBQTtBQUFBO0FBQ0ssOEJBQU0sR0FBTixDQUFVLFdBQVY7QUFETDtBQUpKLGlCQURKO0FBVUg7Ozs7OztzQkFHVSx5QkFBUSxlQUFSLEVBQXlCLGtCQUF6QixFQUE2QyxTQUE3QyxDIiwiZmlsZSI6ImNvbXBvbmVudHNcXG1hcC1sZWdlbmQuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcbmltcG9ydCB7IGZldGNoTGVnZW5kLCB0b2dnbGVOb2RlRXhwYW5kZWQsIHRvZ2dsZU5vZGVWaXNpYmxlIH0gZnJvbSAnYXBwL2FjdGlvbnMvbWFwLWxlZ2VuZC1hY3Rpb25zJ1xyXG5cclxuaW1wb3J0IHsgQ2hlY2tib3ggfSBmcm9tICdyZWFjdC1ib290c3RyYXAnXHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGVnZW5kczogc3RhdGUubWFwTGVnZW5kQ29uZmlnLmxlZ2VuZHMsXHJcbiAgICAgICAgY3VycmVudFNjYWxlOiBzdGF0ZS5tYXBMZWdlbmRDb25maWcuY3VycmVudFNjYWxlXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBmZXRjaExlZ2VuZDogKHVybCwgbWFwSWQpID0+IHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goZmV0Y2hMZWdlbmQodXJsLCBtYXBJZCkpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGVOb2RlRXhwYW5kZWQ6IChpZCwgbWFwSWQpID0+IHtcclxuICAgICAgICAgICAgZGlzcGF0Y2godG9nZ2xlTm9kZUV4cGFuZGVkKGlkLCBtYXBJZCkpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGVOb2RlVmlzaWJsZTogKGlkLCBtYXBJZCkgPT4ge1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh0b2dnbGVOb2RlVmlzaWJsZShpZCwgbWFwSWQpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTWFwTGVnZW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuXHJcbiAgICAgICAgY29uc3QgeyBsZWdlbmRzLCBtYXBJZCwgZmV0Y2hMZWdlbmQgfSA9IHRoaXMucHJvcHNcclxuICAgICAgICBjb25zdCBsZWdlbmQgPSBsZWdlbmRzW21hcElkXVxyXG5cclxuICAgICAgICBpZiAobGVnZW5kID09PSBudWxsIHx8IGxlZ2VuZCA9PSB1bmRlZmluZWQpIHJldHVyblxyXG5cclxuICAgICAgICBmb3IgKGxldCBseXIgaW4gbGVnZW5kLml0ZW1zKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBsZWdlbmQuaXRlbXNbbHlyXS51cmxcclxuXHJcbiAgICAgICAgICAgIGlmICh1cmwgJiYgdXJsICE9IHVuZGVmaW5lZCAmJiBsZWdlbmQuaXRlbXNbbHlyXS5hbHJlYWR5TG9hZGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hMZWdlbmQodXJsLCBtYXBJZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuXHJcbiAgICAgICAgY29uc3QgeyBsZWdlbmRzLCBtYXBJZCwgZmV0Y2hMZWdlbmQsIHZpZXcgfSA9IHRoaXMucHJvcHNcclxuICAgICAgICBjb25zdCBsZWdlbmQgPSBsZWdlbmRzW21hcElkXVxyXG5cclxuICAgICAgICBpZiAobGVnZW5kID09PSBudWxsIHx8IGxlZ2VuZCA9PSB1bmRlZmluZWQpIHJldHVyblxyXG5cclxuICAgICAgICBmb3IgKGxldCBseXIgaW4gbGVnZW5kLml0ZW1zKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBsZWdlbmQuaXRlbXNbbHlyXS51cmxcclxuXHJcbiAgICAgICAgICAgIGlmICh1cmwgJiYgdXJsICE9IHVuZGVmaW5lZCAmJiBsZWdlbmQuaXRlbXNbbHlyXS5hbHJlYWR5TG9hZGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hMZWdlbmQodXJsLCBtYXBJZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgbGVnZW5kcywgbWFwSWQsIGN1cnJlbnRTY2FsZSwgdG9nZ2xlTm9kZUV4cGFuZGVkLCB0b2dnbGVOb2RlVmlzaWJsZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgICAgIGNvbnN0IGxlZ2VuZCA9IGxlZ2VuZHNbbWFwSWRdXHJcblxyXG4gICAgICAgIGxldCBub2RlcyA9IFtdXHJcbiAgICAgICAgaWYgKGxlZ2VuZCAhPT0gbnVsbCAmJiBsZWdlbmQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBub2RlcyA9IGxlZ2VuZC5pdGVtc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVuZGVyU3ViTm9kZUxlZ2VuZERhdGEgPSBmdW5jdGlvbihpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbWFnZVN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGl0ZW0uaW1hZ2VXaWR0aCArIDgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGl0ZW0uaW1hZ2VIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcgKyBpdGVtLmltYWdlICsgJyknLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFJlcGVhdDogJ25vLXJlcGVhdCcsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0ZXh0U3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdib3R0b20nLFxyXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogNTAwXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1hcmdpblN0eWxlID0geyBtYXJnaW5MZWZ0OiAxNiB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l0ZW0uaWR9IHN0eWxlPXttYXJnaW5TdHlsZX0+PGRpdiBzdHlsZT17aW1hZ2VTdHlsZX0+PC9kaXY+PGxhYmVsIHN0eWxlPXt0ZXh0U3R5bGV9PntpdGVtLmxhYmVsfTwvbGFiZWw+PC9kaXY+XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZW5kZXJTdWJOb2RlcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBtYXJnaW5TdHlsZSA9IHsgbWFyZ2luTGVmdDogOCwgbWFyZ2luVG9wOiA4IH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzdWJMYXllckxlZ2VuZERhdGEgPSBpdGVtLmV4cGFuZGVkID09PSB0cnVlICYmIGl0ZW0uc3ViTGF5ZXJMZWdlbmREYXRhICE9PSBudWxsICYmIGl0ZW0uc3ViTGF5ZXJMZWdlbmREYXRhICE9PSB1bmRlZmluZWQgPyBpdGVtLnN1YkxheWVyTGVnZW5kRGF0YS5tYXAocmVuZGVyU3ViTm9kZUxlZ2VuZERhdGEpIDogJydcclxuXHJcbiAgICAgICAgICAgIGlmIChpdGVtLnN1YkxheWVyU2NhbGVSZXN0cmljdGVkID09PSB0cnVlICYmIGl0ZW0uc3ViTGF5ZXJNaW5TY2FsZSA8IGN1cnJlbnRTY2FsZSB8fCBpdGVtLnN1YkxheWVyTWF4U2NhbGUgPiBjdXJyZW50U2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIG1hcmdpblN0eWxlLmNvbG9yID0gJyNkY2RjZGMnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzdWJOb2RlRXhwYW5kZXIgPSBpdGVtLnN1YkxheWVyTGVnZW5kRGF0YSA9PT0gbnVsbCB8fCBpdGVtLnN1YkxheWVyTGVnZW5kRGF0YSA9PSB1bmRlZmluZWQgPyAnJyA6IGl0ZW0uZXhwYW5kZWQgPyA8aSBvbkNsaWNrPXsoKSA9PiB0b2dnbGVOb2RlRXhwYW5kZWQoaXRlbS5pZCwgbWFwSWQpfSBjbGFzc05hbWU9XCJmYSBmYS1jYXJldC1kb3duIGNsaWNrLWxlZ2VuZC1ub2RlXCI+PC9pPiA6IDxpIG9uQ2xpY2s9eygpID0+IHRvZ2dsZU5vZGVFeHBhbmRlZChpdGVtLmlkLCBtYXBJZCl9IGNsYXNzTmFtZT1cImZhIGZhLWNhcmV0LXJpZ2h0IGNsaWNrLWxlZ2VuZC1ub2RlXCI+PC9pPlxyXG5cclxuICAgICAgICAgICAgbGV0IHN1Yk5vZGVDaGVja2JveCA9IGl0ZW0udmlzaWJsZSA/IDxkaXYgY2xhc3NOYW1lPSdpbmxpbmUtYmxvY2stZGlzcGxheSBib3R0b20tbWFyZ2luJz48Q2hlY2tib3ggb25DaGFuZ2U9eygpID0+IHRvZ2dsZU5vZGVWaXNpYmxlKGl0ZW0uaWQsIG1hcElkKX0gY2hlY2tlZD57aXRlbS5zdWJMYXllck5hbWV9PC9DaGVja2JveD48L2Rpdj4gOiA8ZGl2IGNsYXNzTmFtZT0naW5saW5lLWJsb2NrLWRpc3BsYXkgYm90dG9tLW1hcmdpbic+PENoZWNrYm94IG9uQ2hhbmdlPXsoKSA9PiB0b2dnbGVOb2RlVmlzaWJsZShpdGVtLmlkLCBtYXBJZCl9PntpdGVtLnN1YkxheWVyTmFtZX08L0NoZWNrYm94PjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpdGVtLmlkfSBzdHlsZT17bWFyZ2luU3R5bGV9PntzdWJOb2RlRXhwYW5kZXJ9e3N1Yk5vZGVDaGVja2JveH17c3ViTGF5ZXJMZWdlbmREYXRhfTwvZGl2PlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVuZGVyTm9kZXMgPSBmdW5jdGlvbihpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXJnaW5TdHlsZSA9IHsgbWFyZ2luTGVmdDogNCB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc3VibGF5ZXJzID0gaXRlbS5leHBhbmRlZCA9PT0gdHJ1ZSAmJiBpdGVtLmxlZ2VuZExheWVycyAhPT0gbnVsbCAmJiBpdGVtLmxlZ2VuZExheWVycyAhPT0gdW5kZWZpbmVkID8gaXRlbS5sZWdlbmRMYXllcnMubWFwKHJlbmRlclN1Yk5vZGVzKSA6ICcnXHJcblxyXG4gICAgICAgICAgICBsZXQgdG9wTm9kZUV4cGFuZGVyID0gaXRlbS5sZWdlbmRMYXllcnMgPT09IG51bGwgfHwgaXRlbS5sZWdlbmRMYXllcnMgPT0gdW5kZWZpbmVkID8gJycgOiBpdGVtLmV4cGFuZGVkID8gPGkgb25DbGljaz17KCkgPT4gdG9nZ2xlTm9kZUV4cGFuZGVkKGl0ZW0uaWQsIG1hcElkKX0gY2xhc3NOYW1lPVwiZmEgZmEtY2FyZXQtZG93biBjbGljay1sZWdlbmQtbm9kZVwiPjwvaT4gOiA8aSBvbkNsaWNrPXsoKSA9PiB0b2dnbGVOb2RlRXhwYW5kZWQoaXRlbS5pZCwgbWFwSWQpfSBjbGFzc05hbWU9XCJmYSBmYS1jYXJldC1yaWdodCBjbGljay1sZWdlbmQtbm9kZVwiPjwvaT5cclxuXHJcbiAgICAgICAgICAgIGxldCBub2RlQ2hlY2tib3ggPSBpdGVtLnZpc2libGUgPyA8ZGl2IGNsYXNzTmFtZT0naW5saW5lLWJsb2NrLWRpc3BsYXkgYm90dG9tLW1hcmdpbic+PENoZWNrYm94IG9uQ2hhbmdlPXsoKSA9PiB0b2dnbGVOb2RlVmlzaWJsZShpdGVtLmlkLCBtYXBJZCl9IGNoZWNrZWQ+e2l0ZW0ubGF5ZXJOYW1lfTwvQ2hlY2tib3g+PC9kaXY+IDogPGRpdiBjbGFzc05hbWU9J2lubGluZS1ibG9jay1kaXNwbGF5IGJvdHRvbS1tYXJnaW4nPjxDaGVja2JveCBvbkNoYW5nZT17KCkgPT4gdG9nZ2xlTm9kZVZpc2libGUoaXRlbS5pZCwgbWFwSWQpfT57aXRlbS5sYXllck5hbWV9PC9DaGVja2JveD48L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aXRlbS5pZH0gc3R5bGU9e21hcmdpblN0eWxlfT57dG9wTm9kZUV4cGFuZGVyfXtub2RlQ2hlY2tib3h9e3N1YmxheWVyc308L2Rpdj5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9J2xlZ2VuZCc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9J2xlZ2VuZC1tYXAnPnttYXBJZC5yZXBsYWNlKCctJywgJyAtICcpfTwvaDU+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge25vZGVzLm1hcChyZW5kZXJOb2Rlcyl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShNYXBMZWdlbmQpIl19