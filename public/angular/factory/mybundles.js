app.factory("mybundle_addtocart", function($http, config, $q) {
  return {
    getBundleData: function(bundleId) {
      var q = $q.defer();
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "GET",
        url: config.view_mybundle,
        type: "json",
        params: { ub_id: bundleId },
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
    addToCart: function(data) {
      var q = $q.defer();
      // var suggestURL = config.addToCart;
      var data = {
        ub_id: data
      };
      var suggestURL = config.adduserbundletocart;
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: data,
        headers: {
          Authorization: "Bearer " + token.token,
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
    },
    unSubscribe: function(bundleId) {
      var q = $q.defer();
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "PATCH",
        url: config.unsubscribeBundle + "?ub_id=" + bundleId,
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
    }
  };
});
