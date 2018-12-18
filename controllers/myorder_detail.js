const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");

let get_data = async (cookies, order_id) => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let data = await axios.get(
      "/order/details/get?order_id=" + order_id.order_id,
      getparam
    );
    response = data.data.results.response;
    if (response) {
      return response;
    } else {
      throw "error";
    }
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_data
};
