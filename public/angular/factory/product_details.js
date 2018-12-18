app.factory("product_details", function($http, config, $q) {
  return {
    addToCart: function(qty, pd_id) {
      var q = $q.defer();
      var suggestURL = config.addToCart;
      let data = {
        product_id: pd_id,
        quantity: qty,
        is_bundel: false
      };
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
    postReview: function(formData, userData) {
      //console.log(formData);
      var q = $q.defer();
      var suggestURL = config.submitBundle_review;
      let data = formData;
      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: data,
        headers: {
          "Content-Type": "application/json",
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
