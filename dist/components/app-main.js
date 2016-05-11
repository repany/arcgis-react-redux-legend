define(['exports', 'react', 'app/components/map-view'], function (exports, _react, _mapView) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _mapView2 = _interopRequireDefault(_mapView);

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

    var AppMain = function (_Component) {
        _inherits(AppMain, _Component);

        function AppMain() {
            _classCallCheck(this, AppMain);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(AppMain).apply(this, arguments));
        }

        _createClass(AppMain, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_mapView2.default, { mapId: 'legend example' })
                );
            }
        }]);

        return AppMain;
    }(_react.Component);

    exports.default = AppMain;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXGFwcC1tYWluLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUlNLE87Ozs7Ozs7Ozs7O3FDQUVPO0FBQ0wsdUJBQVE7QUFBQTtvQkFBQTtvQkFBSyxtREFBTyxPQUFPLGdCQUFkO0FBQUwsaUJBQVI7QUFDSDs7Ozs7O3NCQUdXLE8iLCJmaWxlIjoiY29tcG9uZW50c1xcYXBwLW1haW4uanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5cclxuaW1wb3J0IE1hcFVpIGZyb20gJ2FwcC9jb21wb25lbnRzL21hcC12aWV3J1xyXG5cclxuY2xhc3MgQXBwTWFpbiBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBcclxuICAgIHJlbmRlcigpIHsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiAoPGRpdj48TWFwVWkgbWFwSWQ9eydsZWdlbmQgZXhhbXBsZSd9IC8+PC9kaXY+KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoQXBwTWFpbilcclxuIl19