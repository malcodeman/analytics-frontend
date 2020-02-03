function isEmpty(object) {
  return Object.entries(object).length === 0 && object.constructor === Object;
}

function getParam(myParam) {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(myParam);

  return param;
}

export default {
  isEmpty,
  getParam
};
