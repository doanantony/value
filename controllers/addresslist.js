const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");

let get_address = async (cookies, address_id) => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    if (address_id != "") {
      getparam["params"] = { id: address_id };
      $url = "/userProfile/getuseraddress";
    } else {
      $url = "/userProfile/useraddresslist";
    }
    let response = await axios.get($url, getparam);

    return response.data.results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_address
};
