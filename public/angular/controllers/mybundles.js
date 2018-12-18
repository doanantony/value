app.controller("myBundles", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  mybundle_addtocart
) {
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

  /**
   * Add Mybundle to Cart
   */
  $scope.bundle_addtocart = function(data) {
    mybundle_addtocart
      .addToCart(data)
      .then(function(response) {
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
      .catch(function(response) {
        toastr.warning(response.data.error.response);
        toastr.warning(response.data.results.msg);
      });
  };

  $scope.bundle_unsbuscribe = function(data) {
    mybundle_addtocart
      .unSubscribe(data)
      .then(function(response) {
        console.log(response);
        if (response.data.results.status != "200") {
          toastr.warning("Somthing Went Wrong..!");
        } else {
          location.reload();
        }
      })
      .catch(function(response) {
        toastr.warning(response);
      });
  };
});
