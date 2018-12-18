app.controller("update_profile", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  updateProfile
) {
  //Profile Update//
  var cp = document.forms.profileForm,
    elem = cp.elements;
  cp.onsubmit = function() {
    var a = 0;
    if (!elem.user_name.value) {
      toastr.error("Name is required");
      elem.name.focus();
      a = 1;
    }
    if (!elem.mobile.value) {
      toastr.error("Mobile Number is Required");
      elem.mobile.focus();
      a = 1;
    }

    if (!elem.postalcode.value) {
      toastr.error("Postal Address is Required");
      elem.postalcode.focus();
      a = 1;
    }
    if (!elem.city.value) {
      toastr.error("City is Required");
      elem.city.focus();
      a = 1;
    }

    if (a == 1) {
      return false;
    } else {
      var userAuth = typeof $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      var userid = userAuth != "" ? userAuth.user_id : "";
      var userToken = userAuth != "" ? userAuth.token : "";

      let userData = {
        id: userid,
        username: elem.user_name.value,
        user_phone_no: elem.mobile.value,
        postal_code: elem.postalcode.value,
        city: elem.city.value
      };

      updateProfile
        .update_profile(userData, userToken)
        .then(function(response) {
          //console.log(response);
          var res = response.data.results;
          toastr.success(response.data.results);
          var base_url = window.location.origin;
          window.location.replace(base_url + "/profile");
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  };
});
