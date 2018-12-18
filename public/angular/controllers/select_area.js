app.controller("select_area", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config
) {
  //////select_area/////////
  var select_area = document.forms.selectArea;
  select_area.onsubmit = function() {
    var selectedArea = $("#selectedarea").val();
    if (typeof selectedArea == "undefined" || selectedArea == "") {
      // if (typeof $scope.area == "undefined" || $scope.area == "") {
      toastr.warning("Please select area!");
    } else {
      localStorage.setItem("area", $scope.area);
      window.location.href = "/";
    }
  };
});
