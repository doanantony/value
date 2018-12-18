app.controller("bundle_listing", function (
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  querydata,
  getbundleList,
  getWishList
) {
  $scope.loadon = false;
  $scope.productData = [];
  $scope.page = 0;
  $scope.sub_cat_active = 0;
  $scope.nextcall = 1;
  $scope.queryparam = querydata.queryparam;
  $scope.filters_apply = function () {
    let filterdata = $location.search();
    if (filterdata.sub_cat) {
      $scope.sub_cat_active = filterdata.sub_cat;
    }
    if (filterdata.price_start || filterdata.price_end) {
      let start = filterdata.price_start ? filterdata.price_start : "";
      let end = filterdata.price_end ? filterdata.price_end : "";
      $(".pri_" + start + "_" + end).prop("checked", true);
    }
    if (filterdata.discount_start || filterdata.discount_end) {
      let start = filterdata.discount_start ? filterdata.discount_start : "";
      let end = filterdata.discount_end ? filterdata.discount_end : "";
      $(".dis_" + start + "_" + end).prop("checked", true);
    }
    if (filterdata.brand) {
      let object = filterdata.brand.split(",");
      $scope.c = {};
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          $scope.c[element] = parseInt(element);
        }
      }
    }
    if (filterdata.order_by) {
      $scope.sort = filterdata.order_by;
    }
  };
  $scope.getlist = function () {
    $scope.loadon = true;
    let queryparams = $location.search();
    for (const key in queryparams) {
      if (queryparams.hasOwnProperty(key)) {
        const element = queryparams[key];
        $scope.queryparam[key] = element;
      }
    }
    var apidata = queryparams;
    apidata.cat_id = querydata.queryparam.cat_id;
    getbundleList
      .getlist(apidata, $scope.page)
      .then(function (response) {
        var userAuth = $.cookie("vcartAuth")
          ? JSON.parse($.cookie("vcartAuth"))
          : "";
        $scope.loggedStatus = userAuth.status == "success" ? true : false;
        $scope.liststate = response.data.results.msg;
        let listdata = response.data.results.response;
        if (listdata != "") {
          angular.forEach(listdata, function (value, key) {
            $scope.productData.push(value);
          });
          $scope.nextcall = 1;
          $scope.page++;
        } else {
          $scope.nextcall = 0;
        }
        $scope.loadon = false;
      })
      .catch(function (response) {
        console.log(response.status);
      });
  };
  $scope.filters_apply();
  $scope.getlist();
  $(window).scroll(function () {
    var bodypos = $("body")[0].scrollHeight;
    var windowh = $(window).height();
    bodypos = bodypos - windowh;
    var windowpos = $(window).scrollTop();
    var persentage = Math.round((windowpos / bodypos) * 100);
    if (Math.round(persentage) > 80 && $scope.nextcall == 1) {
      $scope.nextcall = 0;
      $scope.getlist();
    }
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
  $scope.filters = function (type, p1, p2) {
    $scope.productData = [];
    $scope.page = 0;
    $scope.nextcall = 1;
    switch (type) {
      case "sub_cat":
        $location.search("sub_cat", p1);
        $scope.getlist();
        break;
      case "price":
        var dataChecked = $(
          ".pri_" + (p1 == 0 ? "" : p1) + "_" + (p2 == 0 ? "" : p2)
        ).prop("checked");
        $('input[name="price"]').prop("checked", false);
        if (dataChecked) {
          $(".pri_" + (p1 == 0 ? "" : p1) + "_" + (p2 == 0 ? "" : p2)).prop(
            "checked",
            true
          );
          if (p1) {
            $location.search("price_start", p1);
          } else {
            $location.search("price_start", null);
          }
          if (p2) {
            $location.search("price_end", p2);
          } else {
            $location.search("price_end", null);
          }
          $scope.getlist();
        } else {
          $location.search("price_end", null);
          $location.search("price_start", null);
          $scope.getlist();
        }
        break;
      case "discount":
        if (p1) {
          $location.search("discount_start", p1);
        } else {
          $location.search("discount_start", null);
        }
        if (p2) {
          $location.search("discount_end", p2);
        } else {
          $location.search("discount_end", null);
        }
        $scope.getlist();
        break;
      case "brand":
        let element = "";
        for (const key in $scope.c) {
          if ($scope.c.hasOwnProperty(key)) {
            if ($scope.c[key]) {
              element += $scope.c[key] + ",";
            }
          }
        }
        let elements = element.replace(/(^,)|(,$)/g, "");
        $location.search("brand", elements);
        $scope.getlist();
        break;
      case "sort":
        $location.search("order_by", p1);
        $scope.getlist();
        break;
      default:
    }
  };

  // Wishlist Add and Remove
  $scope.addwish = function (product_id, item, index) {
    var userAuth = $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    if (userAuth.status != "success") {
      $("#myModal").modal("show");
      console.log("Not logged in");
      return false;
    }

    let productData = {
      product_id: product_id,
      is_bundle: true,
      wish_type: item ? "remove" : "add"
    };
    var userAuth = typeof $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    var usertoken = userAuth != "" ? userAuth.token : "";

    getWishList
      .addWish(productData, usertoken)
      .then(function (response) {
        var res = response.data.msg;
        if (res == "success") {
          $scope.productData[index].wishlist = item ? false : true;
          if (item == false) {
            toastr.success(response.data.results);
          } else {
            toastr.warning(response.data.results);
          }
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  $scope.addToBundleWithoutBundleId = function ($event, pb_id) {
    var qty = parseInt($("input[name=qty_" + pb_id + "]").val());
    //console.log(pb_id);
    bundle_details
      .getBundleDetail(pb_id)
      .then(function (response) {
        if (response.data.results.status != "200") {
          toastr.warning(response.data.results.msg);
        } else {
          let alter = [];
          var proList = response.data.results.response[0].product;
          if (proList) {
            angular.forEach(proList, function (value, key) {
              let is_alternaitve = value.pbm_is_alternative == 0 ? false : true;
              var pd_id = "";
              var alternatives = value.alternatives;
              if (is_alternaitve) {
                angular.forEach(alternatives, function (val, i) {
                  if (val.pba_is_default == 1) {
                    var pd_id = {
                      p_id: parseInt(value.pd_id),
                      is_alternaitve: true
                    };
                  }
                });
              } else {
                var pd_id = {
                  p_id: parseInt(value.pd_id),
                  is_alternaitve: false
                };
              }
              alter.push(pd_id);
            });
          }
          let productData = {
            product_id: pb_id,
            product_qty: qty,
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
                localStorage.setItem("bundleCount", newCartQty);
                $(".cart-label").text(newCartQty);
              } else {
                toastr.warning(res.error.msg);
              }
            })
            .catch(function (response) {
              toastr.warning(response.data.error.msg);
            });
        }
      })
      .catch(function (response) {
        toastr.warning(response.data.results.msg);
      });
  };
});
