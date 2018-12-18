const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
/**
 *
 * @param {object} cookies
 */
let get_mybundle = async cookies => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let response = await axios.get("user_bundle/list/get", getparam);
    return response.data.results.response;
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {object} cookies
 * @param {Number} bundleId
 */
let deleteBundle = async (cookies, bundleId) => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    getparam["params"] = {
      ub_id: bundleId
    };
    let response = await axios.delete(
      "user_bundle/bundleDelete/delete",
      getparam
    );
    return response.data.results.status;
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {object} cookies
 * @param {Number} bundleId
 */
let get_mybundle_details = async (cookies, bundleId) => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    getparam["params"] = {
      ub_id: bundleId
    };
    let response = await axios.get("user_bundle/details/get", getparam);
    return response.data.results.status;
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {*} cookies
 * @param {*} bundleId
 */
let create_bundle_withname = async (cookies, bundlename) => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let response = await axios.post(
      "user_bundle/createWithName/post",
      { bundle_name: bundlename },
      getparam
    );
    return response.data.results.status;
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {*} cookies
 * @param {*} bundleId
 */
let checkpendingBundle = async (cookies, bundlename) => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let response = await axios.get(
      "user_bundle/checkPendingBundles/get",
      getparam
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
module.exports = {
  get_mybundle,
  deleteBundle,
  get_mybundle_details,
  create_bundle_withname,
  checkpendingBundle
};
