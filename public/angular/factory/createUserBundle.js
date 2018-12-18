app.factory("createUserbundle", function($http, config, $q) {
  return {
    getDetails: function(order_id) {
      var q = $q.defer();
      let token = JSON.parse($.cookie("vcartAuth"));
      $http({
        method: "GET",
        url: config.orderDetails + "?order_id=" + order_id,
        type: "json",
        headers: {
          Authorization: "Bearer " + token.token
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
    insertBundle: function(data) {
      var q = $q.defer();
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "POST",
        url: config.create_user_bundle,
        type: "json",
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token
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
    insertBundleWithProduct: function(data) {
      var q = $q.defer();
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "POST",
        url: config.createWithproduct,
        type: "json",
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token
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
