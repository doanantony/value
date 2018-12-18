app.controller("createUserBundle", function (
  $scope,
  $rootScope,
  $location,
  $window,
  $http,
  $timeout,
  $filter,
  $routeParams,
  config,
  order_id,
  createUserbundle
) {
  $scope.mybundle_name = "";
  $scope.edit_title = 0;
  $scope.init = function () {
    // $(".loader").removeClass("hidden");
    createUserbundle
      .getDetails(order_id.order_id)
      .then(function (response) {
        // $(".loader").addClass("hidden");
        $scope.mybundle = response.data.results.response.order_products;
        $scope.mybundle_name = querydata.bundlename;
      })
      .catch(function (response) {
        // $(".loader").addClass("hidden");
        console.log(response);
      });
  };
  $scope.init();
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
    var delivery_price = parseInt(15);
    var grandtotal = parseFloat(subtotal) + parseFloat(delivery_price);
    $(".subTotal").html(subtotal + " AED");
    $(".savingsTotal").html(subtotal + " AED");
    $(".grandTotal").html(grandtotal + " AED");
    $scope.grandTotal = grandtotal;
  };

  $scope.change_title = function () {
    if ($scope.edit_title == 0) {
      $scope.edit_title = 1;
    } else {
      $scope.edit_title = 0;
    }
  };

  //   //user_bundle Update//
  //   var cp = document.forms.createBundle,
  //     elem = cp.elements;
  //   cp.onsubmit = function() {
  //     let product_ids = [];
  //     let proceed = 0;
  //     $scope.mybundle.forEach(element => {
  //       if ($("#brand_" + element.op_id).is(":checked") == true) {
  //         proceed = 1;
  //         let bundle_data = [];
  //         if (element.ct_is_bundel == 1) {
  //           element.product.forEach(ele => {
  //             let bd = {
  //               pd_id: ele.ctb_pd_id,
  //               is_alternative: ele.ctb_is_alternative == 1 ? 1 : 0
  //             };
  //             bundle_data.push(bd);
  //           });
  //         }
  //         let data = {
  //           product_id: element.ct_pd_id,
  //           quantity: $("input[name=qty_" + element.op_id + "]").val(),
  //           is_bundel: element.ct_is_bundel == true ? 1 : 0,
  //           bundel_items: bundle_data
  //         };
  //         element.quantity = $("input[name=qty_" + element.op_id + "]").val();
  //         product_ids.push(data);
  //       }
  //     });
  //     let querydata = $location.search();
  //     let insertdata = {
  //       bundle_name: $scope.mybundle_name,
  //       no_days: querydata.end_period,
  //       time_period: querydata.time_interval,
  //       product_ids: product_ids
  //     };
  //     if (proceed == 1) {
  //       createUserbundle
  //         .insertBundle(insertdata)
  //         .then(function(response) {
  //           var res = response.data.results;
  //           if (res.msg == "success") {
  //             toastr.success("Created Successfully..!");
  //             $window.location.href = "/mybundles";
  //           }
  //         })
  //         .catch(function(response) {
  //           console.log(response);
  //         });
  //     } else {
  //       toastr.warning("Product should not be empty..!");
  //     }
  //   };
  // });

  //user_bundle Update//
  var cp = document.forms.createBundle,
    elem = cp.elements;
  cp.onsubmit = function () {
    // $(".loader").removeClass("hidden");
    let product_ids = [];
    let proceed = 0;
    if ($scope.mybundle_name == "") {
      $(".loader").addClass("hidden");
      toastr.warning("Bundle Name is required");
      return false;
    }
    var typeSubmit = $(".typeSubmit").val();
    //console.log(typeSubmit);

    $scope.mybundle.forEach(element => {
      if ($("#brand_" + element.op_id).is(":checked") == true) {
        proceed = 1;
        let bundle_data = [];
        if (element.ct_is_bundel == true) {
          element.product.forEach(ele => {
            let bd = {
              pd_id: ele.ctb_pd_id,
              is_alternative: ele.ctb_is_alternative == 1 ? 1 : 0
            };
            bundle_data.push(bd);
          });
        }
        let data = {
          product_id: element.ct_pd_id,
          quantity: $("input[name=qty_" + element.op_id + "]").val(),
          is_bundel: element.ct_is_bundel == true ? 1 : 0,
          bundel_items: bundle_data
        };
        element.quantity = $("input[name=qty_" + element.op_id + "]").val();
        product_ids.push(data);
      }
    });
    let insertdata = {
      bundle_name: $scope.mybundle_name,
      product_ids: product_ids
    };
    if (proceed == 1) {
      createUserbundle
        .insertBundleWithProduct(insertdata)
        .then(function (response) {
          var res = response.data.results;
          if (res.msg == "success") {
            // $(".loader").addClass("hidden");
            toastr.success("Created Successfully..!");
            if (typeSubmit == "continue") {
              $window.location.href = "/";
            } else {
              $window.location.href =
                "/create-bundle/success/" + res.response[0];
            }
          }
        })
        .catch(function (response) {
          // $(".loader").addClass("hidden");
          console.log(response);
        });
    } else {
      // $(".loader").addClass("hidden");
      toastr.warning("Product should not be empty..!");
    }
  };
});
// app.config(function($routeProvider, $locationProvider, $httpProvider) {
//   $locationProvider.html5Mode(true);
// });
