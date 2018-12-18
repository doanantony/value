const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
// const Logger = require("../lib/logger").Logger;
let get_data = async (querydata, cat_id) => {
  try {
    querydata["cat_id"] = cat_id;
    let response = {};
    let getparam = axios_config;
    getparam["params"] = { cat_id: cat_id };
    let product_filter = await axios.get("product/filter/bundle/get", getparam);
    response["product_config"] = product_filter.data.results.response;
    response["querydata"] = querydata;
    return response;
  } catch (error) {
    throw error;
  }
};
let get_datav2 = async querydata => {
  try {
    // querydata["cat_id"] = cat_id;
    let response = {};
    let getparam = axios_config;
    // getparam["params"] = { cat_id: cat_id };
    let product_filter = await axios.get(
      "product/filter/bundle/get/v2",
      getparam
    );
    response["product_config"] = product_filter.data.results.response;
    response["querydata"] = querydata;
    return response;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_data,
  get_datav2
};
