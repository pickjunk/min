"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.STOPPER_PROMISE = exports.STOP_VALUE = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// There is a wried behavior with babel-loader when it see `Promise.stop`.
// Without this line, Promise in `Promise.stop` and `Promise.prototype` are
// not the same, the former not compiled, the latter compiled to babel runtime
// polyfill.
// DO NOT REMOVE THIS LINE!
var p = Promise; // Stoppable Promise
// https://github.com/xieranmaya/blog/issues/5

var STOP_VALUE = Symbol('PromiseStop');
exports.STOP_VALUE = STOP_VALUE;
var STOPPER_PROMISE = p.resolve(STOP_VALUE); // In development environment, code will be compiled and reloaded
// multiple times in the same process. This module have a side effect for
// global Promise, which means we must make sure this module only initialized
// once, otherwise an infinite loop will occur in the then function and `Maximum
// call stack size exceeded` will fuck and fill your screen.
// DO NOT REMOVE THIS IF STATEMENT!

exports.STOPPER_PROMISE = STOPPER_PROMISE;

if (!p.prototype._then) {
  var then = p.prototype.then; // @ts-ignore

  p.prototype.then = function (onResolved, onRejected) {
    // @ts-ignore
    return then.call(this, onResolved ? function (value) {
      return value === STOP_VALUE ? STOP_VALUE : onResolved(value);
    } : undefined, onRejected);
  };
}

var StoppablePromise = /*#__PURE__*/function (_Promise) {
  (0, _inherits2["default"])(StoppablePromise, _Promise);

  var _super = _createSuper(StoppablePromise);

  function StoppablePromise() {
    (0, _classCallCheck2["default"])(this, StoppablePromise);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(StoppablePromise, null, [{
    key: "stop",
    value: function stop() {
      return STOPPER_PROMISE;
    }
  }]);
  return StoppablePromise;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Promise));

