app.factory("addNewAddress", function($http, config, $q) {
  return {
    add_address: function(formData, userToken) {
      //console.log(formData);
      var q = $q.defer();
      var addURL = config.addAddress;
      var updateURL = config.updateAddress;
      let suggestURL = formData.a_id != "" ? updateURL : addURL;
      let data = formData;
      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    },
    change_default_address: function(formData, userToken) {
      //console.log(formData);
      var q = $q.defer();
      var suggestURL = config.changeDefaultAddress;
      let data = formData;
      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    },
    remove_address: function(formData, userToken) {
      //console.log(formData);
      var q = $q.defer();
      var suggestURL = config.removeAddress;
      let data = formData;
      let addressDeleteUrl = suggestURL + "?id=" + formData.a_id;
      $http({
        method: "GET",
        url: addressDeleteUrl,
        type: "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    },
    getlist: function() {
      var userAuth = typeof $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      var userToken = userAuth != "" ? userAuth.token : "";
      var q = $q.defer();
      var suggestURL = config.addressList;
      $http({
        method: "GET",
        url: suggestURL,
        type: "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    },
    cityarea_get: function() {
      //console.log(formData);
      var q = $q.defer();
      var suggestURL = config.getcityarealist;
      $http({
        method: "GET",
        url: suggestURL,
        type: "json",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    }
  };
});
