function isEmpty(object) {
  return Object.entries(object).length === 0 && object.constructor === Object;
}

function getParam(myParam) {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(myParam);

  return param;
}

function getData(object, initial) {
  if (object && object.data && Object.values(object.data)[0]) {
    return Object.values(object.data)[0];
  }

  return initial;
}

export default {
  isEmpty,
  getParam,
  getData
};
