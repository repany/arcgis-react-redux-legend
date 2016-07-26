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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXGFwcC1tYWluLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUlNLE87Ozs7Ozs7Ozs7O3FDQUVPO0FBQ0wsdUJBQVE7QUFBQTtBQUFBO0FBQUssdUVBQU8sT0FBTyxnQkFBZDtBQUFMLGlCQUFSO0FBQ0g7Ozs7OztzQkFHVyxPIiwiZmlsZSI6ImNvbXBvbmVudHNcXGFwcC1tYWluLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcclxuXHJcbmltcG9ydCBNYXBVaSBmcm9tICdhcHAvY29tcG9uZW50cy9tYXAtdmlldydcclxuXHJcbmNsYXNzIEFwcE1haW4gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgXHJcbiAgICByZW5kZXIoKSB7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gKDxkaXY+PE1hcFVpIG1hcElkPXsnbGVnZW5kIGV4YW1wbGUnfSAvPjwvZGl2PilcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKEFwcE1haW4pXHJcbiJdfQ==