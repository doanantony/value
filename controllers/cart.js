const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
// const Logger = require("../lib/logger").Logger;

let get_data = async cookies => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let cartdata = await axios.get("cart/listV2", getparam);
    response = cartdata.data.results.response;
    return response;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_data
};
