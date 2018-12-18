app.controller("bundle_details", function (
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  postBundleReview,
  bundle_details,
  getWishList,
  userbundle,
  myrev
) {
  $scope.rating = myrev.data.prr_ratting;
  $scope.title = myrev.data.prr_title;
  $scope.review = myrev.data.prr_comment;
  var userAuth = $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
  $scope.loggedStatus = userAuth.status == "success" ? true : false;
  var postReview = function (postData, userAuth) {
    postBundleReview
      .postReview(postData, userAuth)
      .then(function (response) {
        console.log(response.data);
        var postResult = response.data;
        if ((postResult.msg = "success")) {
          var reviewStatus = postResult.results.response.msg;
          $scope.postReviewstatus = reviewStatus;
          var userName = JSON.parse($.cookie("vcartAuth")).username;
          var userId = JSON.parse($.cookie("vcartAuth")).user_id;
          var date = moment().format("MMM Do YYYY");
          var newRev =
            '<div class="review"><p class="userdate">' +
            userName +
            ", " +
            date +
            '</p><p class="star"><span class="stars"><i class="fa fa-star filled"></i><i class="fa fa-star filled"></i><i class="fa fa-star filled"></i><i class="fa fa-star filled"></i><i class="fa fa-star filled"></i></span> ' +
            postData.rating +
            " out of 5</p><h5>" +
            postData.title +
            "</h5><p>" +
            postData.review +
            "</p></div>";
          $scope.newReview = postData;
          var el = angular.element(document.querySelector(".review"));
          if (postResult.results.msg == "updated") {
            var dEl = angular.element(
              document.querySelector(".review_" + userId)
            );
            dEl.html("");
          }
          el.prepend(newRev);
          angular.element("#closebtn").triggerHandler("click");
        } else {
          var reviewStatus = postResult.results.response.msg;
          var myEl = angular.element(document.querySelector("#rstatus"));
          myEl.addClass("has-error");
          $scope.postReviewstatus = reviewStatus;
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  $scope.submitReviewbundle = function () {
    var product_id = $("#product_id").val();
    var userAuth = typeof $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    var usertoken = userAuth != "" ? userAuth.token : "";

    if ($scope.rating != undefined) {
      $scope.ratingError = "";
      $scope.data = {
        rating: $scope.rating,
        title: $scope.title,
        review: $scope.review,
        is_product_bundle: 1,
        product_id: product_id
      };
      var postStatus = postReview($scope.data, usertoken);
    } else {
      $scope.ratingError = "It is required";
    }
  };
  $scope.qty = 1;
  $scope.addtocart = function (data, pb_id) {
    let allok = 1;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (element.alternatives != "") {
          let alters = element.alternatives;
          for (const key in alters) {
            if (alters.hasOwnProperty(key)) {
              const element_alter = alters[key];
              var selValue = $(
                "input[name=rGroup_" + element_alter.pba_pbm_id + "]:checked"
              ).val();
              if (typeof selValue == "undefined") {
                allok = 0;
              }
            }
          }
        }
      }
    }
    if (allok == 1) {
      bundle_details
        .addToCart($scope.qty, $scope.c, pb_id)
        .then(function (response) {
          if (response.data.results.status != "200") {
            toastr.warning(response.data.results.msg);
          } else {
            window.location = "/cart";
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
      toastr.warning("Please Select Alternative Products!!");
    }
  };

  //Offline Addtocart functionality
  $scope.cartList = [];
  $scope.addtocartOffline = function (data, pb_id) {
    let allok = 1;
    $("#myModal").modal("show");
    // for (const key in data) {
    //   if (data.hasOwnProperty(key)) {
    //     const element = data[key];
    //     if (element.alternatives != "") {
    //       let alters = element.alternatives;
    //       for (const key in alters) {
    //         if (alters.hasOwnProperty(key)) {
    //           const element_alter = alters[key];
    //           var selValue = $(
    //             "input[name=rGroup_" + element_alter.pba_pbm_id + "]:checked"
    //           ).val();
    //           if (typeof selValue == "undefined") {
    //             allok = 0;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // if (allok == 1) {
    //   var getList = JSON.parse(localStorage.getItem("cartList"));
    //   $scope.cartList = getList;
    //   var currentVal = $scope.qty;
    //   var cartData = {
    //     product_id: pb_id,
    //     qty: currentVal,
    //     is_bundle: true,
    //     alternatives: $scope.c
    //   };

    //   if (getList) {
    //     var uniquePro = true;
    //     angular.forEach(getList, function(value, key) {
    //       if (value.product_id == pb_id) {
    //         uniquePro = false;
    //         return;
    //       }
    //     });
    //     if (uniquePro) $scope.cartList.push(cartData);
    //   } else {
    //     $scope.cartList.push(cartData);
    //   }

    //   localStorage.setItem("cartList", JSON.stringify($scope.cartList));
    //   var getList = localStorage.getItem("cartList");
    //   console.log(getList);
    // } else {
    //   toastr.warning("Please Select Alternative Products!!");
    // }
  };

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

  //Prdouct Review Controler
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
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  $scope.userBundlelist();

  $scope.addToBundle = function ($event, bundleId, bundleQty, data, pb_id) {
    let allok = 1;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (element.alternatives != "") {
          let alters = element.alternatives;
          for (const key in alters) {
            if (alters.hasOwnProperty(key)) {
              const element_alter = alters[key];
              var selValue = $(
                "input[name=rGroup_" + element_alter.pba_pbm_id + "]:checked"
              ).val();
              if (typeof selValue == "undefined") {
                allok = 0;
              }
            }
          }
        }
      }
    }
    if (allok == 1) {
      let alter = [];
      for (const key in $scope.c) {
        if ($scope.c.hasOwnProperty(key)) {
          const element = $scope.c[key];
          let is_alternaitve = element == key ? false : true;
          let alter_data = {
            p_id: parseInt(element),
            is_alternaitve: is_alternaitve
          };
          alter.push(alter_data);
        }
      }
      // If Customer Selected alternatives
      var productId = pb_id;
      var productQty = parseInt($(".productcount").val());
      let productData = {
        user_bundle: bundleId,
        product_id: productId,
        product_qty: productQty,
        is_bundle: true,
        bundel_items: alter
      };

      userbundle
        .updateBundle(productData)
        .then(function (response) {
          console.log(response);
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
    } else {
      toastr.warning("Please Select Alternative Products!!");
    }
    /* var productId = pb_id;
    var productQty = parseInt($(".productcount").val());
    let productData = {
      user_bundle: bundleId,
      product_id: productId,
      product_qty: productQty,
      is_bundle: true,
      bundle_items: []
    };
    console.log(productData);
    return;

    userbundle
      .updateBundle(productData)
      .then(function(response) {
        console.log(response);
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
      .catch(function(response) {
        console.log(response);
        toastr.warning(response.data.error.msg);
      }); */
  };
  $scope.addToBundleWithoutid = function ($event, data, pb_id) {
    let allok = 1;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (element.alternatives != "") {
          let alters = element.alternatives;
          for (const key in alters) {
            if (alters.hasOwnProperty(key)) {
              const element_alter = alters[key];
              var selValue = $(
                "input[name=rGroup_" + element_alter.pba_pbm_id + "]:checked"
              ).val();
              if (typeof selValue == "undefined") {
                allok = 0;
              }
            }
          }
        }
      }
    }
    if (allok == 1) {
      let alter = [];
      for (const key in $scope.c) {
        if ($scope.c.hasOwnProperty(key)) {
          const element = $scope.c[key];
          let is_alternaitve = element == key ? false : true;
          let alter_data = {
            p_id: parseInt(element),
            is_alternaitve: is_alternaitve
          };
          alter.push(alter_data);
        }
      }
      // If Customer Selected alternatives
      var productId = pb_id;
      var productQty = parseInt($(".productcount").val());
      let productData = {
        product_id: productId,
        product_qty: productQty,
        is_bundle: true,
        bundel_items: alter
      };

      userbundle
        .updateBundleWithoutBundleId(productData)
        .then(function (response) {
          console.log(response);
          var res = response.data;
          if (response.status == "200") {
            toastr.success(res.results.msg);
            var cartOldQty = localStorage.getItem("bundleCount");
            var newCartQty = parseInt(cartOldQty) + parseInt(1);
            localStorage.setItem("cartCount", newCartQty);
          } else {
            toastr.warning(res.error.msg);
          }
        })
        .catch(function (response) {
          console.log(response);
          toastr.warning(response.data.error.msg);
        });
    } else {
      toastr.warning("Please Select Alternative Products!!");
    }
  };
});
