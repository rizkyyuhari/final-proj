/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
function removeMongoId(_, value) {
  delete value._id;
}

const toJSONOptions = {
  virtuals: true,
  versionKey: false,
  transform: removeMongoId
};

export { toJSONOptions, removeMongoId };