var _default = StoppablePromise;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9taXNlLnRzIl0sIm5hbWVzIjpbInAiLCJQcm9taXNlIiwiU1RPUF9WQUxVRSIsIlN5bWJvbCIsIlNUT1BQRVJfUFJPTUlTRSIsInJlc29sdmUiLCJwcm90b3R5cGUiLCJfdGhlbiIsInRoZW4iLCJvblJlc29sdmVkIiwib25SZWplY3RlZCIsImNhbGwiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsIlN0b3BwYWJsZVByb21pc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsQ0FBQyxHQUFHQyxPQUFWLEMsQ0FFQTtBQUNBOztBQUNPLElBQU1DLFVBQVUsR0FBR0MsTUFBTSxDQUFDLGFBQUQsQ0FBekI7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHSixDQUFDLENBQUNLLE9BQUYsQ0FBVUgsVUFBVixDQUF4QixDLENBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBQ0EsSUFBSSxDQUFFRixDQUFDLENBQUNNLFNBQUgsQ0FBcUJDLEtBQTFCLEVBQWlDO0FBQy9CLE1BQU1DLElBQUksR0FBR1IsQ0FBQyxDQUFDTSxTQUFGLENBQVlFLElBQXpCLENBRCtCLENBRS9COztBQUNBUixFQUFBQSxDQUFDLENBQUNNLFNBQUYsQ0FBWUUsSUFBWixHQUFtQixVQUFVQyxVQUFWLEVBQXNCQyxVQUF0QixFQUFrQztBQUNuRDtBQUNBLFdBQU9GLElBQUksQ0FBQ0csSUFBTCxDQUNMLElBREssRUFFTEYsVUFBVSxHQUNOLFVBQVVHLEtBQVYsRUFBaUI7QUFDZixhQUFPQSxLQUFLLEtBQUtWLFVBQVYsR0FBdUJBLFVBQXZCLEdBQW9DTyxVQUFVLENBQUNHLEtBQUQsQ0FBckQ7QUFDRCxLQUhLLEdBSU5DLFNBTkMsRUFPTEgsVUFQSyxDQUFQO0FBU0QsR0FYRDtBQVlEOztJQUVLSSxnQjs7Ozs7Ozs7Ozs7O1dBQ0osZ0JBQXNDO0FBQ3BDLGFBQU9WLGVBQVA7QUFDRDs7O2tEQUgrQkgsTzs7ZUFNbkJhLGdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlcmUgaXMgYSB3cmllZCBiZWhhdmlvciB3aXRoIGJhYmVsLWxvYWRlciB3aGVuIGl0IHNlZSBgUHJvbWlzZS5zdG9wYC5cbi8vIFdpdGhvdXQgdGhpcyBsaW5lLCBQcm9taXNlIGluIGBQcm9taXNlLnN0b3BgIGFuZCBgUHJvbWlzZS5wcm90b3R5cGVgIGFyZVxuLy8gbm90IHRoZSBzYW1lLCB0aGUgZm9ybWVyIG5vdCBjb21waWxlZCwgdGhlIGxhdHRlciBjb21waWxlZCB0byBiYWJlbCBydW50aW1lXG4vLyBwb2x5ZmlsbC5cbi8vIERPIE5PVCBSRU1PVkUgVEhJUyBMSU5FIVxuY29uc3QgcCA9IFByb21pc2U7XG5cbi8vIFN0b3BwYWJsZSBQcm9taXNlXG4vLyBodHRwczovL2dpdGh1Yi5jb20veGllcmFubWF5YS9ibG9nL2lzc3Vlcy81XG5leHBvcnQgY29uc3QgU1RPUF9WQUxVRSA9IFN5bWJvbCgnUHJvbWlzZVN0b3AnKTtcbmV4cG9ydCBjb25zdCBTVE9QUEVSX1BST01JU0UgPSBwLnJlc29sdmUoU1RPUF9WQUxVRSk7XG5cbi8vIEluIGRldmVsb3BtZW50IGVudmlyb25tZW50LCBjb2RlIHdpbGwgYmUgY29tcGlsZWQgYW5kIHJlbG9hZGVkXG4vLyBtdWx0aXBsZSB0aW1lcyBpbiB0aGUgc2FtZSBwcm9jZXNzLiBUaGlzIG1vZHVsZSBoYXZlIGEgc2lkZSBlZmZlY3QgZm9yXG4vLyBnbG9iYWwgUHJvbWlzZSwgd2hpY2ggbWVhbnMgd2UgbXVzdCBtYWtlIHN1cmUgdGhpcyBtb2R1bGUgb25seSBpbml0aWFsaXplZFxuLy8gb25jZSwgb3RoZXJ3aXNlIGFuIGluZmluaXRlIGxvb3Agd2lsbCBvY2N1ciBpbiB0aGUgdGhlbiBmdW5jdGlvbiBhbmQgYE1heGltdW1cbi8vIGNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZGAgd2lsbCBmdWNrIGFuZCBmaWxsIHlvdXIgc2NyZWVuLlxuLy8gRE8gTk9UIFJFTU9WRSBUSElTIElGIFNUQVRFTUVOVCFcbmlmICghKHAucHJvdG90eXBlIGFzIGFueSkuX3RoZW4pIHtcbiAgY29uc3QgdGhlbiA9IHAucHJvdG90eXBlLnRoZW47XG4gIC8vIEB0cy1pZ25vcmVcbiAgcC5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChvblJlc29sdmVkLCBvblJlamVjdGVkKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiB0aGVuLmNhbGwoXG4gICAgICB0aGlzLFxuICAgICAgb25SZXNvbHZlZFxuICAgICAgICA/IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSBTVE9QX1ZBTFVFID8gU1RPUF9WQUxVRSA6IG9uUmVzb2x2ZWQodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICBvblJlamVjdGVkLFxuICAgICk7XG4gIH07XG59XG5cbmNsYXNzIFN0b3BwYWJsZVByb21pc2U8VD4gZXh0ZW5kcyBQcm9taXNlPFQ+IHtcbiAgc3RhdGljIHN0b3AoKTogdHlwZW9mIFNUT1BQRVJfUFJPTUlTRSB7XG4gICAgcmV0dXJuIFNUT1BQRVJfUFJPTUlTRTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdG9wcGFibGVQcm9taXNlO1xuIl19