app.controller("add_address", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  addNewAddress,
  address
) {
  addNewAddress
    .cityarea_get()
    .then(function(response) {
      $scope.city = response.data.results;
      if (address.data != "") {
        console.log(address.data.a_city_id);
        $timeout(function() {}, 3000);
        $scope.getarea(address.data.a_city_id);
      }
    })
    .catch(function(response) {
      console.log(response);
    });

  $scope.getarea = function(index) {
    let i = _.findIndex($scope.city, function(o) {
      return o.city_id == index;
    });
    $scope.area = $scope.city[i].area;
  };
  //Profile Update//
  var cp = document.forms.newAddress,
    elem = cp.elements;
  cp.onsubmit = function() {
    var a = 0;
    if (!elem.address_name.value) {
      toastr.error("Name is required");
      elem.address_name.focus();
      a = 1;
    }
    if (!elem.phone_no.value) {
      toastr.error("Phone Number is Required");
      elem.phone_no.focus();
      a = 1;
    }

    if (!elem.flat.value) {
      toastr.error("FLAT/HOUSE/FLOOR/BUILDING is Required");
      elem.flat.focus();
      a = 1;
    }
    if (!elem.street.value) {
      toastr.error("STREET/LOCALITY");
      elem.street.focus();
      a = 1;
    }
    if (!elem.city_id.value) {
      toastr.error("City is Required");
      elem.city_id.focus();
      a = 1;
    }
    if (!elem.area_id.value) {
      toastr.error("Area is Required");
      elem.area_id.focus();
      a = 1;
    }
    // if (!elem.postalcode.value) {
    //   toastr.error("Postalcode is Required");
    //   elem.postalcode.focus();
    //   a = 1;
    // }

    if (a == 1) {
      return false;
    } else {
      var userAuth = typeof $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      var userToken = userAuth != "" ? userAuth.token : "";

      let userData = {
        a_id: elem.address_id.value,
        a_name: elem.address_name.value,
        a_phone: elem.phone_no.value,
        a_address_1: elem.flat.value,
        a_address_2: elem.street.value,
        a_city_id: _.trimStart(elem.city_id.value, "number:"),
        a_area_id: _.trimStart(elem.area_id.value, "number:"),
        a_pincode: elem.postalcode.value
      };
      addNewAddress
        .add_address(userData, userToken)
        .then(function(response) {
          console.log(response);
          var res = response.data.results;
          toastr.success(response.data.results);
          var base_url = window.location.origin;
          window.location.replace(base_url + "/addressbook");
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  };
});
