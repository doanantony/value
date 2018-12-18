const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");

let get_menulist = async () => {
  try {
    let response = await axios.get("/category/main_sub/get", axios_config);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_menulist
};
