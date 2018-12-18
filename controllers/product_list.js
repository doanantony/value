const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
var _ = require("lodash");
// const Logger = require("../lib/logger").Logger;

let get_data = async (querydata, cat_id, cookies) => {
  try {
    querydata["cat_id"] = cat_id;
    let response = {};
    let getparam = axios_config;
    if (cookies) {
      getparam["headers"] = {
        Authorization: "Bearer " + cookies.token
      };
    } else {
      delete getparam["headers"];
    }
    let product_filter = await axios.get(
      "product/filter/get?cat_id=" + cat_id,
      getparam
    );
    if (_.isEmpty(product_filter.data.results.response) == true) {
      // throw product_filter;
    }
    response["product_config"] = product_filter.data.results.response;
    response["product_type"] =
      product_filter.data.results.msg == "VCGT" ? "Bundle" : "Valuecart";
    response["querydata"] = querydata;
    return response;
  } catch (error) {
    throw error;
  }
};
let get_datav2 = async (querydata, cookies) => {
  try {
    let response = {};
    let getparam = axios_config;
    if (cookies) {
      getparam["headers"] = {
        Authorization: "Bearer " + cookies.token
      };
    } else {
      delete getparam["headers"];
    }
    let product_filter = await axios.get("product/filter/get/v2", getparam);
    if (_.isEmpty(product_filter.data.results.response) == true) {
      // throw product_filter;
    }
    response["product_config"] = product_filter.data.results.response;
    response["product_type"] =
      product_filter.data.results.msg == "VCGT" ? "Bundle" : "ValuCart";
    response["querydata"] = querydata;
    return response;
  } catch (error) {
    throw error;
  }
};
let get_datave = async querydata => {
  try {
    let response = {};
    let getparam = axios_config;
    let product_filter = await axios.get(
      "product/filter/valuecartexclusive/get",
      getparam
    );
    if (_.isEmpty(product_filter.data.results.response) == true) {
      // throw product_filter;
    }
    response["product_config"] = product_filter.data.results.response;
    response["querydata"] = querydata;
    return response;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_data,
  get_datav2,
  get_datave
};
