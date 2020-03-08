import * as yup from "yup";

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

async function getHostname(url) {
  const schema = yup
    .string()
    .required()
    .url();
  const valid = await schema.isValid(url);

  if (valid) {
    const hostname = new URL(url).hostname;

    return hostname;
  }

  return "";
}

function mergeRefs(...refs) {
  return ref => {
    refs.forEach(resolvableRef => {
      if (typeof resolvableRef === "function") {
        resolvableRef(ref);
      }

      if (resolvableRef) {
        resolvableRef.current = ref;
      }
    });
  };
}

export default {
  isEmpty,
  getParam,
  getData,
  getHostname,
  mergeRefs
};
