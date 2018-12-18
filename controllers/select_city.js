const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
// const Logger = require("../lib/logger").Logger;

let get_data = async () => {
  try {
    let response = await axios.get("/userProfile/getcitylist", axios_config);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_data
};
