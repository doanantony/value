app.factory("getMyorderlist", function($http, config, $q) {
  return {
    getlist: function(pageNO, userData) {
      var q = $q.defer();
      var suggestURL = config.orderList;
      let listUrl = suggestURL + "?page_no=" + pageNO;

      $http({
        method: "GET",
        url: listUrl,
        type: "json",
        headers: {
          Authorization: "Bearer " + userData
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
