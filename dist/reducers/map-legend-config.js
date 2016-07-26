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
            views: {}
        } : arguments[0];
        var action = arguments[1];

        switch (action.type) {

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
                                subLayerScaleRestricted: lyr.minScale !== 0 && lyr.maxScale !== 0,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHVjZXJzXFxtYXAtbGVnZW5kLWNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7c0JBRXdCLGU7Ozs7Ozs7O0FBQVQsYUFBUyxlQUFULEdBSUo7QUFBQSxZQUo4QixLQUk5Qix5REFKc0M7QUFDN0Msd0JBQVksS0FEaUM7QUFFN0MscUJBQVMsRUFGb0M7QUFHN0MsbUJBQU87QUFIc0MsU0FJdEM7QUFBQSxZQUFSLE1BQVE7O0FBQ1AsZ0JBQVEsT0FBTyxJQUFmOztBQUVJO0FBQ0ksdUJBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFsQixFQUF5QjtBQUM1QixnQ0FBWTtBQURnQixpQkFBekIsQ0FBUDs7QUFJSjtBQUNJLHVCQUFPLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBbEIsRUFBeUI7QUFDNUIsZ0NBQVk7QUFEZ0IsaUJBQXpCLENBQVA7O0FBSUo7O0FBRUksb0JBQUksb0JBQW9CLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsTUFBTSxPQUF4QixDQUF4QjtBQUNBLG9CQUFJLG1CQUFtQixrQkFBa0IsT0FBTyxLQUF6QixDQUF2Qjs7QUFFQSxvQkFBTSx3QkFBd0IsaUJBQWlCLEtBQWpCLENBQXVCLEdBQXZCLENBQTJCLFVBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0I7O0FBRXpFLHdCQUFJLElBQUksR0FBSixLQUFZLE9BQU8sR0FBdkIsRUFBNEI7O0FBRXhCLDRCQUFJLFlBQUosR0FBbUIsT0FBTyxNQUFQLENBQWMsR0FBZCxDQUFrQixVQUFVLEdBQVYsRUFBZTs7QUFFaEQsZ0NBQU0sYUFBYSxJQUFJLE1BQUosQ0FBVyxHQUFYLENBQWUsVUFBVSxHQUFWLEVBQWU7O0FBRTdDLHVDQUFPO0FBQ0gsMkNBQU8sSUFBSSxLQURSO0FBRUgsMkNBQU8sSUFBSSxTQUZSO0FBR0gsaURBQWEsSUFBSSxNQUhkO0FBSUgsZ0RBQVksSUFBSSxLQUpiO0FBS0gsd0NBQUk7QUFMRCxpQ0FBUDtBQU9ILDZCQVRrQixD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T0FBdkMsRUFBZ0Q7O0FBRTVDLGlDQUFhLE9BQWIsR0FBdUIsVUFBVSxPQUFqQztBQUNIO0FBQ0o7QUFuQzJCOztBQUVoQyxhQUFLLElBQUksR0FBVCxJQUFnQixPQUFPLEtBQXZCLEVBQThCO0FBQUEsNkJBQXJCLEdBQXFCOztBQUFBO0FBa0M3QjtBQUNKIiwiZmlsZSI6InJlZHVjZXJzXFxtYXAtbGVnZW5kLWNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJFU0VUX0xFR0VORF9JU19GRVRDSElORywgUkVRVUVTVF9MRUdFTkRfREFUQSwgUkVDRUlWRV9MRUdFTkRfREFUQSwgU0VUX0lOSVRJQUxfTEVHRU5EX0RBVEEsIFRPR0dMRV9MRUdFTkRfTk9ERV9FWFBBTkRFRCwgVE9HR0xFX0xFR0VORF9OT0RFX1ZJU0lCTEUgfSBmcm9tICdhcHAvYWN0aW9ucy9tYXAtbGVnZW5kLWFjdGlvbnMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXBMZWdlbmRDb25maWcgKHN0YXRlID0ge1xyXG4gICAgaXNGZXRjaGluZzogZmFsc2UsXHJcbiAgICBsZWdlbmRzOiB7fSxcclxuICAgIHZpZXdzOiB7fVxyXG59LCBhY3Rpb24pIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBcclxuICAgICAgICBjYXNlIFJFU0VUX0xFR0VORF9JU19GRVRDSElORzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IFxyXG4gICAgICAgICAgICAgICAgaXNGZXRjaGluZzogZmFsc2UgXHJcbiAgICAgICAgICAgIH0pIFxyXG5cclxuICAgICAgICBjYXNlIFJFUVVFU1RfTEVHRU5EX0RBVEE6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBcclxuICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmc6IHRydWUgXHJcbiAgICAgICAgICAgIH0pIFxyXG5cclxuICAgICAgICBjYXNlIFJFQ0VJVkVfTEVHRU5EX0RBVEE6XHJcblxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kc0ZvclJlY2VpdmUgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5sZWdlbmRzKVxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kRm9yUmVjZWl2ZSA9IGxlZ2VuZHNGb3JSZWNlaXZlW2FjdGlvbi5tYXBJZF1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxlZ2VuZEl0ZW1zRm9yUmVjZWl2ZSA9IGxlZ2VuZEZvclJlY2VpdmUuaXRlbXMubWFwKGZ1bmN0aW9uIChsZWcsIGlkeCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsZWcudXJsID09PSBhY3Rpb24udXJsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxlZy5sZWdlbmRMYXllcnMgPSBhY3Rpb24ubGF5ZXJzLm1hcChmdW5jdGlvbiAobHlyKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZWdlbmREYXRhID0gbHlyLmxlZ2VuZC5tYXAoZnVuY3Rpb24gKGxlZykge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsZWcubGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGxlZy5pbWFnZURhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VIZWlnaHQ6IGxlZy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VXaWR0aDogbGVnLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBndWlkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJMYXllcklkOiBseXIubGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkxheWVyTmFtZTogbHlyLmxheWVyTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkxheWVyTWluU2NhbGU6IGx5ci5taW5TY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkxheWVyTWF4U2NhbGU6IGx5ci5tYXhTY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkxheWVyU2NhbGVSZXN0cmljdGVkOiBseXIubWluU2NhbGUgIT09IDAgJiYgbHlyLm1heFNjYWxlICE9PSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViTGF5ZXJMZWdlbmREYXRhOiBsZWdlbmREYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogbGVnLnN1YkxheWVyc1Zpc2libGUgJiYgbGVnLnN1YkxheWVyc1Zpc2libGUgIT0gdW5kZWZpbmVkID8gbGVnLnN1YkxheWVyc1Zpc2libGUuaW5kZXhPZihseXIubGF5ZXJJZCkgPiAtMSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBndWlkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZWcuYWxyZWFkeUxvYWRlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIGxlZy5leHBhbmRlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxlZ2VuZEZvclJlY2VpdmUuaXRlbXMgPSBsZWdlbmRJdGVtc0ZvclJlY2VpdmVcclxuICAgICAgICAgICAgbGVnZW5kc0ZvclJlY2VpdmVbYWN0aW9uLm1hcElkXSA9IGxlZ2VuZEZvclJlY2VpdmVcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBcclxuICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbGVnZW5kczogbGVnZW5kc0ZvclJlY2VpdmVcclxuICAgICAgICAgICAgfSkgXHJcblxyXG4gICAgICAgIGNhc2UgU0VUX0lOSVRJQUxfTEVHRU5EX0RBVEE6XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlld3NGb3JJbml0aWFsRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnZpZXdzKVxyXG4gICAgICAgICAgICB2aWV3c0ZvckluaXRpYWxEYXRhW2FjdGlvbi5tYXBJZF0gPSBhY3Rpb24udmlld1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbGF5ZXJMZWdlbmRGb3JJbml0aWFsRGF0YSA9IGFjdGlvbi52aWV3Lm1hcC5sYXllcnMgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChpbml0THlyLCBpZHgpIHsgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YkxheWVyc1Zpc2libGVGb3JJbml0aWFsRGF0YSA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc3ViSW5pdExheWVyIGluIGluaXRMeXIuYWxsU3VibGF5ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbCA9IGluaXRMeXIuYWxsU3VibGF5ZXJzW3N1YkluaXRMYXllcl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkxheWVyc1Zpc2libGVGb3JJbml0aWFsRGF0YS5wdXNoKHNsLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVySWQ6IGlkeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJOYW1lOiBpbml0THlyLnRpdGxlIHx8IGluaXRMeXIuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblNjYWxlOiBpbml0THlyLm1pblNjYWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhTY2FsZTogaW5pdEx5ci5tYXhTY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVSZXN0cmljdGVkOiBpbml0THlyLm1pblNjYWxlICE9PSAwICYmIGluaXRMeXIubWF4U2NhbGUgIT09IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsIC8vIGluaXRMeXIudmlzaWJsZSA9PT0gbnVsbCB8fCBpbml0THlyLnZpc2libGUgPT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGluaXRMeXIudmlzaWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViTGF5ZXJzVmlzaWJsZTogc3ViTGF5ZXJzVmlzaWJsZUZvckluaXRpYWxEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGluaXRMeXIudXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmRMYXllcnM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFscmVhZHlMb2FkZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBndWlkKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGxlZ2VuZHNGb3JJbml0aWFsRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmxlZ2VuZHMpXHJcbiAgICAgICAgICAgIGxlZ2VuZHNGb3JJbml0aWFsRGF0YVthY3Rpb24ubWFwSWRdID0gbGF5ZXJMZWdlbmRGb3JJbml0aWFsRGF0YVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IFxyXG4gICAgICAgICAgICAgICAgbGVnZW5kczogbGVnZW5kc0ZvckluaXRpYWxEYXRhLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHZpZXdzRm9ySW5pdGlhbERhdGFcclxuICAgICAgICAgICAgfSkgXHJcblxyXG4gICAgICAgIGNhc2UgVE9HR0xFX0xFR0VORF9OT0RFX0VYUEFOREVEOlxyXG5cclxuICAgICAgICAgICAgbGV0IGxlZ2VuZHNGb3JUb2dnbGVOb2RlRXhwYW5kZWQgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5sZWdlbmRzKVxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kRm9yVG9nZ2xlTm9kZUV4cGFuZGVkID0gbGVnZW5kc0ZvclRvZ2dsZU5vZGVFeHBhbmRlZFthY3Rpb24ubWFwSWRdXHJcblxyXG4gICAgICAgICAgICBjb25zdCBsZWdlbmRJdGVtc0ZvclRvZ2dsZU5vZGVFeHBhbmRlZCA9IGxlZ2VuZEZvclRvZ2dsZU5vZGVFeHBhbmRlZC5pdGVtcy5tYXAoZnVuY3Rpb24gKGxlZywgaWR4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxlZy5pZCA9PT0gYWN0aW9uLm5vZGVJZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZWcuZXhwYW5kZWQgPSAhbGVnLmV4cGFuZGVkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsZWcubGVnZW5kTGF5ZXJzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZ2VuZExheWVyc0ZvclRvZ2dsZU5vZGVFeHBhbmRlZCA9IGxlZy5sZWdlbmRMYXllcnMubWFwKGZ1bmN0aW9uIChseXIpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChseXIuaWQgPT09IGFjdGlvbi5ub2RlSWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBseXIuZXhwYW5kZWQgPSAhbHlyLmV4cGFuZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGx5clxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxlZy5sZWdlbmRMYXllcnMgPSBsZWdlbmRMYXllcnNGb3JUb2dnbGVOb2RlRXhwYW5kZWQgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGVnZW5kRm9yVG9nZ2xlTm9kZUV4cGFuZGVkLml0ZW1zID0gbGVnZW5kSXRlbXNGb3JUb2dnbGVOb2RlRXhwYW5kZWRcclxuICAgICAgICAgICAgbGVnZW5kc0ZvclRvZ2dsZU5vZGVFeHBhbmRlZFthY3Rpb24ubWFwSWRdID0gbGVnZW5kRm9yVG9nZ2xlTm9kZUV4cGFuZGVkXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgXHJcbiAgICAgICAgICAgICAgICBsZWdlbmRzOiBsZWdlbmRzRm9yVG9nZ2xlTm9kZUV4cGFuZGVkXHJcbiAgICAgICAgICAgIH0pIFxyXG5cclxuICAgICAgICBjYXNlIFRPR0dMRV9MRUdFTkRfTk9ERV9WSVNJQkxFOlxyXG5cclxuICAgICAgICAgICAgbGV0IGxlZ2VuZHNGb3JUb2dnbGVOb2RlVmlzaWJsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmxlZ2VuZHMpXHJcbiAgICAgICAgICAgIGxldCBsZWdlbmRGb3JUb2dnbGVOb2RlVmlzaWJsZSA9IGxlZ2VuZHNGb3JUb2dnbGVOb2RlVmlzaWJsZVthY3Rpb24ubWFwSWRdXHJcblxyXG4gICAgICAgICAgICBjb25zdCBsZWdlbmRJdGVtc0ZvclRvZ2dsZU5vZGVWaXNpYmxlID0gbGVnZW5kRm9yVG9nZ2xlTm9kZVZpc2libGUuaXRlbXMubWFwKGZ1bmN0aW9uIChsZWcsIGlkeCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsZWcuaWQgPT09IGFjdGlvbi5ub2RlSWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGVnLnZpc2libGUgPSAhbGVnLnZpc2libGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxlZy5sZWdlbmRMYXllcnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVnZW5kTGF5ZXJzRm9yVG9nZ2xlTm9kZVZpc2libGUgPSBsZWcubGVnZW5kTGF5ZXJzLm1hcChmdW5jdGlvbiAobHlyKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobHlyLmlkID09PSBhY3Rpb24ubm9kZUlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbHlyLnZpc2libGUgPSAhbHlyLnZpc2libGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbHlyXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViTGF5ZXJzVmlzaWJsZUZvclRvZ2dsZU5vZGVWaXNpYmxlID0gW11cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBzbCBpbiBsZWcubGVnZW5kTGF5ZXJzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVnLmxlZ2VuZExheWVyc1tzbF0udmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViTGF5ZXJzVmlzaWJsZUZvclRvZ2dsZU5vZGVWaXNpYmxlLnB1c2gobGVnLmxlZ2VuZExheWVyc1tzbF0uc3ViTGF5ZXJJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGVnLnN1YkxheWVyc1Zpc2libGUgPSBzdWJMYXllcnNWaXNpYmxlRm9yVG9nZ2xlTm9kZVZpc2libGVcclxuICAgICAgICAgICAgICAgICAgICBsZWcubGVnZW5kTGF5ZXJzID0gbGVnZW5kTGF5ZXJzRm9yVG9nZ2xlTm9kZVZpc2libGUgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGVnZW5kRm9yVG9nZ2xlTm9kZVZpc2libGUuaXRlbXMgPSBsZWdlbmRJdGVtc0ZvclRvZ2dsZU5vZGVWaXNpYmxlXHJcbiAgICAgICAgICAgIGxlZ2VuZHNGb3JUb2dnbGVOb2RlVmlzaWJsZVthY3Rpb24ubWFwSWRdID0gbGVnZW5kRm9yVG9nZ2xlTm9kZVZpc2libGVcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZUxheWVycyhzdGF0ZS52aWV3c1thY3Rpb24ubWFwSWRdLCBsZWdlbmRGb3JUb2dnbGVOb2RlVmlzaWJsZSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBcclxuICAgICAgICAgICAgICAgIGxlZ2VuZHM6IGxlZ2VuZHNGb3JUb2dnbGVOb2RlVmlzaWJsZVxyXG4gICAgICAgICAgICB9KSBcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGd1aWQoKSB7XHJcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KClcclxufVxyXG5cclxuZnVuY3Rpb24gczQoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgLnRvU3RyaW5nKDE2KVxyXG4gICAgICAuc3Vic3RyaW5nKDEpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxheWVycyh2aWV3LCBsZWdlbmQpIHtcclxuXHJcbiAgICBmb3IgKGxldCBseXIgaW4gbGVnZW5kLml0ZW1zKSB7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBsZWdlbmRMeXIgPSBsZWdlbmQuaXRlbXNbbHlyXVxyXG5cclxuICAgICAgICBpZiAobGVnZW5kTHlyLmFscmVhZHlMb2FkZWQgPT09IHRydWUpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxheWVyRmluZCA9IHZpZXcubWFwLmxheWVycy5maWx0ZXIoZnVuY3Rpb24obHlyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbHlyLnRpdGxlID09PSBsZWdlbmRMeXIubGF5ZXJOYW1lIHx8IGx5ci5pZCA9PT0gbGVnZW5kTHlyLmxheWVyTmFtZVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaWYgKGxheWVyRmluZCAmJiBsYXllckZpbmQuaXRlbXMgJiYgbGF5ZXJGaW5kLml0ZW1zLmxlbmd0aCAhPT0gMSkgcmV0dXJuIG51bGxcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRMYXllciA9IGxheWVyRmluZC5pdGVtc1swXVxyXG5cclxuICAgICAgICAgICAgaWYgKGxlZ2VuZEx5ci52aXNpYmxlICYmIGxlZ2VuZEx5ci5zdWJMYXllcnNWaXNpYmxlICYmIGxlZ2VuZEx5ci5zdWJMYXllcnNWaXNpYmxlICE9IHVuZGVmaW5lZCAmJiBtYXRjaGVkTGF5ZXIuc3VibGF5ZXJzICYmIG1hdGNoZWRMYXllci5zdWJsYXllcnMgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZWRMYXllci5zdWJsYXllcnMgJiYgbWF0Y2hlZExheWVyLnN1YmxheWVycyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVkTGF5ZXIuc3VibGF5ZXJzID0gbWF0Y2hlZExheWVyLnN1YmxheWVycy5tYXAoZnVuY3Rpb24gKHN1Ykx5cikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViTGF5ZXJGaW5kID0gbGVnZW5kTHlyLnN1YkxheWVyc1Zpc2libGUuZmlsdGVyKGZ1bmN0aW9uKHN1YklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViTHlyLmlkID09PSBzdWJJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViTHlyLnZpc2libGUgPSAoc3ViTGF5ZXJGaW5kICYmIHN1YkxheWVyRmluZC5sZW5ndGggPT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJMeXJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hlZExheWVyLnZpc2libGUgIT09IGxlZ2VuZEx5ci52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBtYXRjaGVkTGF5ZXIudmlzaWJsZSA9IGxlZ2VuZEx5ci52aXNpYmxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==