define(['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'app/components/app-main', 'app/reducers/app-reducers'], function (_react, _reactDom, _redux, _reactRedux, _reduxThunk, _appMain, _appReducers) {
    'use strict';

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

    var _appMain2 = _interopRequireDefault(_appMain);

    var _appReducers2 = _interopRequireDefault(_appReducers);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var store = (0, _redux.createStore)(_appReducers2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default));

    var contentElement = document.getElementById('app-container');
    _reactDom2.default.render(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_appMain2.default, null)
    ), contentElement);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxRQUFNLFFBQVEsK0NBRVYsaURBRlUsQ0FBZDs7QUFLQSxRQUFNLGlCQUFpQixTQUFTLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBdkI7QUFDQSx1QkFBUyxNQUFULENBQ0k7QUFBQTtRQUFBLEVBQVUsT0FBTyxLQUFqQjtRQUNJO0FBREosS0FESixFQUlJLGNBSkoiLCJmaWxlIjoibWFpbi5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nXHJcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgIH0gZnJvbSAncmVkdXgnXHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcclxuXHJcbmltcG9ydCBBcHBNYWluIGZyb20gJ2FwcC9jb21wb25lbnRzL2FwcC1tYWluJ1xyXG5pbXBvcnQgQXBwUmVkdWNlcnMgZnJvbSAnYXBwL3JlZHVjZXJzL2FwcC1yZWR1Y2VycydcclxuXHJcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXHJcbiAgICBBcHBSZWR1Y2VycyxcclxuICAgIGFwcGx5TWlkZGxld2FyZSh0aHVuaylcclxuKVxyXG5cclxuY29uc3QgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwLWNvbnRhaW5lcicpXHJcblJlYWN0RE9NLnJlbmRlcihcclxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgICAgIDxBcHBNYWluIC8+XHJcbiAgICA8L1Byb3ZpZGVyPixcclxuICAgIGNvbnRlbnRFbGVtZW50XHJcbilcclxuIl19