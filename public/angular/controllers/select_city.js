app.controller("select_city", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config
) {
  //////select_city/////////
  var select_city = document.forms.selectCity;
  select_city.onsubmit = function() {
    if (typeof $scope.city_selected == "undefined") {
      toastr.warning("Please select the city");
    } else {
      var selected_city = $scope.city_selected.split("-");
      localStorage.setItem("city", selected_city[0]);
      localStorage.setItem("city_name", selected_city[1]);
      window.location.href = "/area/" + selected_city[0];
    }
  };
});
