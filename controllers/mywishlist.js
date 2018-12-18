const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");

let get_mywishlist = async cookies => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let response = await axios.get("/wishList/getwishlist", getparam);
    return response.data;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_mywishlist
};
