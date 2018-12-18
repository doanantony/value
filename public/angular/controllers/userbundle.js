app.controller("userbundle", function (
  $scope,
  $rootScope,
  $location,
  $window,
  $http,
  $timeout,
  $filter,
  $routeParams,
  config,
  dataset,
  userbundle,
  mybundle_addtocart
) {
  $scope.edit_title = 0;
  userbundle
    .getDetails(dataset.bundleId)
    .then(function (response) {
      $scope.mybundle_detail = response.data.results.response;
      $scope.mybundle = response.data.results.response.product;
      $scope.mybundle_dates = response.data.results.response;
      $scope.mybundle_name = response.data.results.response.ub_name;
      $scope.ub_id = response.data.results.response.ub_id;
    })
    .catch(function (response) {
      console.log(response);
    });
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
      $("input[name=" + fieldName + index + "]").attr(
        "data-qty",
        currentVal + 1
      );
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", 1);
    }

    $scope.cartTotal();
  };

  // This button will decrement the value till 0
  $scope.qty_minus = function (fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    $scope.qty = currentVal - 1;
    // If is not undefined
    if (!isNaN(currentVal) && currentVal > 1) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal - 1);
      $("input[name=" + fieldName + index + "]").attr(
        "data-qty",
        currentVal - 1
      );
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", 1);
    }
    $scope.cartTotal();
  };

  $scope.cartTotal = function () {
    var subtotal = 0,
      savingstotal = 0;
    angular.forEach(angular.element(".productcount"), function (value, key) {
      var a = angular.element(value);
      subtotal +=
        parseFloat(a.attr("data-price")) * parseFloat(a.attr("data-qty"));
      savingstotal +=
        parseFloat(a.attr("data-savings")) * parseFloat(a.attr("data-qty"));
    });
    var delivery_price = parseInt(10);
    var grandtotal = parseFloat(subtotal) + parseFloat(delivery_price);
    $(".subTotal").html(subtotal.toFixed(2) + " AED");
    $(".savingsTotal").html(subtotal.toFixed(2) + " AED");
    $(".grandTotal").html(grandtotal.toFixed(2) + " AED");
    $scope.grandTotal = grandtotal.toFixed(2);
  };

  $scope.change_title = function () {
    if ($scope.edit_title == 0) {
      $scope.edit_title = 1;
    } else {
      $scope.edit_title = 0;
    }
  };

  //user_bundle Update//
  var cp = document.forms.user_bundle,
    elem = cp.elements;
  cp.onsubmit = function () {
    let product_ids = [];
    let proceed = 0;
    $scope.mybundle.forEach(element => {
      //console.log(element.ubp_id);
      if ($("#brand_" + element.ubp_id).is(":checked") == true) {
        proceed = 1;
        let bundle_data = [];
        if (element.ubp_p_is_bundle == 1) {
          element.product.forEach(ele => {
            let bd = {
              pd_id: ele.ubbp_pd_id,
              is_alternative: ele.ubbp_is_alternative
            };
            bundle_data.push(bd);
          });
        }
        let data = {
          product_id: element.ubp_pd_id,
          quantity: $("input[name=qty_" + element.ubp_id + "]").val(),
          is_bundel: element.ubp_p_is_bundle,
          bundel_items: bundle_data
        };
        element.quantity = $("input[name=qty_" + element.ubp_id + "]").val();
        product_ids.push(data);
      }
    });
    let editdata = {
      bundle_name: $scope.mybundle_name,
      ub_id: $scope.ub_id,
      product_ids: product_ids
    };
    if (proceed == 1) {
      userbundle
        .editBundle(editdata)
        .then(function (response) {
          var res = response.data.results;
          if (res.msg == "success") {
            // toastr.success("Update Successfully..!");
            $("#bundle_options").modal({
              backdrop: "static",
              keyboard: false
            });
            // $window.location.href = "/mybundles";
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    } else {
      toastr.warning("Product should not be empty..!");
    }
  };

  var userAuth = $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
  $scope.loggedStatus = userAuth.status == "success" ? true : false;

  // $scope.bundle_addtocart = function(data) {
  //   mybundle_addtocart
  //     .getBundleData(data)
  //     .then(function(response) {
  //       console.log(response);
  //       if (response.status == "200") {
  //         const bundleProducts = response.data.results.response.product;
  //         bundleProducts.forEach(pro => {
  //           let data = {
  //             product_id: pro.ubp_pd_id,
  //             quantity: pro.ubp_qty,
  //             is_bundel: pro.ubp_p_is_bundle == 0 ? false : true
  //           };

  //           /** For Bundles **/
  //           if (pro.ubp_p_is_bundle == 1) {
  //             let alter = [];
  //             let alternative = pro.product;
  //             alternative.forEach(ele => {
  //               let alter_data = {
  //                 pd_id: parseInt(ele.p_pd_id),
  //                 is_alternaitve: ele.ubbp_is_alternative
  //               };
  //               alter.push(alter_data);
  //             });
  //             data.bundel_items = alter;
  //           }

  //           mybundle_addtocart
  //             .addToCart(data)
  //             .then(function(response) {
  //               if (response.data.results.status != "200") {
  //                 toastr.warning(response.data.results.msg);
  //               } else {
  //                 toastr.success(response.data.results.msg);
  //                 var cartOldQty = localStorage.getItem("cartCount");
  //                 var newCartQty = parseInt(cartOldQty) + parseInt(1);
  //                 localStorage.setItem("cartCount", newCartQty);
  //                 $(".cart-label").text(newCartQty);
  //               }
  //             })
  //             .catch(function(response) {
  //               toastr.warning(response.data.results.msg);
  //             });
  //         });
  //         //window.location = "/cart";
  //       }
  //     })
  //     .catch(function(response) {
  //       //toastr.warning(response.data.results.msg);
  //     });
  // };

  $scope.bundle_addtocart = function (data) {
    mybundle_addtocart
      .addToCart(data)
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
        toastr.warning(response.data.error.response);
      });
  };
  /**
   * Add to cart functionality for checkout button on the popup
   */
  $scope.bundle_checkout = function (data) {
    mybundle_addtocart
      .addToCart(data)
      .then(function (response) {
        if (response.data.results.status != "200") {
          toastr.warning(response.data.results.msg);
        } else {
          toastr.success(response.data.results.msg);
          var cartOldQty = localStorage.getItem("cartCount");
          var newCartQty = parseInt(cartOldQty) + parseInt(1);
          localStorage.setItem("cartCount", newCartQty);
          $(".cart-label").text(newCartQty);
          $window.location.href = "/cart";
        }
      })
      .catch(function (response) {
        $window.location.href = "/cart";
        toastr.warning(response.data.error.response);
      });
  };
  $scope.bundle_unsbuscribe = function (data) {
    mybundle_addtocart
      .unSubscribe(data)
      .then(function (response) {
        console.log(response);
        if (response.data.results.status != "200") {
          toastr.warning("Somthing Went Wrong..!");
        } else {
          location.reload();
        }
      })
      .catch(function (response) {
        toastr.warning(response);
      });
  };
});
