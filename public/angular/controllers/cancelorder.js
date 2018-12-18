app.controller("cancelorder", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config
) {
  $(document).ready(function() {
    $("#sel1").on("change", function() {
      var c_msg = $(this).val();
      if (c_msg == "Others") {
        $("#custom_reason").removeClass("hide");
      } else {
        $("#other_reason").val("");
        $("#custom_reason").addClass("hide");
      }
    });
  });
  /**
   * Order Cancellation
   */
  var co = document.forms.cancel_order,
    elem = co.elements;
  co.onsubmit = function() {
    var a = 0;
    if (!elem.cancelmsg.value) {
      toastr.error("Select the reason for cancellation");
      elem.cancelmsg.focus();
      a = 1;
    }
    if (elem.cancelmsg.value == "Others" && !elem.other_reason.value) {
      toastr.error("Enter the reason for cancellation");
      elem.other_reason.focus();
      a = 1;
    }
    if (a == 1) {
      return false;
    } else {
      var suggestURL = config.cancelorder + elem.order_id.value;
      let data = {};
      if (elem.other_reason.value != "") {
        data = {
          cancel_msg: elem.other_reason.value
        };
      } else {
        data = {
          cancel_msg: elem.cancelmsg.value
        };
      }
      let token = JSON.parse($.cookie("vcartAuth"));
      $http({
        method: "PUT",
        url: suggestURL,
        type: "json",
        data: data,
        headers: {
          Authorization: "Bearer " + token.token,
          "Content-Type": "application/json"
        }
      })
        .then(function(success) {
          if (success.data.results.status == 200) {
            toastr.success(success.data.results.msg);
            window.location = "/myorders";
          } else {
            toastr.warning(success.data.results.msg);
          }
        })
        .catch(function(failure) {
          toastr.error(failure.data.error);
        });
    }
  };
});
