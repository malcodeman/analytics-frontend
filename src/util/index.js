function isEmpty(object) {
  return Object.entries(object).length === 0 && object.constructor === Object;
}

export default {
  isEmpty
};
