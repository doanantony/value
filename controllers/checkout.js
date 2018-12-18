const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
// const Logger = require("../lib/logger").Logger;

let orderInit = async (cookies, data) => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let order = await axios.post("order/initV2/post", data, getparam);
    response = order.data.results.response;
    return response;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
module.exports = {
  orderInit
};
