app.factory("updateProfile", function($http, config, $q) {
  return {
    update_profile: function(formData, userData) {
      //console.log(formData);
      var q = $q.defer();
      var suggestURL = config.user_profileUpdate;
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
