app.controller("home", function (
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  product_details,
  getWishList,
  userbundle
) {
  var userAuth = $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
  $scope.loggedStatus = userAuth.status == "success" ? true : false;

  /**
   *
   * @param {*} data
   */
  $scope.addtocart = function (data) {
    var currentVal = parseInt($("input[name=qty_" + data + "]").val());
    if (currentVal > 0) {
      product_details
        .addToCart(currentVal, data)
        .then(function (response) {
          if (response.data.results.status != "200") {
            toastr.warning(response.data.results.msg);
          } else {
            toastr.success(response.data.results.msg);
            var cartOldQty = localStorage.getItem("cartCount");
            var newCartQty = parseInt(cartOldQty) + parseInt(1);
            localStorage.setItem("cartCount", newCartQty);
            $(".cart-label").text(newCartQty);
          }
        })
        .catch(function (response) {
          toastr.warning(response.data.results.msg);
        });
    } else {
      toastr.error("Please check the quantity");
    }
  };

  /**
   * Cart Qty Plus
   * @param {Number} fieldName
   * @param {Number} index
   */
  $scope.qty_plus = function (fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    $scope.qty = currentVal + 1;
    if (parseInt(currentVal) >= 5) {
      toastr.warning("Cannot add more than 5 items of same product.");
      return
    }
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal + 1);
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
    }
  };
  /**
   * Cart Qty minus
   * @param {Number} fieldName
   * @param {Number} index
   */
  // This button will decrement the value till 0
  $scope.qty_minus = function (fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    $scope.qty = currentVal - 1;
    // If is not undefined
    if (!isNaN(currentVal) && currentVal > 1) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal - 1);
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
    }
  };

  // Wishlist Add and Remove
  $scope.addwish = function (product_id, item, index) {
    var userAuth = $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
    if (userAuth.status != "success") {
      $('#myModal').modal("show")
      console.log("Not logged in")
      return false;
    }

    var elem = angular.element(item);
    var wtype = elem.attr("data-type");
    //console.log(wtype);
    let productData = {
      product_id: product_id,
      is_bundle: false,
      wish_type: wtype
    };
    var userAuth = typeof $.cookie("vcartAuth") ?
      JSON.parse($.cookie("vcartAuth")) :
      "";
    var usertoken = userAuth != "" ? userAuth.token : "";
    if (usertoken != "") {
      getWishList
        .addWish(productData, usertoken)
        .then(function (response) {
          console.log(response);
          var res = response.data.msg;
          if (res == "success") {
            var wishvalue = wtype == "add" ? "remove" : "add";
            elem.attr("data-type", wishvalue);
            if (wishvalue == "remove") {
              elem.addClass("wishheartt");
              toastr.success(response.data.results);
            } else {
              elem.removeClass("wishheartt");
              toastr.warning(response.data.results);
            }
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    } else {
      toastr.error("Login first to use this option");
    }
  };
  $scope.mybundles = [];
  $scope.userBundlelist = function () {
    userbundle
      .getList()
      .then(function (response) {
        console.log(response);
        let listdata = response.data.results.response;
        if (listdata != "") {
          angular.forEach(listdata, function (value, key) {
            $scope.mybundles.push(value);
          });
        }
        console.log($scope.mybundles);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  $scope.userBundlelist();

  $scope.addToBundle = function ($event, bundleId, productId, bundleQty) {
    var productQty = parseInt($("input[name=qty_" + productId + "]").val());
    let productData = {
      user_bundle: bundleId,
      product_id: productId,
      product_qty: productQty,
      is_bundle: false
    };

    userbundle
      .updateBundle(productData)
      .then(function (response) {
        var res = response.data;
        if (response.status == "200") {
          toastr.success(res.results.msg);
          angular
            .element($event.currentTarget)
            .find("span")
            .html(parseInt(bundleQty) + 1);
        } else {
          toastr.warning(res.error.msg);
        }
      })
      .catch(function (response) {
        console.log(response);
        toastr.warning(response.data.error.msg);
      });
  };
});