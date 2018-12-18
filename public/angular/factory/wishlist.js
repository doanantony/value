app.factory("getWishList", function($http, config, $q) {
  return {
    addWish: function(productData, userData) {
      var q = $q.defer();
      var wishtype= productData.wish_type;
      var suggestURL = (wishtype=='add')?config.addWishList: config.removeWishList;
      var wishMethod= (wishtype=='add')?"GET":"DELETE";
      let url_addwish= suggestURL+"?product_id="+productData.product_id+"&is_bundle="+productData.is_bundle;
      $http({
        method: wishMethod,
        url: url_addwish,
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