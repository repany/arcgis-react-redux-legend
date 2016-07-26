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
            legends: state.mapLegendConfig.legends
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

                    var marginStyle = { marginLeft: 8 };

                    var subLayerLegendData = item.expanded === true && item.subLayerLegendData !== null && item.subLayerLegendData !== undefined ? item.subLayerLegendData.map(renderSubNodeLegendData) : '';

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXG1hcC1sZWdlbmQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLFFBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsS0FBRCxFQUFXO0FBQy9CLGVBQU87QUFDSCxxQkFBUyxNQUFNLGVBQU4sQ0FBc0I7QUFENUIsU0FBUDtBQUdILEtBSkQ7O0FBTUEsUUFBTSxxQkFBcUIsU0FBckIsa0JBQXFCLENBQUMsUUFBRCxFQUFjO0FBQ3JDLGVBQU87QUFDSCx5QkFBYSxxQkFBQyxHQUFELEVBQU0sS0FBTixFQUFnQjtBQUN6Qix5QkFBUyxtQ0FBWSxHQUFaLEVBQWlCLEtBQWpCLENBQVQ7QUFDSCxhQUhFO0FBSUgsZ0NBQW9CLDRCQUFDLEVBQUQsRUFBSyxLQUFMLEVBQWU7QUFDL0IseUJBQVMsMENBQW1CLEVBQW5CLEVBQXVCLEtBQXZCLENBQVQ7QUFDSCxhQU5FO0FBT0gsK0JBQW1CLDJCQUFDLEVBQUQsRUFBSyxLQUFMLEVBQWU7QUFDOUIseUJBQVMseUNBQWtCLEVBQWxCLEVBQXNCLEtBQXRCLENBQVQ7QUFDSDtBQVRFLFNBQVA7QUFXSCxLQVpEOztRQWNNLFM7Ozs7Ozs7Ozs7O2dEQUVrQjtBQUFBLDZCQUV3QixLQUFLLEtBRjdCO0FBQUEsb0JBRVIsT0FGUSxVQUVSLE9BRlE7QUFBQSxvQkFFQyxLQUZELFVBRUMsS0FGRDtBQUFBLG9CQUVRLFdBRlIsVUFFUSxXQUZSOztBQUdoQixvQkFBTSxTQUFTLFFBQVEsS0FBUixDQUFmOztBQUVBLG9CQUFJLFdBQVcsSUFBWCxJQUFtQixVQUFVLFNBQWpDLEVBQTRDOztBQUU1QyxxQkFBSyxJQUFJLEdBQVQsSUFBZ0IsT0FBTyxLQUF2QixFQUE4Qjs7QUFFMUIsd0JBQU0sTUFBTSxPQUFPLEtBQVAsQ0FBYSxHQUFiLEVBQWtCLEdBQTlCOztBQUVBLHdCQUFJLE9BQU8s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IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuaW1wb3J0IHsgZmV0Y2hMZWdlbmQsIHRvZ2dsZU5vZGVFeHBhbmRlZCwgdG9nZ2xlTm9kZVZpc2libGUgfSBmcm9tICdhcHAvYWN0aW9ucy9tYXAtbGVnZW5kLWFjdGlvbnMnXHJcblxyXG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCdcclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsZWdlbmRzOiBzdGF0ZS5tYXBMZWdlbmRDb25maWcubGVnZW5kc1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZmV0Y2hMZWdlbmQ6ICh1cmwsIG1hcElkKSA9PiB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKGZldGNoTGVnZW5kKHVybCwgbWFwSWQpKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlTm9kZUV4cGFuZGVkOiAoaWQsIG1hcElkKSA9PiB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHRvZ2dsZU5vZGVFeHBhbmRlZChpZCwgbWFwSWQpKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlTm9kZVZpc2libGU6IChpZCwgbWFwSWQpID0+IHtcclxuICAgICAgICAgICAgZGlzcGF0Y2godG9nZ2xlTm9kZVZpc2libGUoaWQsIG1hcElkKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1hcExlZ2VuZCBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgbGVnZW5kcywgbWFwSWQsIGZldGNoTGVnZW5kIH0gPSB0aGlzLnByb3BzXHJcbiAgICAgICAgY29uc3QgbGVnZW5kID0gbGVnZW5kc1ttYXBJZF1cclxuXHJcbiAgICAgICAgaWYgKGxlZ2VuZCA9PT0gbnVsbCB8fCBsZWdlbmQgPT0gdW5kZWZpbmVkKSByZXR1cm5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgbHlyIGluIGxlZ2VuZC5pdGVtcykge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXJsID0gbGVnZW5kLml0ZW1zW2x5cl0udXJsXHJcblxyXG4gICAgICAgICAgICBpZiAodXJsICYmIHVybCAhPSB1bmRlZmluZWQgJiYgbGVnZW5kLml0ZW1zW2x5cl0uYWxyZWFkeUxvYWRlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGZldGNoTGVnZW5kKHVybCwgbWFwSWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgbGVnZW5kcywgbWFwSWQsIGZldGNoTGVnZW5kLCB2aWV3IH0gPSB0aGlzLnByb3BzXHJcbiAgICAgICAgY29uc3QgbGVnZW5kID0gbGVnZW5kc1ttYXBJZF1cclxuXHJcbiAgICAgICAgaWYgKGxlZ2VuZCA9PT0gbnVsbCB8fCBsZWdlbmQgPT0gdW5kZWZpbmVkKSByZXR1cm5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgbHlyIGluIGxlZ2VuZC5pdGVtcykge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXJsID0gbGVnZW5kLml0ZW1zW2x5cl0udXJsXHJcblxyXG4gICAgICAgICAgICBpZiAodXJsICYmIHVybCAhPSB1bmRlZmluZWQgJiYgbGVnZW5kLml0ZW1zW2x5cl0uYWxyZWFkeUxvYWRlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGZldGNoTGVnZW5kKHVybCwgbWFwSWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBjb25zdCB7IGxlZ2VuZHMsIG1hcElkLCB0b2dnbGVOb2RlRXhwYW5kZWQsIHRvZ2dsZU5vZGVWaXNpYmxlIH0gPSB0aGlzLnByb3BzXHJcbiAgICAgICAgY29uc3QgbGVnZW5kID0gbGVnZW5kc1ttYXBJZF1cclxuXHJcbiAgICAgICAgbGV0IG5vZGVzID0gW11cclxuICAgICAgICBpZiAobGVnZW5kICE9PSBudWxsICYmIGxlZ2VuZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG5vZGVzID0gbGVnZW5kLml0ZW1zXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZW5kZXJTdWJOb2RlTGVnZW5kRGF0YSA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlU3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogaXRlbS5pbWFnZVdpZHRoICsgOCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogaXRlbS5pbWFnZUhlaWdodCxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChkYXRhOmltYWdlL3BuZztiYXNlNjQsJyArIGl0ZW0uaW1hZ2UgKyAnKScsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0JyxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRleHRTdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbjogJ2JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA1MDBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbWFyZ2luU3R5bGUgPSB7IG1hcmdpbkxlZnQ6IDE2IH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aXRlbS5pZH0gc3R5bGU9e21hcmdpblN0eWxlfT48ZGl2IHN0eWxlPXtpbWFnZVN0eWxlfT48L2Rpdj48bGFiZWwgc3R5bGU9e3RleHRTdHlsZX0+e2l0ZW0ubGFiZWx9PC9sYWJlbD48L2Rpdj5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbmRlclN1Yk5vZGVzID0gZnVuY3Rpb24oaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbWFyZ2luU3R5bGUgPSB7IG1hcmdpbkxlZnQ6IDggfVxyXG5cclxuICAgICAgICAgICAgbGV0IHN1YkxheWVyTGVnZW5kRGF0YSA9IGl0ZW0uZXhwYW5kZWQgPT09IHRydWUgJiYgaXRlbS5zdWJMYXllckxlZ2VuZERhdGEgIT09IG51bGwgJiYgaXRlbS5zdWJMYXllckxlZ2VuZERhdGEgIT09IHVuZGVmaW5lZCA/IGl0ZW0uc3ViTGF5ZXJMZWdlbmREYXRhLm1hcChyZW5kZXJTdWJOb2RlTGVnZW5kRGF0YSkgOiAnJ1xyXG5cclxuICAgICAgICAgICAgbGV0IHN1Yk5vZGVFeHBhbmRlciA9IGl0ZW0uc3ViTGF5ZXJMZWdlbmREYXRhID09PSBudWxsIHx8IGl0ZW0uc3ViTGF5ZXJMZWdlbmREYXRhID09IHVuZGVmaW5lZCA/ICcnIDogaXRlbS5leHBhbmRlZCA/IDxpIG9uQ2xpY2s9eygpID0+IHRvZ2dsZU5vZGVFeHBhbmRlZChpdGVtLmlkLCBtYXBJZCl9IGNsYXNzTmFtZT1cImZhIGZhLWNhcmV0LWRvd24gY2xpY2stbGVnZW5kLW5vZGVcIj48L2k+IDogPGkgb25DbGljaz17KCkgPT4gdG9nZ2xlTm9kZUV4cGFuZGVkKGl0ZW0uaWQsIG1hcElkKX0gY2xhc3NOYW1lPVwiZmEgZmEtY2FyZXQtcmlnaHQgY2xpY2stbGVnZW5kLW5vZGVcIj48L2k+XHJcblxyXG4gICAgICAgICAgICBsZXQgc3ViTm9kZUNoZWNrYm94ID0gaXRlbS52aXNpYmxlID8gPGRpdiBjbGFzc05hbWU9J2lubGluZS1ibG9jay1kaXNwbGF5IGJvdHRvbS1tYXJnaW4nPjxDaGVja2JveCBvbkNoYW5nZT17KCkgPT4gdG9nZ2xlTm9kZVZpc2libGUoaXRlbS5pZCwgbWFwSWQpfSBjaGVja2VkPntpdGVtLnN1YkxheWVyTmFtZX08L0NoZWNrYm94PjwvZGl2PiA6IDxkaXYgY2xhc3NOYW1lPSdpbmxpbmUtYmxvY2stZGlzcGxheSBib3R0b20tbWFyZ2luJz48Q2hlY2tib3ggb25DaGFuZ2U9eygpID0+IHRvZ2dsZU5vZGVWaXNpYmxlKGl0ZW0uaWQsIG1hcElkKX0+e2l0ZW0uc3ViTGF5ZXJOYW1lfTwvQ2hlY2tib3g+PC9kaXY+XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l0ZW0uaWR9IHN0eWxlPXttYXJnaW5TdHlsZX0+e3N1Yk5vZGVFeHBhbmRlcn17c3ViTm9kZUNoZWNrYm94fXtzdWJMYXllckxlZ2VuZERhdGF9PC9kaXY+XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVuZGVyTm9kZXMgPSBmdW5jdGlvbihpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXJnaW5TdHlsZSA9IHsgbWFyZ2luTGVmdDogNCB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc3VibGF5ZXJzID0gaXRlbS5leHBhbmRlZCA9PT0gdHJ1ZSAmJiBpdGVtLmxlZ2VuZExheWVycyAhPT0gbnVsbCAmJiBpdGVtLmxlZ2VuZExheWVycyAhPT0gdW5kZWZpbmVkID8gaXRlbS5sZWdlbmRMYXllcnMubWFwKHJlbmRlclN1Yk5vZGVzKSA6ICcnXHJcblxyXG4gICAgICAgICAgICBsZXQgdG9wTm9kZUV4cGFuZGVyID0gaXRlbS5sZWdlbmRMYXllcnMgPT09IG51bGwgfHwgaXRlbS5sZWdlbmRMYXllcnMgPT0gdW5kZWZpbmVkID8gJycgOiBpdGVtLmV4cGFuZGVkID8gPGkgb25DbGljaz17KCkgPT4gdG9nZ2xlTm9kZUV4cGFuZGVkKGl0ZW0uaWQsIG1hcElkKX0gY2xhc3NOYW1lPVwiZmEgZmEtY2FyZXQtZG93biBjbGljay1sZWdlbmQtbm9kZVwiPjwvaT4gOiA8aSBvbkNsaWNrPXsoKSA9PiB0b2dnbGVOb2RlRXhwYW5kZWQoaXRlbS5pZCwgbWFwSWQpfSBjbGFzc05hbWU9XCJmYSBmYS1jYXJldC1yaWdodCBjbGljay1sZWdlbmQtbm9kZVwiPjwvaT5cclxuXHJcbiAgICAgICAgICAgIGxldCBub2RlQ2hlY2tib3ggPSBpdGVtLnZpc2libGUgPyA8ZGl2IGNsYXNzTmFtZT0naW5saW5lLWJsb2NrLWRpc3BsYXkgYm90dG9tLW1hcmdpbic+PENoZWNrYm94IG9uQ2hhbmdlPXsoKSA9PiB0b2dnbGVOb2RlVmlzaWJsZShpdGVtLmlkLCBtYXBJZCl9IGNoZWNrZWQ+e2l0ZW0ubGF5ZXJOYW1lfTwvQ2hlY2tib3g+PC9kaXY+IDogPGRpdiBjbGFzc05hbWU9J2lubGluZS1ibG9jay1kaXNwbGF5IGJvdHRvbS1tYXJnaW4nPjxDaGVja2JveCBvbkNoYW5nZT17KCkgPT4gdG9nZ2xlTm9kZVZpc2libGUoaXRlbS5pZCwgbWFwSWQpfT57aXRlbS5sYXllck5hbWV9PC9DaGVja2JveD48L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aXRlbS5pZH0gc3R5bGU9e21hcmdpblN0eWxlfT57dG9wTm9kZUV4cGFuZGVyfXtub2RlQ2hlY2tib3h9e3N1YmxheWVyc308L2Rpdj5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPSdsZWdlbmQnPlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPSdsZWdlbmQtbWFwJz57bWFwSWQucmVwbGFjZSgnLScsICcgLSAnKX08L2g1PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtub2Rlcy5tYXAocmVuZGVyTm9kZXMpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoTWFwTGVnZW5kKSJdfQ==