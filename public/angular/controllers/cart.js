app.controller("cart", function (
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  cart,
  cartData,
  getWishList
) {
  $scope.applied = 1;
  $scope.showele = "showele";
  $scope.qty = 1;
  $scope.cartGrand = parseFloat(cartData.cartSum.toFixed(2));
  $scope.edit_title = 0;
  cart
    .getsetting()
    .then(function (response) {
      if (response.data.results.status != "200") {
        console.log(response.data.results);
        $scope.dc =
          $scope.cartGrand > parseFloat(response.data.results.deliveryFreePrice)
            ? 0
            : parseFloat(response.data.results.deliveryCharge);
        $scope.deliveryFreePrice = parseFloat(
          response.data.results.deliveryFreePrice
        );
        $scope.deliveryCharge = parseFloat(
          response.data.results.deliveryCharge
        );
        $scope.minOrderAmt = parseFloat(response.data.results.minOrderAmt);
      } else {
        $scope.deliveryFreePrice = 250;
        $scope.deliveryCharge = 10;
        $scope.minOrderAmt = 50;
      }
      $scope.cartTotal();
    })
    .catch(function (response) {
      // toastr.warning(response.data.results.msg);
      $scope.deliveryFreePrice = 250;
      $scope.deliveryCharge = 10;
      $scope.cartTotal();
    });
  $scope.addtocart = function (data) {
    product_details
      .addToCart($scope.qty, data)
      .then(function (response) {
        if (response.data.results.status != "200") {
          toastr.warning(response.data.results.msg);
        } else {
          window.location = "/cart";
        }
      })
      .catch(function (response) {
        toastr.warning(response.data.results.msg);
      });
  };

  $scope.qty_plus = function (fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    let qty = currentVal + 1;
    if (parseInt(currentVal) >= 5) {
      toastr.warning("Cannot add more than 5 items of same product.");
      return
    }
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal + 1);
      $("input[name=" + fieldName + index + "]").attr(
        "data-qty",
        currentVal + 1
      );
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", 1);
    }
    $scope.updateCart(qty, index);
    $scope.cartTotal();
  };

  // This button will decrement the value till 0
  $scope.qty_minus = function (fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    let qty = currentVal - 1;
    // If is not undefined
    if (!isNaN(currentVal) && currentVal > 1) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal - 1);
      $("input[name=" + fieldName + index + "]").attr(
        "data-qty",
        currentVal - 1
      );
      $scope.updateCart(qty, index);
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", 1);
    }
    $scope.cartTotal();
  };

  $scope.updateCart = function (qty, index) {
    cart
      .quantityUpdate(qty, index)
      .then(function (response) { })
      .catch(function (response) {
        // toastr.warning(response.data.results.msg);
      });
  };

  $scope.removeCart = function (cart_id, is_bundle, item) {
    var elem = angular.element(item);
    let productData = {
      ct_id: cart_id
    };
    var userAuth = typeof $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    var usertoken = userAuth != "" ? userAuth.token : "";

    cart
      .removeCart(productData, usertoken)
      .then(function (response) {
        console.log(response);
        var res = response.data.results;
        if (res.status == 200) {
          $(".cart_panel_" + cart_id).remove();
          var numItems = $(".productpanel").length;
          if (numItems < 1) {
            $(".empty-panel").removeClass("hidden");
            $("#summary-desktop").empty();
            $("#order_summary_box").empty();
          }
          $scope.cartTotal();
          var cartOldQty = localStorage.getItem("cartCount");
          var newCartQty = parseInt(cartOldQty) - parseInt(1);
          localStorage.setItem("cartCount", newCartQty);
          $(".cart-label").text(newCartQty);
          toastr.success(res.msg);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  $scope.deleteBundle = function (ub_id, e) {
    var userAuth = typeof $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    var usertoken = userAuth != "" ? userAuth.token : "";
    cart
      .removeUserbundle(ub_id, usertoken)
      .then(function (response) {
        var res = response.data.results;
        if (res.status == "200") {
          $("#mybnd-desktop,.ub_idd,#mybnd-desktop-text").remove();
          toastr.success("User Bundle Deleted Successfully!!");
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  $scope.cartTotal = function () {
    var ctotal = 0.0;
    angular.forEach(angular.element(".productcount"), function (value, key) {
      var a = angular.element(value);
      ctotal +=
        parseFloat(a.attr("data-price")) * parseFloat(a.attr("data-qty"));
    });
    $scope.subGrand = parseFloat(ctotal).toFixed(2);
    $scope.dc =
      parseFloat(ctotal).toFixed(2) >= $scope.deliveryFreePrice
        ? 0
        : parseFloat($scope.deliveryCharge).toFixed(2);
    $scope.cartGrand = (parseFloat(ctotal) + parseFloat($scope.dc)).toFixed(2);
    console.log($scope.dc);
  };
  $scope.cartTotal();
  $scope.verifyToken = function (coupon) {
    var userAuth = typeof $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    var usertoken = userAuth != "" ? userAuth.token : "";
    cart
      .verifyCoupon(coupon, $scope.cartGrand, usertoken)
      .then(function (response) {
        if (response.status == 200) {
          toastr.success("Coupon valid and applied");
          let data = response.data.results;
          $scope.applied = 0;
          $scope.couponInfo = data.msg;
          $scope.cartGrand = parseFloat(data.response.discounted_price);
          $scope.cartsaving = parseFloat(data.response.discount);
        } else {
          toastr.info("Coupon not valid");
        }
      })
      .catch(function (response) {
        let data = response.data.error;
        toastr.info(data.msg);
      });
  };
  $scope.removeCoupon = function () {
    $scope.cartGrand += $scope.cartsaving;
    delete $scope.cartsaving;
    $scope.applied = 1;
    $scope.coupon = "";
  };

  $scope.addwish = function (product_id, is_bundle, item) {
    var userAuth = $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    if (userAuth.status != "success") {
      $("#myModal").modal("show");
      console.log("Not logged in");
      return false;
    }

    var elem = angular.element(item);
    var wtype = elem.attr("data-type");
    //console.log(wtype);
    let productData = {
      product_id: product_id,
      is_bundle: is_bundle,
      wish_type: wtype
    };
    var userAuth = typeof $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    var usertoken = userAuth != "" ? userAuth.token : "";

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
  };

  $scope.edit_title = 0;
  $scope.change_title = function () {
    if ($scope.edit_title == 0) {
      $(this)
        .find("img")
        .attr("src", "img/cancelimg.png");
      $scope.edit_title = 1;
    } else {
      $(this)
        .find("img")
        .attr("src", "img/cancelimg.png");
      $scope.edit_title = 0;
    }
  };

  if (angular.element("#mybnd-desktop").length) {
    var cp = document.forms.updateBundleName,
      elem = cp.elements;
    cp.onsubmit = function () {
      var a = 0;
      if (!elem.bundlename.value) {
        toastr.error("Bundle name is must.");
        a = 1;
      }

      if (a == 1) {
        return false;
      } else {
        var userAuth = typeof $.cookie("vcartAuth")
          ? JSON.parse($.cookie("vcartAuth"))
          : "";
        var userToken = userAuth != "" ? userAuth.token : "";

        let userData = {
          ub_id: elem.bundleid.value,
          ub_name: elem.bundlename.value
        };

        cart
          .updateBundleName(userData, userToken)
          .then(function (response) {
            console.log(response);
            if (response.data.results.status == 200) {
              toastr.success("Bundle Name Updated Successfully");
              $(".newBundleName").text(elem.bundlename.value);
              $scope.edit_title = 0;
            } else {
              toastr.warning("Somthing Went Wrong");
            }
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    };
  }
  $scope.save_title = function () {
    cp.onsubmit();
  };
  $scope.checkorder_value = function (order_value) {
    if (order_value < $scope.minOrderAmt) {
      toastr.warning(
        `Order Value should be more then ${$scope.minOrderAmt} AED!`
      );
    } else {
      $("#cartsubmit").submit();
    }
  };
});
