app.factory("userbundle", function($http, config, $q) {
  return {
    getDetails: function(bundleId) {
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
    editBundle: function(data) {
      var q = $q.defer();
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "PUT",
        url: config.edit_mybundle,
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
    getList: function() {
      var q = $q.defer();
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "GET",
        url: config.mybundel_list,
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
    updateBundle: function(data) {
      var q = $q.defer();
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "POST",
        url: config.update_mybundle_single,
        type: "json",
        data: data,
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
    updateBundleWithoutBundleId: function(data) {
      var q = $q.defer();
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "POST",
        url: config.update_mybundle_singlewithoutbundleid,
        type: "json",
        data: data,
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
