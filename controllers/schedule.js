const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");
// const Logger = require("../lib/logger").Logger;

let get_data = async (cookies, id) => {
  try {
    let getparam = axios_config;
    if (cookies) {
      getparam["headers"] = {
        Authorization: "Bearer " + cookies.token
      };
    }
    let response = await axios.get(
      "user_bundle/details/get?ub_id=" + id,
      getparam
    );
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

let savedata = async (cookies, payload) => {
  try {
    let getparam = axios_config;
    if (cookies) {
      getparam["headers"] = {
        Authorization: "Bearer " + cookies.token
      };
    }
    let response = await axios.post(
      "user_bundle/scheduleBundle/post",
      {
        time_period: payload.bundles,
        no_days: payload.bundles1,
        ub_id: payload.ub_id
      },
      getparam
    );
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_data,
  savedata
};
