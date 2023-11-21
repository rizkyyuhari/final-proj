"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeMongoId = removeMongoId;
exports.toJSONOptions = void 0;
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
function removeMongoId(_, value) {
  delete value._id;
}
var toJSONOptions = exports.toJSONOptions = {
  virtuals: true,
  versionKey: false,
  transform: removeMongoId
};