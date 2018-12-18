app.factory("myShipping", function($http, config, $q) {
  return {
    removeShipping: function(shipping_id, userData) {
      var q = $q.defer();
      let suggestURL= config.shppingListUrl+"/"+shipping_id;
      $http({
        method: "DELETE",
        url: suggestURL,
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
    },
    updateShipping: function(listData, shipping_id, userData) {
      var q = $q.defer();
      let suggestURL= config.shppingListUrl+"/"+shipping_id;
      $http({
        method: "PUT",
        url: suggestURL,
        data: listData,
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