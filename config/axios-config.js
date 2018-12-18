let instance = {
  baseURL: process.env.APIURL,
  timeout: 200000,
  headers: { "Content-Type": "application/json" }
};
module.exports = {
  instance
};
