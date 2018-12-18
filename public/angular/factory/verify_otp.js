app.factory("otpVerify", function($http, config, $q) {
  return {
    email_verify: function(formData, userData) {
      //console.log(formData);
      var q = $q.defer();
      var suggestURL = config.emailVerify;
      var verifyUrl =
        suggestURL + "?otp=" + formData.otp + "&email=" + formData.email;

      $http({
        method: "GET",
        url: verifyUrl,
        type: "json",
        headers: {
          "Content-Type": "application/json"
          //Authorization: "Bearer " + userData
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
    resent_otp: function() {
      var q = $q.defer();
      var suggestURL = config.sentotptoemail;
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      var verifyUrl = suggestURL;
      $http({
        method: "POST",
        url: verifyUrl,
        type: "json",
        data: { email: token.email },
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
