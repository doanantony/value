app.controller("change_password", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config
) {
  /**
   * Change password function
   */
  var cp = document.forms.change_password,
    elem = cp.elements;
  cp.onsubmit = function() {
    var a = 0;
    if (!elem.cnew_password.value) {
      toastr.error("Confirm new password is required");
      elem.cnew_password.focus();
      a = 1;
    }
    if (!elem.new_password.value) {
      toastr.error("New password is required");
      elem.new_password.focus();
      a = 1;
    }
    if (!elem.current_password.value) {
      toastr.error("Current password is required");
      elem.current_password.focus();
      a = 1;
    }
    if (
      elem.new_password.value != elem.cnew_password.value &&
      elem.cnew_password.value != elem.new_password.value
    ) {
      toastr.error("New password or Confirm new password is mismatch");
      a = 1;
    }
    if (a == 1) {
      return false;
    } else {
      var suggestURL = config.change_password;
      let data = {
        old_password: elem.current_password.value,
        new_password: elem.new_password.value
      };
      let token = JSON.parse($.cookie("vcartAuth"));
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
          toastr.success(success.data.result);
          $("#current_password, #new_password, #cnew_password").val("");
        })
        .catch(function(failure) {
          toastr.error(failure.data.error);
        });
    }
  };
});
