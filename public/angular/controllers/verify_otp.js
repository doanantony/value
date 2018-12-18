app.controller("otpVerify", function(
  $scope,
  $rootScope,
  $location,
  $window,
  $http,
  $timeout,
  $filter,
  config,
  otpVerify
) {
  let token = JSON.parse($.cookie("vcartAuth"));
  $scope.email = token.email;
  var cp = document.forms.formOtp,
    elem = cp.elements;
  cp.onsubmit = function() {
    var otp = "";

    angular.forEach(angular.element(elem.otpvalue), function(data, key) {
      otp += data.value;
    });

    if (otp.length == 6) {
      var userAuth = typeof $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      var userEmail = userAuth != "" ? userAuth.useremail : "";
      var userToken = userAuth != "" ? userAuth.token : "";

      let userData = {
        email: userEmail,
        otp: otp
      };

      otpVerify
        .email_verify(userData, userToken)
        .then(function(response) {
          if (response.data.error) {
            $(".otpvalue").val("");
            console.log($(".otpvalue"));
            toastr.error(response.data.error);
          } else {
            var loc = JSON.parse($.cookie("vcartAuth"));
            loc.is_email_verified = true;
            $.cookie("vcartAuth", JSON.stringify(loc), {
              expires: 7,
              path: "/"
            });
            toastr.success(response.data.result);
            $window.location.href = "/";
          }
        })
        .catch(function(response) {
          $(".otpvalue").val("");
          toastr.error(response.data.error);
        });
    } else {
      toastr.error("OTP should have 6 numbers");
      return false;
    }
  };
  $scope.resendotp = function() {
    $(".resend-btn").text("Sending...");
    otpVerify
      .resent_otp()
      .then(function(response) {
        console.log(response);
        if (response.data.error) {
          toastr.error(response.data.error);
        } else {
          toastr.success(response.data.results);
          $(".resend-btn").text("Resend OTP");
          $(".otpvalue").val("");
          //$window.location.href = "/";
        }
      })
      .catch(function(response) {
        console.log(response);
      });
  };
});
