const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");

let get_data = async cookies => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    getparam["params"] = { id: cookies.user_id };
    let response = await axios.get(`/userProfile/get`, getparam);
    //console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_data
};
