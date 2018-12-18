const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
// const Logger = require("../lib/logger").Logger;

let get_data = async cookies => {
  try {
    let getparam = axios_config;
    if (cookies) {
      getparam["headers"] = {
        Authorization: "Bearer " + cookies.token
      };
    }
    let response = await axios.get("/dashboard/get/v2", getparam);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_data
};
