const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");

let get_data = async cookies => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let myorders = await axios.get("/order/list/get", getparam);
    response = myorders.data.results.response;
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get_data
};
