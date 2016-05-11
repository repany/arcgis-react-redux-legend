define(['exports', 'redux', 'app/reducers/map-legend-config'], function (exports, _redux, _mapLegendConfig) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _mapLegendConfig2 = _interopRequireDefault(_mapLegendConfig);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var AppReducers = (0, _redux.combineReducers)({
        mapLegendConfig: _mapLegendConfig2.default
    });

    exports.default = AppReducers;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHVjZXJzXFxhcHAtcmVkdWNlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsUUFBTSxjQUFjLDRCQUFnQjtBQUNoQztBQURnQyxLQUFoQixDQUFwQjs7c0JBSWUsVyIsImZpbGUiOiJyZWR1Y2Vyc1xcYXBwLXJlZHVjZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnXHJcbmltcG9ydCBtYXBMZWdlbmRDb25maWcgZnJvbSAnYXBwL3JlZHVjZXJzL21hcC1sZWdlbmQtY29uZmlnJ1xyXG5cclxuY29uc3QgQXBwUmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoeyAgICBcclxuICAgIG1hcExlZ2VuZENvbmZpZ1xyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwUmVkdWNlcnNcclxuIl19