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
                        _react2.default.createElement(_reactBootstrap.Input, { type: 'checkbox', onChange: function onChange() {
                                return toggleNodeVisible(item.id, mapId);
                            }, checked: true, label: item.subLayerName })
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'inline-block-display bottom-margin' },
                        _react2.default.createElement(_reactBootstrap.Input, { type: 'checkbox', onChange: function onChange() {
                                return toggleNodeVisible(item.id, mapId);
                            }, label: item.subLayerName })
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
                        _react2.default.createElement(_reactBootstrap.Input, { type: 'checkbox', onChange: function onChange() {
                                return toggleNodeVisible(item.id, mapId);
                            }, checked: true, label: item.layerName })
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'inline-block-display bottom-margin' },
                        _react2.default.createElement(_reactBootstrap.Input, { type: 'checkbox', onChange: function onChange() {
                                return toggleNodeVisible(item.id, mapId);
                            }, label: item.layerName })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXG1hcC1sZWdlbmQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLFFBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsS0FBRCxFQUFXO0FBQy9CLGVBQU87QUFDSCxxQkFBUyxNQUFNLGVBQU4sQ0FBc0I7QUFENUIsU0FBUDtBQUdILEtBSkQ7O0FBTUEsUUFBTSxxQkFBcUIsU0FBckIsa0JBQXFCLENBQUMsUUFBRCxFQUFjO0FBQ3JDLGVBQU87QUFDSCx5QkFBYSxxQkFBQyxHQUFELEVBQU0sS0FBTixFQUFnQjtBQUN6Qix5QkFBUyxtQ0FBWSxHQUFaLEVBQWlCLEtBQWpCLENBQVQ7QUFDSCxhQUhFO0FBSUgsZ0NBQW9CLDRCQUFDLEVBQUQsRUFBSyxLQUFMLEVBQWU7QUFDL0IseUJBQVMsMENBQW1CLEVBQW5CLEVBQXVCLEtBQXZCLENBQVQ7QUFDSCxhQU5FO0FBT0gsK0JBQW1CLDJCQUFDLEVBQUQsRUFBSyxLQUFMLEVBQWU7QUFDOUIseUJBQVMseUNBQWtCLEVBQWxCLEVBQXNCLEtBQXRCLENBQVQ7QUFDSDtBQVRFLFNBQVA7QUFXSCxLQVpEOztRQWNNLFM7Ozs7Ozs7Ozs7O2dEQUVrQjtBQUFBLDZCQUV3QixLQUFLLEtBRjdCO0FBQUEsb0JBRVIsT0FGUSxVQUVSLE9BRlE7QUFBQSxvQkFFQyxLQUZELFVBRUMsS0FGRDtBQUFBLG9CQUVRLFdBRlIsVUFFUSxXQUZSOztBQUdoQixvQkFBTSxTQUFTLFFBQVEsS0FBUixDQUFmOztBQUVBLG9CQUFJLFdBQVcsSUFBWCxJQUFtQixVQUFVLFNBQWpDLEVBQTRDOztBQUU1QyxxQkFBSyxJQUFJLEdBQVQsSUFBZ0IsT0FBTyxLQUF2QixFQUE4Qjs7QUFFMUIsd0JBQU0sTUFBTSxPQUFPLEtBQVAsQ0FBYSxHQUFiLEVBQWtCLEdBQTlCOztBQUVBLHdCQUFJLE9BQU8s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bnRzXFxtYXAtbGVnZW5kLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5pbXBvcnQgeyBmZXRjaExlZ2VuZCwgdG9nZ2xlTm9kZUV4cGFuZGVkLCB0b2dnbGVOb2RlVmlzaWJsZSB9IGZyb20gJ2FwcC9hY3Rpb25zL21hcC1sZWdlbmQtYWN0aW9ucydcclxuXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJ1xyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxlZ2VuZHM6IHN0YXRlLm1hcExlZ2VuZENvbmZpZy5sZWdlbmRzXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBmZXRjaExlZ2VuZDogKHVybCwgbWFwSWQpID0+IHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goZmV0Y2hMZWdlbmQodXJsLCBtYXBJZCkpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGVOb2RlRXhwYW5kZWQ6IChpZCwgbWFwSWQpID0+IHtcclxuICAgICAgICAgICAgZGlzcGF0Y2godG9nZ2xlTm9kZUV4cGFuZGVkKGlkLCBtYXBJZCkpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGVOb2RlVmlzaWJsZTogKGlkLCBtYXBJZCkgPT4ge1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh0b2dnbGVOb2RlVmlzaWJsZShpZCwgbWFwSWQpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTWFwTGVnZW5kIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuXHJcbiAgICAgICAgY29uc3QgeyBsZWdlbmRzLCBtYXBJZCwgZmV0Y2hMZWdlbmQgfSA9IHRoaXMucHJvcHNcclxuICAgICAgICBjb25zdCBsZWdlbmQgPSBsZWdlbmRzW21hcElkXVxyXG5cclxuICAgICAgICBpZiAobGVnZW5kID09PSBudWxsIHx8IGxlZ2VuZCA9PSB1bmRlZmluZWQpIHJldHVyblxyXG5cclxuICAgICAgICBmb3IgKGxldCBseXIgaW4gbGVnZW5kLml0ZW1zKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBsZWdlbmQuaXRlbXNbbHlyXS51cmxcclxuXHJcbiAgICAgICAgICAgIGlmICh1cmwgJiYgdXJsICE9IHVuZGVmaW5lZCAmJiBsZWdlbmQuaXRlbXNbbHlyXS5hbHJlYWR5TG9hZGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hMZWdlbmQodXJsLCBtYXBJZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuXHJcbiAgICAgICAgY29uc3QgeyBsZWdlbmRzLCBtYXBJZCwgZmV0Y2hMZWdlbmQsIHZpZXcgfSA9IHRoaXMucHJvcHNcclxuICAgICAgICBjb25zdCBsZWdlbmQgPSBsZWdlbmRzW21hcElkXVxyXG5cclxuICAgICAgICBpZiAobGVnZW5kID09PSBudWxsIHx8IGxlZ2VuZCA9PSB1bmRlZmluZWQpIHJldHVyblxyXG5cclxuICAgICAgICBmb3IgKGxldCBseXIgaW4gbGVnZW5kLml0ZW1zKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBsZWdlbmQuaXRlbXNbbHlyXS51cmxcclxuXHJcbiAgICAgICAgICAgIGlmICh1cmwgJiYgdXJsICE9IHVuZGVmaW5lZCAmJiBsZWdlbmQuaXRlbXNbbHlyXS5hbHJlYWR5TG9hZGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hMZWdlbmQodXJsLCBtYXBJZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgbGVnZW5kcywgbWFwSWQsIHRvZ2dsZU5vZGVFeHBhbmRlZCwgdG9nZ2xlTm9kZVZpc2libGUgfSA9IHRoaXMucHJvcHNcclxuICAgICAgICBjb25zdCBsZWdlbmQgPSBsZWdlbmRzW21hcElkXVxyXG5cclxuICAgICAgICBsZXQgbm9kZXMgPSBbXVxyXG4gICAgICAgIGlmIChsZWdlbmQgIT09IG51bGwgJiYgbGVnZW5kICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbm9kZXMgPSBsZWdlbmQuaXRlbXNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbmRlclN1Yk5vZGVMZWdlbmREYXRhID0gZnVuY3Rpb24oaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaW1hZ2VTdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBpdGVtLmltYWdlV2lkdGggKyA4LFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBpdGVtLmltYWdlSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnICsgaXRlbS5pbWFnZSArICcpJyxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdGV4dFN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnYm90dG9tJyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDUwMFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXJnaW5TdHlsZSA9IHsgbWFyZ2luTGVmdDogMTYgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpdGVtLmlkfSBzdHlsZT17bWFyZ2luU3R5bGV9PjxkaXYgc3R5bGU9e2ltYWdlU3R5bGV9PjwvZGl2PjxsYWJlbCBzdHlsZT17dGV4dFN0eWxlfT57aXRlbS5sYWJlbH08L2xhYmVsPjwvZGl2PlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVuZGVyU3ViTm9kZXMgPSBmdW5jdGlvbihpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXJnaW5TdHlsZSA9IHsgbWFyZ2luTGVmdDogOCB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc3ViTGF5ZXJMZWdlbmREYXRhID0gaXRlbS5leHBhbmRlZCA9PT0gdHJ1ZSAmJiBpdGVtLnN1YkxheWVyTGVnZW5kRGF0YSAhPT0gbnVsbCAmJiBpdGVtLnN1YkxheWVyTGVnZW5kRGF0YSAhPT0gdW5kZWZpbmVkID8gaXRlbS5zdWJMYXllckxlZ2VuZERhdGEubWFwKHJlbmRlclN1Yk5vZGVMZWdlbmREYXRhKSA6ICcnXHJcblxyXG4gICAgICAgICAgICBsZXQgc3ViTm9kZUV4cGFuZGVyID0gaXRlbS5zdWJMYXllckxlZ2VuZERhdGEgPT09IG51bGwgfHwgaXRlbS5zdWJMYXllckxlZ2VuZERhdGEgPT0gdW5kZWZpbmVkID8gJycgOiBpdGVtLmV4cGFuZGVkID8gPGkgb25DbGljaz17KCkgPT4gdG9nZ2xlTm9kZUV4cGFuZGVkKGl0ZW0uaWQsIG1hcElkKX0gY2xhc3NOYW1lPVwiZmEgZmEtY2FyZXQtZG93biBjbGljay1sZWdlbmQtbm9kZVwiPjwvaT4gOiA8aSBvbkNsaWNrPXsoKSA9PiB0b2dnbGVOb2RlRXhwYW5kZWQoaXRlbS5pZCwgbWFwSWQpfSBjbGFzc05hbWU9XCJmYSBmYS1jYXJldC1yaWdodCBjbGljay1sZWdlbmQtbm9kZVwiPjwvaT5cclxuXHJcbiAgICAgICAgICAgIGxldCBzdWJOb2RlQ2hlY2tib3ggPSBpdGVtLnZpc2libGUgPyA8ZGl2IGNsYXNzTmFtZT0naW5saW5lLWJsb2NrLWRpc3BsYXkgYm90dG9tLW1hcmdpbic+PElucHV0IHR5cGU9J2NoZWNrYm94JyBvbkNoYW5nZT17KCkgPT4gdG9nZ2xlTm9kZVZpc2libGUoaXRlbS5pZCwgbWFwSWQpfSBjaGVja2VkIGxhYmVsPXtpdGVtLnN1YkxheWVyTmFtZX0gLz48L2Rpdj4gOiA8ZGl2IGNsYXNzTmFtZT0naW5saW5lLWJsb2NrLWRpc3BsYXkgYm90dG9tLW1hcmdpbic+PElucHV0IHR5cGU9J2NoZWNrYm94JyBvbkNoYW5nZT17KCkgPT4gdG9nZ2xlTm9kZVZpc2libGUoaXRlbS5pZCwgbWFwSWQpfSBsYWJlbD17aXRlbS5zdWJMYXllck5hbWV9IC8+PC9kaXY+XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l0ZW0uaWR9IHN0eWxlPXttYXJnaW5TdHlsZX0+e3N1Yk5vZGVFeHBhbmRlcn17c3ViTm9kZUNoZWNrYm94fXtzdWJMYXllckxlZ2VuZERhdGF9PC9kaXY+XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVuZGVyTm9kZXMgPSBmdW5jdGlvbihpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXJnaW5TdHlsZSA9IHsgbWFyZ2luTGVmdDogNCB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc3VibGF5ZXJzID0gaXRlbS5leHBhbmRlZCA9PT0gdHJ1ZSAmJiBpdGVtLmxlZ2VuZExheWVycyAhPT0gbnVsbCAmJiBpdGVtLmxlZ2VuZExheWVycyAhPT0gdW5kZWZpbmVkID8gaXRlbS5sZWdlbmRMYXllcnMubWFwKHJlbmRlclN1Yk5vZGVzKSA6ICcnXHJcblxyXG4gICAgICAgICAgICBsZXQgdG9wTm9kZUV4cGFuZGVyID0gaXRlbS5sZWdlbmRMYXllcnMgPT09IG51bGwgfHwgaXRlbS5sZWdlbmRMYXllcnMgPT0gdW5kZWZpbmVkID8gJycgOiBpdGVtLmV4cGFuZGVkID8gPGkgb25DbGljaz17KCkgPT4gdG9nZ2xlTm9kZUV4cGFuZGVkKGl0ZW0uaWQsIG1hcElkKX0gY2xhc3NOYW1lPVwiZmEgZmEtY2FyZXQtZG93biBjbGljay1sZWdlbmQtbm9kZVwiPjwvaT4gOiA8aSBvbkNsaWNrPXsoKSA9PiB0b2dnbGVOb2RlRXhwYW5kZWQoaXRlbS5pZCwgbWFwSWQpfSBjbGFzc05hbWU9XCJmYSBmYS1jYXJldC1yaWdodCBjbGljay1sZWdlbmQtbm9kZVwiPjwvaT5cclxuXHJcbiAgICAgICAgICAgIGxldCBub2RlQ2hlY2tib3ggPSBpdGVtLnZpc2libGUgPyA8ZGl2IGNsYXNzTmFtZT0naW5saW5lLWJsb2NrLWRpc3BsYXkgYm90dG9tLW1hcmdpbic+PElucHV0IHR5cGU9J2NoZWNrYm94JyBvbkNoYW5nZT17KCkgPT4gdG9nZ2xlTm9kZVZpc2libGUoaXRlbS5pZCwgbWFwSWQpfSBjaGVja2VkIGxhYmVsPXtpdGVtLmxheWVyTmFtZX0gLz48L2Rpdj4gOiA8ZGl2IGNsYXNzTmFtZT0naW5saW5lLWJsb2NrLWRpc3BsYXkgYm90dG9tLW1hcmdpbic+PElucHV0IHR5cGU9J2NoZWNrYm94JyBvbkNoYW5nZT17KCkgPT4gdG9nZ2xlTm9kZVZpc2libGUoaXRlbS5pZCwgbWFwSWQpfSBsYWJlbD17aXRlbS5sYXllck5hbWV9IC8+PC9kaXY+XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l0ZW0uaWR9IHN0eWxlPXttYXJnaW5TdHlsZX0+e3RvcE5vZGVFeHBhbmRlcn17bm9kZUNoZWNrYm94fXtzdWJsYXllcnN9PC9kaXY+XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD0nbGVnZW5kJz5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT0nbGVnZW5kLW1hcCc+e21hcElkLnJlcGxhY2UoJy0nLCAnIC0gJyl9PC9oNT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICB7bm9kZXMubWFwKHJlbmRlck5vZGVzKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1hcExlZ2VuZCkiXX0=