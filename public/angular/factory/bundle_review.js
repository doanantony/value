app.factory("postBundleReview", function($http, config, $q) {
  return {
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
