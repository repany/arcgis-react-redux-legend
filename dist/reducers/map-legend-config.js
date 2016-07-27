define(['exports', 'app/actions/map-legend-actions'], function (exports, _mapLegendActions) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = mapLegendConfig;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    function mapLegendConfig() {
        var state = arguments.length <= 0 || arguments[0] === undefined ? {
            isFetching: false,
            legends: {},
            views: {},
            currentScale: 0
        } : arguments[0];
        var action = arguments[1];

        switch (action.type) {

            case _mapLegendActions.SET_CURRENT_SCALE:
                return Object.assign({}, state, {
                    currentScale: action.currentScale
                });

            case _mapLegendActions.RESET_LEGEND_IS_FETCHING:
                return Object.assign({}, state, {
                    isFetching: false
                });

            case _mapLegendActions.REQUEST_LEGEND_DATA:
                return Object.assign({}, state, {
                    isFetching: true
                });

            case _mapLegendActions.RECEIVE_LEGEND_DATA:

                var legendsForReceive = Object.assign({}, state.legends);
                var legendForReceive = legendsForReceive[action.mapId];

                var legendItemsForReceive = legendForReceive.items.map(function (leg, idx) {

                    if (leg.url === action.url) {

                        leg.legendLayers = action.layers.map(function (lyr) {

                            var legendData = lyr.legend.map(function (leg) {

                                return {
                                    label: leg.label,
                                    image: leg.imageData,
                                    imageHeight: leg.height,
                                    imageWidth: leg.width,
                                    id: guid()
                                };
                            });

                            return {
                                subLayerId: lyr.layerId,
                                subLayerName: lyr.layerName,
                                subLayerMinScale: lyr.minScale,
                                subLayerMaxScale: lyr.maxScale,
                                subLayerScaleRestricted: lyr.minScale !== 0 || lyr.maxScale !== 0,
                                subLayerLegendData: legendData,
                                visible: leg.subLayersVisible && leg.subLayersVisible != undefined ? leg.subLayersVisible.indexOf(lyr.layerId) > -1 : true,
                                expanded: true,
                                id: guid()
                            };
                        });
                    }
                    leg.alreadyLoaded = true;
                    leg.expanded = true;
                    return leg;
                });

                legendForReceive.items = legendItemsForReceive;
                legendsForReceive[action.mapId] = legendForReceive;

                return Object.assign({}, state, {
                    isFetching: false,
                    legends: legendsForReceive
                });

            case _mapLegendActions.SET_INITIAL_LEGEND_DATA:

                var viewsForInitialData = Object.assign({}, state.views);
                viewsForInitialData[action.mapId] = action.view;

                var layerLegendForInitialData = action.view.map.layers.map(function (initLyr, idx) {

                    var subLayersVisibleForInitialData = [];
                    for (var subInitLayer in initLyr.allSublayers) {
                        var sl = initLyr.allSublayers[subInitLayer];
                        if (sl.visible) {
                            subLayersVisibleForInitialData.push(sl.id);
                        }
                    }

                    return {
                        layerId: idx,
                        layerName: initLyr.title || initLyr.id,
                        minScale: initLyr.minScale,
                        maxScale: initLyr.maxScale,
                        scaleRestricted: initLyr.minScale !== 0 && initLyr.maxScale !== 0,
                        visible: true, // initLyr.visible === null || initLyr.visible == undefined ? true : initLyr.visible,
                        subLayersVisible: subLayersVisibleForInitialData,
                        url: initLyr.url,
                        legendLayers: null,
                        alreadyLoaded: false,
                        expanded: false,
                        id: guid()
                    };
                });

                var legendsForInitialData = Object.assign({}, state.legends);
                legendsForInitialData[action.mapId] = layerLegendForInitialData;

                return Object.assign({}, state, {
                    legends: legendsForInitialData,
                    views: viewsForInitialData
                });

            case _mapLegendActions.TOGGLE_LEGEND_NODE_EXPANDED:

                var legendsForToggleNodeExpanded = Object.assign({}, state.legends);
                var legendForToggleNodeExpanded = legendsForToggleNodeExpanded[action.mapId];

                var legendItemsForToggleNodeExpanded = legendForToggleNodeExpanded.items.map(function (leg, idx) {

                    if (leg.id === action.nodeId) {

                        leg.expanded = !leg.expanded;
                    } else if (leg.legendLayers) {

                        var legendLayersForToggleNodeExpanded = leg.legendLayers.map(function (lyr) {

                            if (lyr.id === action.nodeId) {

                                lyr.expanded = !lyr.expanded;
                            }
                            return lyr;
                        });

                        leg.legendLayers = legendLayersForToggleNodeExpanded;
                    }
                    return leg;
                });

                legendForToggleNodeExpanded.items = legendItemsForToggleNodeExpanded;
                legendsForToggleNodeExpanded[action.mapId] = legendForToggleNodeExpanded;

                return Object.assign({}, state, {
                    legends: legendsForToggleNodeExpanded
                });

            case _mapLegendActions.TOGGLE_LEGEND_NODE_VISIBLE:

                var legendsForToggleNodeVisible = Object.assign({}, state.legends);
                var legendForToggleNodeVisible = legendsForToggleNodeVisible[action.mapId];

                var legendItemsForToggleNodeVisible = legendForToggleNodeVisible.items.map(function (leg, idx) {

                    if (leg.id === action.nodeId) {

                        leg.visible = !leg.visible;
                    } else if (leg.legendLayers) {

                        var legendLayersForToggleNodeVisible = leg.legendLayers.map(function (lyr) {

                            if (lyr.id === action.nodeId) {

                                lyr.visible = !lyr.visible;
                            }
                            return lyr;
                        });

                        var subLayersVisibleForToggleNodeVisible = [];
                        for (var sl in leg.legendLayers) {

                            if (leg.legendLayers[sl].visible) {
                                subLayersVisibleForToggleNodeVisible.push(leg.legendLayers[sl].subLayerId);
                            }
                        }

                        leg.subLayersVisible = subLayersVisibleForToggleNodeVisible;
                        leg.legendLayers = legendLayersForToggleNodeVisible;
                    }
                    return leg;
                });

                legendForToggleNodeVisible.items = legendItemsForToggleNodeVisible;
                legendsForToggleNodeVisible[action.mapId] = legendForToggleNodeVisible;

                updateLayers(state.views[action.mapId], legendForToggleNodeVisible);

                return Object.assign({}, state, {
                    legends: legendsForToggleNodeVisible
                });

            default:
                return state;
        }
    }

    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    function updateLayers(view, legend) {
        var _loop = function _loop(lyr) {

            var legendLyr = legend.items[lyr];

            if (legendLyr.alreadyLoaded === true) {

                var layerFind = view.map.layers.filter(function (lyr) {
                    return lyr.title === legendLyr.layerName || lyr.id === legendLyr.layerName;
                });

                if (layerFind && layerFind.items && layerFind.items.length !== 1) return {
                        v: null
                    };

                var matchedLayer = layerFind.items[0];

                if (legendLyr.visible && legendLyr.subLayersVisible && legendLyr.subLayersVisible != undefined && matchedLayer.sublayers && matchedLayer.sublayers != undefined) {

                    if (matchedLayer.sublayers && matchedLayer.sublayers != undefined) {
                        matchedLayer.sublayers = matchedLayer.sublayers.map(function (subLyr) {

                            var subLayerFind = legendLyr.subLayersVisible.filter(function (subId) {
                                return subLyr.id === subId;
                            });

                            subLyr.visible = subLayerFind && subLayerFind.length === 1;
                            return subLyr;
                        });
                    }
                }

                if (matchedLayer.visible !== legendLyr.visible) {

                    matchedLayer.visible = legendLyr.visible;
                }
            }
        };

        for (var lyr in legend.items) {
            var _ret = _loop(lyr);

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHVjZXJzXFxtYXAtbGVnZW5kLWNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7c0JBRXdCLGU7Ozs7Ozs7O0FBQVQsYUFBUyxlQUFULEdBS0o7QUFBQSxZQUw4QixLQUs5Qix5REFMc0M7QUFDN0Msd0JBQVksS0FEaUM7QUFFN0MscUJBQVMsRUFGb0M7QUFHN0MsbUJBQU8sRUFIc0M7QUFJN0MsMEJBQWM7QUFKK0IsU0FLdEM7QUFBQSxZQUFSLE1BQVE7O0FBQ1AsZ0JBQVEsT0FBTyxJQUFmOztBQUVJO0FBQ0ksdUJBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFsQixFQUF5QjtBQUM1QixrQ0FBYyxPQUFPO0FBRE8saUJBQXpCLENBQVA7O0FBSUo7QUFDSSx1QkFBTyxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQWxCLEVBQXlCO0FBQzVCLGdDQUFZO0FBRGdCLGlCQUF6QixDQUFQOztBQUlKO0FBQ0ksdUJBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFsQixFQUF5QjtBQUM1QixnQ0FBWTtBQURnQixpQkFBekIsQ0FBUDs7QUFJSjs7QUFFSSxvQkFBSSxvQkFBb0IsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixNQUFNLE9BQXhCLENBQXhCO0FBQ0Esb0JBQUksbUJBQW1CLGtCQUFrQixPQUFPLEtBQXpCLENBQXZCOztBQUVBLG9CQUFNLHdCQUF3QixpQkFBaUIsS0FBakIsQ0FBdUIsR0FBdkIsQ0FBMkIsVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFvQjs7QUFFekUsd0JBQUksSUFBSSxHQUFKLEtBQVksT0FBTyxHQUF2QixFQUE0Qjs7QUFFeEIsNEJBQUksWUFBSixHQUFtQixPQUFPLE1BQVAsQ0FBYyxHQUFkLENBQWtCLFVBQVUsR0FBVixFQUFlOztBQUVoRCxnQ0FBTSxhQUFhLElBQUksTUFBSixDQUFXLEdBQVgsQ0FBZSxVQUFVLEdBQVYsRUFBZTs7QUFFN0MsdUNBQU87QUFDSCwyQ0FBTyxJQUFJLEtBRFI7QUFFSCwyQ0FBTyxJQUFJLFNBRlI7QUFHSCxpREFBYSxJQUFJLE1BSGQ7QUFJSCxnREFBWSxJQUFJLEtBSmI7QUFLSCx3Q0FBSTtBQUxELGlDQUFQO0FBT0gsNkJBVGtCLENBQW5COztBQVdBLG1DQUFPO0FBQ0gsNENBQVksSUFBSSxPQURiO0FBRUgsOENBQWMsSUFBSSxTQUZmO0FBR0gsa0RBQWtCLElBQUksUUFIbkI7QUFJSCxrREFBa0IsSUFBSSxRQUpuQjtBQUtILHlEQUF5QixJQUFJLFFBQUosS0FBaUIsQ0FBakIsSUFBc0IsSUFBSSxRQUFKLEtBQWlCLENBTDdEO0FBTUgsb0RBQW9CLFVBTmpCO0FBT0gseUNBQVMsSUFBSSxnQkFBSixJQUF3QixJQUFJLGdCQUFKLElBQXdCLFNBQWhELEdBQTRELElBQUksZ0JBQUosQ0FBcUIsT0FBckIsQ0FBNkIsSUFBSSxPQUFqQyxJQUE0QyxDQUFDLENBQXpHLEdBQTZHLElBUG5IO0FBUUgsMENBQVUsSUFSUDtBQVNILG9DQUFJO0FBVEQsNkJBQVA7QUFXSCx5QkF4QmtCLENBQW5CO0FBeUJIO0FBQ0Qsd0JBQUksYUFBSixHQUFvQixJQUFwQjtBQUNBLHdCQUFJLFFBQUosR0FBZSxJQUFmO0FBQ0EsMkJBQU8sR0FBUDtBQUNILGlCQWpDNkIsQ0FBOUI7O0FBbUNBLGlDQUFpQixLQUFqQixHQUF5QixxQkFBekI7QUFDQSxrQ0FBa0IsT0FBTyxLQUF6QixJQUFrQyxnQkFBbEM7O0FBRUEsdUJBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFsQixFQUF5QjtBQUM1QixnQ0FBWSxLQURnQjtBQUU1Qiw2QkFBUztBQUZtQixpQkFBekIsQ0FBUDs7QUFLSjs7QUFFSSxvQkFBSSxzQkFBc0IsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixNQUFNLEtBQXhCLENBQTFCO0FBQ0Esb0NBQW9CLE9BQU8sS0FBM0IsSUFBb0MsT0FBTyxJQUEzQzs7QUFFQSxvQkFBTSw0QkFBNEIsT0FBTyxJQUFQLENBQVksR0FBWixDQUFnQixNQUFoQixDQUM3QixHQUQ2QixDQUN6QixVQUFVLE9BQVYsRUFBbUIsR0FBbkIsRUFBd0I7O0FBRXpCLHdCQUFNLGlDQUFpQyxFQUF2QztBQUNBLHlCQUFLLElBQUksWUFBVCxJQUF5QixRQUFRLFlBQWpDLEVBQStDO0FBQzNDLDRCQUFJLEtBQUssUUFBUSxZQUFSLENBQXFCLFlBQXJCLENBQVQ7QUFDQSw0QkFBSSxHQUFHLE9BQVAsRUFBZ0I7QUFDWiwyREFBK0IsSUFBL0IsQ0FBb0MsR0FBRyxFQUF2QztBQUNIO0FBQ0o7O0FBRUQsMkJBQU87QUFDSCxpQ0FBUyxHQUROO0FBRUgsbUNBQVcsUUFBUSxLQUFSLElBQWlCLFFBQVEsRUFGakM7QUFHSCxrQ0FBVSxRQUFRLFFBSGY7QUFJSCxrQ0FBVSxRQUFRLFFBSmY7QUFLSCx5Q0FBaUIsUUFBUSxRQUFSLEtBQXFCLENBQXJCLElBQTBCLFFBQVEsUUFBUixLQUFxQixDQUw3RDtBQU1ILGlDQUFTLElBTk4sRUFNWTtBQUNmLDBDQUFrQiw4QkFQZjtBQVFILDZCQUFLLFFBQVEsR0FSVjtBQVNILHNDQUFjLElBVFg7QUFVSCx1Q0FBZSxLQVZaO0FBV0gsa0NBQVUsS0FYUDtBQVlILDRCQUFJO0FBWkQscUJBQVA7QUFjSCxpQkF6QjZCLENBQWxDOztBQTJCQSxvQkFBSSx3QkFBd0IsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixNQUFNLE9BQXhCLENBQTVCO0FBQ0Esc0NBQXNCLE9BQU8sS0FBN0IsSUFBc0MseUJBQXRDOztBQUVBLHVCQUFPLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBbEIsRUFBeUI7QUFDNUIsNkJBQVMscUJBRG1CO0FBRTVCLDJCQUFPO0FBRnFCLGlCQUF6QixDQUFQOztBQUtKOztBQUVJLG9CQUFJLCtCQUErQixPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLE1BQU0sT0FBeEIsQ0FBbkM7QUFDQSxvQkFBSSw4QkFBOEIsNkJBQTZCLE9BQU8sS0FBcEMsQ0FBbEM7O0FBRUEsb0JBQU0sbUNBQW1DLDRCQUE0QixLQUE1QixDQUFrQyxHQUFsQyxDQUFzQyxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9COztBQUUvRix3QkFBSSxJQUFJLEVBQUosS0FBVyxPQUFPLE1BQXRCLEVBQThCOztBQUUxQiw0QkFBSSxRQUFKLEdBQWUsQ0FBQyxJQUFJLFFBQXBCO0FBQ0gscUJBSEQsTUFJSyxJQUFJLElBQUksWUFBUixFQUFzQjs7QUFFdkIsNEJBQU0sb0NBQW9DLElBQUksWUFBSixDQUFpQixHQUFqQixDQUFxQixVQUFVLEdBQVYsRUFBZTs7QUFFMUUsZ0NBQUksSUFBSSxFQUFKLEtBQVcsT0FBTyxNQUF0QixFQUE4Qjs7QUFFMUIsb0NBQUksUUFBSixHQUFlLENBQUMsSUFBSSxRQUFwQjtBQUNIO0FBQ0QsbUNBQU8sR0FBUDtBQUNILHlCQVB5QyxDQUExQzs7QUFTQSw0QkFBSSxZQUFKLEdBQW1CLGlDQUFuQjtBQUNIO0FBQ0QsMkJBQU8sR0FBUDtBQUNILGlCQXBCd0MsQ0FBekM7O0FBc0JBLDRDQUE0QixLQUE1QixHQUFvQyxnQ0FBcEM7QUFDQSw2Q0FBNkIsT0FBTyxLQUFwQyxJQUE2QywyQkFBN0M7O0FBRUEsdUJBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFsQixFQUF5QjtBQUM1Qiw2QkFBUztBQURtQixpQkFBekIsQ0FBUDs7QUFJSjs7QUFFSSxvQkFBSSw4QkFBOEIsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixNQUFNLE9BQXhCLENBQWxDO0FBQ0Esb0JBQUksNkJBQTZCLDRCQUE0QixPQUFPLEtBQW5DLENBQWpDOztBQUVBLG9CQUFNLGtDQUFrQywyQkFBMkIsS0FBM0IsQ0FBaUMsR0FBakMsQ0FBcUMsVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFvQjs7QUFFN0Ysd0JBQUksSUFBSSxFQUFKLEtBQVcsT0FBTyxNQUF0QixFQUE4Qjs7QUFFMUIsNEJBQUksT0FBSixHQUFjLENBQUMsSUFBSSxPQUFuQjtBQUNILHFCQUhELE1BSUssSUFBSSxJQUFJLFlBQVIsRUFBc0I7O0FBRXZCLDRCQUFNLG1DQUFtQyxJQUFJLFlBQUosQ0FBaUIsR0FBakIsQ0FBcUIsVUFBVSxHQUFWLEVBQWU7O0FBRXpFLGdDQUFJLElBQUksRUFBSixLQUFXLE9BQU8sTUFBdEIsRUFBOEI7O0FBRTFCLG9DQUFJLE9BQUosR0FBYyxDQUFDLElBQUksT0FBbkI7QUFDSDtBQUNELG1DQUFPLEdBQVA7QUFDSCx5QkFQd0MsQ0FBekM7O0FBU0EsNEJBQU0sdUNBQXVDLEVBQTdDO0FBQ0EsNkJBQUssSUFBSSxFQUFULElBQWUsSUFBSSxZQUFuQixFQUFpQzs7QUFFN0IsZ0NBQUksSUFBSSxZQUFKLENBQWlCLEVBQWpCLEVBQXFCLE9BQXpCLEVBQWtDO0FBQzlCLHFFQUFxQyxJQUFyQyxDQUEwQyxJQUFJLFlBQUosQ0FBaUIsRUFBakIsRUFBcUIsVUFBL0Q7QUFDSDtBQUNKOztBQUVELDRCQUFJLGdCQUFKLEdBQXVCLG9DQUF2QjtBQUNBLDRCQUFJLFlBQUosR0FBbUIsZ0NBQW5CO0FBQ0g7QUFDRCwyQkFBTyxHQUFQO0FBQ0gsaUJBN0J1QyxDQUF4Qzs7QUErQkEsMkNBQTJCLEtBQTNCLEdBQW1DLCtCQUFuQztBQUNBLDRDQUE0QixPQUFPLEtBQW5DLElBQTRDLDBCQUE1Qzs7QUFFQSw2QkFBYSxNQUFNLEtBQU4sQ0FBWSxPQUFPLEtBQW5CLENBQWIsRUFBd0MsMEJBQXhDOztBQUVBLHVCQUFPLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBbEIsRUFBeUI7QUFDNUIsNkJBQVM7QUFEbUIsaUJBQXpCLENBQVA7O0FBSUo7QUFDSSx1QkFBTyxLQUFQO0FBekxSO0FBMkxIOztBQUVELGFBQVMsSUFBVCxHQUFnQjtBQUNaLGVBQU8sT0FBTyxJQUFQLEdBQWMsR0FBZCxHQUFvQixJQUFwQixHQUEyQixHQUEzQixHQUFpQyxJQUFqQyxHQUF3QyxHQUF4QyxHQUE4QyxJQUE5QyxHQUFxRCxHQUFyRCxHQUEyRCxJQUEzRCxHQUFrRSxJQUFsRSxHQUF5RSxJQUFoRjtBQUNIOztBQUVELGFBQVMsRUFBVCxHQUFjO0FBQ1YsZUFBTyxLQUFLLEtBQUwsQ0FBVyxDQUFDLElBQUksS0FBSyxNQUFMLEVBQUwsSUFBc0IsT0FBakMsRUFDSixRQURJLENBQ0ssRUFETCxFQUVKLFNBRkksQ0FFTSxDQUZOLENBQVA7QUFHSDs7QUFFRCxhQUFTLFlBQVQsQ0FBc0IsSUFBdEIsRUFBNEIsTUFBNUIsRUFBb0M7QUFBQSxtQ0FFdkIsR0FGdUI7O0FBSTVCLGdCQUFNLFlBQVksT0FBTyxLQUFQLENBQWEsR0FBYixDQUFsQjs7QUFFQSxnQkFBSSxVQUFVLGFBQVYsS0FBNEIsSUFBaEMsRUFBc0M7O0FBRWxDLG9CQUFNLFlBQVksS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFnQixNQUFoQixDQUF1QixVQUFTLEdBQVQsRUFBYztBQUNuRCwyQkFBTyxJQUFJLEtBQUosS0FBYyxVQUFVLFNBQXhCLElBQXFDLElBQUksRUFBSixLQUFXLFVBQVUsU0FBakU7QUFDSCxpQkFGaUIsQ0FBbEI7O0FBSUEsb0JBQUksYUFBYSxVQUFVLEtBQXZCLElBQWdDLFVBQVUsS0FBVixDQUFnQixNQUFoQixLQUEyQixDQUEvRCxFQUFrRTtBQUFBLDJCQUFPO0FBQVA7O0FBRWxFLG9CQUFNLGVBQWUsVUFBVSxLQUFWLENBQWdCLENBQWhCLENBQXJCOztBQUVBLG9CQUFJLFVBQVUsT0FBVixJQUFxQixVQUFVLGdCQUEvQixJQUFtRCxVQUFVLGdCQUFWLElBQThCLFNBQWpGLElBQThGLGFBQWEsU0FBM0csSUFBd0gsYUFBYSxTQUFiLElBQTBCLFNBQXRKLEVBQWlLOztBQUU3Six3QkFBSSxhQUFhLFNBQWIsSUFBMEIsYUFBYSxTQUFiLElBQTBCLFNBQXhELEVBQW1FO0FBQy9ELHFDQUFhLFNBQWIsR0FBeUIsYUFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLFVBQVUsTUFBVixFQUFrQjs7QUFFbEUsZ0NBQU0sZUFBZSxVQUFVLGdCQUFWLENBQTJCLE1BQTNCLENBQWtDLFVBQVMsS0FBVCxFQUFnQjtBQUNuRSx1Q0FBTyxPQUFPLEVBQVAsS0FBYyxLQUFyQjtBQUNILDZCQUZvQixDQUFyQjs7QUFJQSxtQ0FBTyxPQUFQLEdBQWtCLGdCQUFnQixhQUFhLE1BQWIsS0FBd0IsQ0FBMUQ7QUFDQSxtQ0FBTyxNQUFQO0FBQ0gseUJBUndCLENBQXpCO0FBU0g7QUFDSjs7QUFFRCxvQkFBSSxhQUFhLE9BQWIsS0FBeUIsVUFBVSxPQUF2QyxFQUFnRDs7QUFFNUMsaUNBQWEsT0FBYixHQUF1QixVQUFVLE9BQWpDO0FBQ0g7QUFDSjtBQW5DMkI7O0FBRWhDLGFBQUssSUFBSSxHQUFULElBQWdCLE9BQU8sS0FBdkIsRUFBOEI7QUFBQSw2QkFBckIsR0FBcUI7O0FBQUE7QUFrQzdCO0FBQ0oiLCJmaWxlIjoicmVkdWNlcnNcXG1hcC1sZWdlbmQtY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU0VUX0NVUlJFTlRfU0NBTEUsIFJFU0VUX0xFR0VORF9JU19GRVRDSElORywgUkVRVUVTVF9MRUdFTkRfREFUQSwgUkVDRUlWRV9MRUdFTkRfREFUQSwgU0VUX0lOSVRJQUxfTEVHRU5EX0RBVEEsIFRPR0dMRV9MRUdFTkRfTk9ERV9FWFBBTkRFRCwgVE9HR0xFX0xFR0VORF9OT0RFX1ZJU0lCTEUgfSBmcm9tICdhcHAvYWN0aW9ucy9tYXAtbGVnZW5kLWFjdGlvbnMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXBMZWdlbmRDb25maWcgKHN0YXRlID0ge1xyXG4gICAgaXNGZXRjaGluZzogZmFsc2UsXHJcbiAgICBsZWdlbmRzOiB7fSxcclxuICAgIHZpZXdzOiB7fSxcclxuICAgIGN1cnJlbnRTY2FsZTogMFxyXG59LCBhY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuXHJcbiAgICAgICAgY2FzZSBTRVRfQ1VSUkVOVF9TQ0FMRTpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IFxyXG4gICAgICAgICAgICAgICAgY3VycmVudFNjYWxlOiBhY3Rpb24uY3VycmVudFNjYWxlIFxyXG4gICAgICAgICAgICB9KSBcclxuXHJcbiAgICAgICAgY2FzZSBSRVNFVF9MRUdFTkRfSVNfRkVUQ0hJTkc6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBcclxuICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlIFxyXG4gICAgICAgICAgICB9KSBcclxuXHJcbiAgICAgICAgY2FzZSBSRVFVRVNUX0xFR0VORF9EQVRBOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgXHJcbiAgICAgICAgICAgICAgICBpc0ZldGNoaW5nOiB0cnVlIFxyXG4gICAgICAgICAgICB9KSBcclxuXHJcbiAgICAgICAgY2FzZSBSRUNFSVZFX0xFR0VORF9EQVRBOlxyXG5cclxuICAgICAgICAgICAgbGV0IGxlZ2VuZHNGb3JSZWNlaXZlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubGVnZW5kcylcclxuICAgICAgICAgICAgbGV0IGxlZ2VuZEZvclJlY2VpdmUgPSBsZWdlbmRzRm9yUmVjZWl2ZVthY3Rpb24ubWFwSWRdXHJcblxyXG4gICAgICAgICAgICBjb25zdCBsZWdlbmRJdGVtc0ZvclJlY2VpdmUgPSBsZWdlbmRGb3JSZWNlaXZlLml0ZW1zLm1hcChmdW5jdGlvbiAobGVnLCBpZHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobGVnLnVybCA9PT0gYWN0aW9uLnVybCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZWcubGVnZW5kTGF5ZXJzID0gYWN0aW9uLmxheWVycy5tYXAoZnVuY3Rpb24gKGx5cikge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVnZW5kRGF0YSA9IGx5ci5sZWdlbmQubWFwKGZ1bmN0aW9uIChsZWcpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbGVnLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiBsZWcuaW1hZ2VEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0OiBsZWcuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlV2lkdGg6IGxlZy53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZ3VpZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViTGF5ZXJJZDogbHlyLmxheWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJMYXllck5hbWU6IGx5ci5sYXllck5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJMYXllck1pblNjYWxlOiBseXIubWluU2NhbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJMYXllck1heFNjYWxlOiBseXIubWF4U2NhbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJMYXllclNjYWxlUmVzdHJpY3RlZDogbHlyLm1pblNjYWxlICE9PSAwIHx8IGx5ci5tYXhTY2FsZSAhPT0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkxheWVyTGVnZW5kRGF0YTogbGVnZW5kRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGxlZy5zdWJMYXllcnNWaXNpYmxlICYmIGxlZy5zdWJMYXllcnNWaXNpYmxlICE9IHVuZGVmaW5lZCA/IGxlZy5zdWJMYXllcnNWaXNpYmxlLmluZGV4T2YobHlyLmxheWVySWQpID4gLTEgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZ3VpZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGVnLmFscmVhZHlMb2FkZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBsZWcuZXhwYW5kZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZWdlbmRGb3JSZWNlaXZlLml0ZW1zID0gbGVnZW5kSXRlbXNGb3JSZWNlaXZlXHJcbiAgICAgICAgICAgIGxlZ2VuZHNGb3JSZWNlaXZlW2FjdGlvbi5tYXBJZF0gPSBsZWdlbmRGb3JSZWNlaXZlXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgXHJcbiAgICAgICAgICAgICAgICBpc0ZldGNoaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGxlZ2VuZHM6IGxlZ2VuZHNGb3JSZWNlaXZlXHJcbiAgICAgICAgICAgIH0pIFxyXG5cclxuICAgICAgICBjYXNlIFNFVF9JTklUSUFMX0xFR0VORF9EQVRBOlxyXG5cclxuICAgICAgICAgICAgbGV0IHZpZXdzRm9ySW5pdGlhbERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS52aWV3cylcclxuICAgICAgICAgICAgdmlld3NGb3JJbml0aWFsRGF0YVthY3Rpb24ubWFwSWRdID0gYWN0aW9uLnZpZXdcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxheWVyTGVnZW5kRm9ySW5pdGlhbERhdGEgPSBhY3Rpb24udmlldy5tYXAubGF5ZXJzICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoaW5pdEx5ciwgaWR4KSB7ICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJMYXllcnNWaXNpYmxlRm9ySW5pdGlhbERhdGEgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHN1YkluaXRMYXllciBpbiBpbml0THlyLmFsbFN1YmxheWVycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2wgPSBpbml0THlyLmFsbFN1YmxheWVyc1tzdWJJbml0TGF5ZXJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbC52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJMYXllcnNWaXNpYmxlRm9ySW5pdGlhbERhdGEucHVzaChzbC5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllcklkOiBpZHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyTmFtZTogaW5pdEx5ci50aXRsZSB8fCBpbml0THlyLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5TY2FsZTogaW5pdEx5ci5taW5TY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4U2NhbGU6IGluaXRMeXIubWF4U2NhbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlUmVzdHJpY3RlZDogaW5pdEx5ci5taW5TY2FsZSAhPT0gMCAmJiBpbml0THlyLm1heFNjYWxlICE9PSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLCAvLyBpbml0THlyLnZpc2libGUgPT09IG51bGwgfHwgaW5pdEx5ci52aXNpYmxlID09IHVuZGVmaW5lZCA/IHRydWUgOiBpbml0THlyLnZpc2libGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YkxheWVyc1Zpc2libGU6IHN1YkxheWVyc1Zpc2libGVGb3JJbml0aWFsRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBpbml0THlyLnVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kTGF5ZXJzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHJlYWR5TG9hZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZ3VpZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBsZWdlbmRzRm9ySW5pdGlhbERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5sZWdlbmRzKVxyXG4gICAgICAgICAgICBsZWdlbmRzRm9ySW5pdGlhbERhdGFbYWN0aW9uLm1hcElkXSA9IGxheWVyTGVnZW5kRm9ySW5pdGlhbERhdGFcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBcclxuICAgICAgICAgICAgICAgIGxlZ2VuZHM6IGxlZ2VuZHNGb3JJbml0aWFsRGF0YSxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB2aWV3c0ZvckluaXRpYWxEYXRhXHJcbiAgICAgICAgICAgIH0pIFxyXG5cclxuICAgICAgICBjYXNlIFRPR0dMRV9MRUdFTkRfTk9ERV9FWFBBTkRFRDpcclxuXHJcbiAgICAgICAgICAgIGxldCBsZWdlbmRzRm9yVG9nZ2xlTm9kZUV4cGFuZGVkID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubGVnZW5kcylcclxuICAgICAgICAgICAgbGV0IGxlZ2VuZEZvclRvZ2dsZU5vZGVFeHBhbmRlZCA9IGxlZ2VuZHNGb3JUb2dnbGVOb2RlRXhwYW5kZWRbYWN0aW9uLm1hcElkXVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbGVnZW5kSXRlbXNGb3JUb2dnbGVOb2RlRXhwYW5kZWQgPSBsZWdlbmRGb3JUb2dnbGVOb2RlRXhwYW5kZWQuaXRlbXMubWFwKGZ1bmN0aW9uIChsZWcsIGlkeCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsZWcuaWQgPT09IGFjdGlvbi5ub2RlSWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGVnLmV4cGFuZGVkID0gIWxlZy5leHBhbmRlZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGVnLmxlZ2VuZExheWVycykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZWdlbmRMYXllcnNGb3JUb2dnbGVOb2RlRXhwYW5kZWQgPSBsZWcubGVnZW5kTGF5ZXJzLm1hcChmdW5jdGlvbiAobHlyKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobHlyLmlkID09PSBhY3Rpb24ubm9kZUlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbHlyLmV4cGFuZGVkID0gIWx5ci5leHBhbmRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBseXJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZWcubGVnZW5kTGF5ZXJzID0gbGVnZW5kTGF5ZXJzRm9yVG9nZ2xlTm9kZUV4cGFuZGVkICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxlZ2VuZEZvclRvZ2dsZU5vZGVFeHBhbmRlZC5pdGVtcyA9IGxlZ2VuZEl0ZW1zRm9yVG9nZ2xlTm9kZUV4cGFuZGVkXHJcbiAgICAgICAgICAgIGxlZ2VuZHNGb3JUb2dnbGVOb2RlRXhwYW5kZWRbYWN0aW9uLm1hcElkXSA9IGxlZ2VuZEZvclRvZ2dsZU5vZGVFeHBhbmRlZFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IFxyXG4gICAgICAgICAgICAgICAgbGVnZW5kczogbGVnZW5kc0ZvclRvZ2dsZU5vZGVFeHBhbmRlZFxyXG4gICAgICAgICAgICB9KSBcclxuXHJcbiAgICAgICAgY2FzZSBUT0dHTEVfTEVHRU5EX05PREVfVklTSUJMRTpcclxuXHJcbiAgICAgICAgICAgIGxldCBsZWdlbmRzRm9yVG9nZ2xlTm9kZVZpc2libGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5sZWdlbmRzKVxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kRm9yVG9nZ2xlTm9kZVZpc2libGUgPSBsZWdlbmRzRm9yVG9nZ2xlTm9kZVZpc2libGVbYWN0aW9uLm1hcElkXVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbGVnZW5kSXRlbXNGb3JUb2dnbGVOb2RlVmlzaWJsZSA9IGxlZ2VuZEZvclRvZ2dsZU5vZGVWaXNpYmxlLml0ZW1zLm1hcChmdW5jdGlvbiAobGVnLCBpZHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobGVnLmlkID09PSBhY3Rpb24ubm9kZUlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxlZy52aXNpYmxlID0gIWxlZy52aXNpYmxlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsZWcubGVnZW5kTGF5ZXJzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZ2VuZExheWVyc0ZvclRvZ2dsZU5vZGVWaXNpYmxlID0gbGVnLmxlZ2VuZExheWVycy5tYXAoZnVuY3Rpb24gKGx5cikge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGx5ci5pZCA9PT0gYWN0aW9uLm5vZGVJZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGx5ci52aXNpYmxlID0gIWx5ci52aXNpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGx5clxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YkxheWVyc1Zpc2libGVGb3JUb2dnbGVOb2RlVmlzaWJsZSA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc2wgaW4gbGVnLmxlZ2VuZExheWVycykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZy5sZWdlbmRMYXllcnNbc2xdLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkxheWVyc1Zpc2libGVGb3JUb2dnbGVOb2RlVmlzaWJsZS5wdXNoKGxlZy5sZWdlbmRMYXllcnNbc2xdLnN1YkxheWVySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxlZy5zdWJMYXllcnNWaXNpYmxlID0gc3ViTGF5ZXJzVmlzaWJsZUZvclRvZ2dsZU5vZGVWaXNpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgbGVnLmxlZ2VuZExheWVycyA9IGxlZ2VuZExheWVyc0ZvclRvZ2dsZU5vZGVWaXNpYmxlICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxlZ2VuZEZvclRvZ2dsZU5vZGVWaXNpYmxlLml0ZW1zID0gbGVnZW5kSXRlbXNGb3JUb2dnbGVOb2RlVmlzaWJsZVxyXG4gICAgICAgICAgICBsZWdlbmRzRm9yVG9nZ2xlTm9kZVZpc2libGVbYWN0aW9uLm1hcElkXSA9IGxlZ2VuZEZvclRvZ2dsZU5vZGVWaXNpYmxlXHJcblxyXG4gICAgICAgICAgICB1cGRhdGVMYXllcnMoc3RhdGUudmlld3NbYWN0aW9uLm1hcElkXSwgbGVnZW5kRm9yVG9nZ2xlTm9kZVZpc2libGUpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgXHJcbiAgICAgICAgICAgICAgICBsZWdlbmRzOiBsZWdlbmRzRm9yVG9nZ2xlTm9kZVZpc2libGVcclxuICAgICAgICAgICAgfSkgXHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBndWlkKCkge1xyXG4gICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHM0KCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgLnN1YnN0cmluZygxKVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMYXllcnModmlldywgbGVnZW5kKSB7XHJcblxyXG4gICAgZm9yIChsZXQgbHlyIGluIGxlZ2VuZC5pdGVtcykge1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgbGVnZW5kTHlyID0gbGVnZW5kLml0ZW1zW2x5cl1cclxuXHJcbiAgICAgICAgaWYgKGxlZ2VuZEx5ci5hbHJlYWR5TG9hZGVkID09PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsYXllckZpbmQgPSB2aWV3Lm1hcC5sYXllcnMuZmlsdGVyKGZ1bmN0aW9uKGx5cikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGx5ci50aXRsZSA9PT0gbGVnZW5kTHlyLmxheWVyTmFtZSB8fCBseXIuaWQgPT09IGxlZ2VuZEx5ci5sYXllck5hbWVcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGlmIChsYXllckZpbmQgJiYgbGF5ZXJGaW5kLml0ZW1zICYmIGxheWVyRmluZC5pdGVtcy5sZW5ndGggIT09IDEpIHJldHVybiBudWxsXHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXRjaGVkTGF5ZXIgPSBsYXllckZpbmQuaXRlbXNbMF1cclxuXHJcbiAgICAgICAgICAgIGlmIChsZWdlbmRMeXIudmlzaWJsZSAmJiBsZWdlbmRMeXIuc3ViTGF5ZXJzVmlzaWJsZSAmJiBsZWdlbmRMeXIuc3ViTGF5ZXJzVmlzaWJsZSAhPSB1bmRlZmluZWQgJiYgbWF0Y2hlZExheWVyLnN1YmxheWVycyAmJiBtYXRjaGVkTGF5ZXIuc3VibGF5ZXJzICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVkTGF5ZXIuc3VibGF5ZXJzICYmIG1hdGNoZWRMYXllci5zdWJsYXllcnMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZExheWVyLnN1YmxheWVycyA9IG1hdGNoZWRMYXllci5zdWJsYXllcnMubWFwKGZ1bmN0aW9uIChzdWJMeXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YkxheWVyRmluZCA9IGxlZ2VuZEx5ci5zdWJMYXllcnNWaXNpYmxlLmZpbHRlcihmdW5jdGlvbihzdWJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Ykx5ci5pZCA9PT0gc3ViSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ykx5ci52aXNpYmxlID0gKHN1YkxheWVyRmluZCAmJiBzdWJMYXllckZpbmQubGVuZ3RoID09PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViTHlyXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoZWRMYXllci52aXNpYmxlICE9PSBsZWdlbmRMeXIudmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbWF0Y2hlZExheWVyLnZpc2libGUgPSBsZWdlbmRMeXIudmlzaWJsZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=