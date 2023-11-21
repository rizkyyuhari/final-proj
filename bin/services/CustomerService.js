"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _customerModel = /*#__PURE__*/new WeakMap();
var CustomerService = exports["default"] = /*#__PURE__*/function () {
  function CustomerService(customerModel) {
    (0, _classCallCheck2["default"])(this, CustomerService);
    _classPrivateFieldInitSpec(this, _customerModel, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _customerModel, customerModel);
  }
  (0, _createClass2["default"])(CustomerService, [{
    key: "findById",
    value: function findById(customerId) {
      return (0, _classPrivateFieldGet2["default"])(this, _customerModel).findOne({
        _id: customerId
      }, {
        name: 1,
        username: 1,
        id: 1
      });
    }
  }]);
  return CustomerService;
}();