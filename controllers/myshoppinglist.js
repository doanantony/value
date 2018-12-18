const axios_config = require("../config/axios-config.js").instance;
const axios = require("axios");

let getshoppinglist = async (cookies, list_id) => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };

    var lid = list_id != "" ? list_id : "";

    let response = await axios.get("/shopping_list/" + lid, getparam);
    response = response.data.results.response;
    if (response) {
      return response;
    } else {
      throw "error";
    }
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {object} cookies
 * @param {number} list_id
 */
let createShoppingList = async (cookies, list_id) => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let response = await axios.post(
      "/shopping_list",
      { order_id: list_id },
      getparam
    );
    response = response.data.results.response;
    if (response) {
      return response;
    } else {
      throw "error";
    }
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {object} cookies
 * @param {number} list_id
 */
let createShoppingListv2 = async (cookies, postdata) => {
  try {
    let getparam = axios_config;
    getparam["headers"] = {
      Authorization: "Bearer " + cookies.token
    };
    let response = await axios.post("/shopping_list/v2", postdata, getparam);
    response = response.data.results.response;
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
  getshoppinglist,
  createShoppingList,
  createShoppingListv2
};
