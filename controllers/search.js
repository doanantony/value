const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
// const Logger = require("../lib/logger").Logger;

let get_data = async data => {
  try {
    let getparam = axios_config;
    let response = await axios.get("/search?q=" + data, getparam);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_data
};
