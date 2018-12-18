app.controller("product_listing", function (
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  querydata,
  getProductList,
  product_details,
  getWishList,
  userbundle
) {
  $scope.loadon = false;
  $scope.productData = [];
  $scope.mybundles = [];
  $scope.page = 0;
  $scope.sub_cat_active = 0;
  $scope.nextcall = 1;
  $scope.queryparam = querydata.queryparam;
  /**
   * apply filter onload by taking URL parameters
   */
  $scope.filters_apply = function () {
    let filterdata = $location.search();
    if (filterdata.sub_cat) {
      $scope.sub_cat_active = filterdata.sub_cat;
      $scope.show = 1;
    }
    if (filterdata.price_start || filterdata.price_end) {
      let start = filterdata.price_start ? filterdata.price_start : "";
      let end = filterdata.price_end ? filterdata.price_end : "";
      $(".pri_" + start + "_" + end).prop("checked", true);
      $(".pri_" + start + "_" + end)
        .closest(".panel")
        .find(".clearfilter")
        .show(200);
    }
    if (filterdata.discount_start || filterdata.discount_end) {
      let start = filterdata.discount_start ? filterdata.discount_start : "";
      let end = filterdata.discount_end ? filterdata.discount_end : "";
      $(".dis_" + start + "_" + end).prop("checked", true);
      $(".dis_" + start + "_" + end)
        .closest(".panel")
        .find(".clearfilter")
        .show(200);
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
  /**
   * get product list for onload and as well in scroll
   */
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
    getProductList
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

  $scope.filters_apply();
  $scope.userBundlelist();
  $scope.getlist();
  /**
   * scroll listener
   */
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
  /**
   * Apply Filter
   * @param {string} type
   * @param {Number} p1
   * @param {Number} p2
   */
  $scope.clearFilter = function (type) {
    $scope.page = 0;
    $scope.productData = [];
    switch (type) {
      case "cat":
        $location.search("cat", null);
        $location.search("sub_cat", null);
        delete querydata.queryparam.sub_cat;
        delete querydata.queryparam.cat;
        $scope.getlist();
        $scope.show = 0;
        $scope.cat_active = "";
        $scope.sub_cat_active = "";
        break;
      case "sub_cat":
        delete querydata.queryparam.sub_cat;
        $location.search("sub_cat", null);
        $scope.getlist();
        $scope.show = 0;
        $scope.sub_cat_active = "";
        break;
      case "price":
        $location.search("price_start", null);
        $location.search("price_end", null);
        delete querydata.queryparam.price_start;
        delete querydata.queryparam.price_end;
        $scope.getlist();
        break;
      case "discount":
        $location.search("discount_start", null);
        $location.search("discount_end", null);
        delete querydata.queryparam.discount_start;
        delete querydata.queryparam.discount_end;
        $scope.getlist();
        break;
      case "brand":
        $location.search("brand", null);
        delete querydata.queryparam.brand;
        $scope.getlist();
        break;
      case "sort":
        $location.search("order_by", null);
        delete querydata.queryparam.order_by;
        $scope.getlist();
        break;
      default:
        $scope.getlist();
    }
    $("input:radio[name='" + type + "']").each(function (i) {
      this.checked = false;
    });
  };

  $scope.filters = function (type, p1, p2, p3, p4) {
    $scope.productData = [];
    $scope.page = 0;
    $scope.nextcall = 1;
    switch (type) {
      case "sub_cat":
        $location.search("sub_cat", p1);
        $scope.show = 1;
        $scope.getlist();
        $scope.sub_cat_active = p1;
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
  /**
   *
   * @param {*} data
   */
  $scope.addtocart = function (data) {
    var currentVal = parseInt($("input[name=qty_" + data + "]").val());
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
  };

  //Offline Addtocart functionality
  $scope.cartList = [];
  $scope.addtocartOffline = function (data) {
    $("#myModal").modal("show");
    // var getList = JSON.parse(localStorage.getItem("cartList"));
    // $scope.cartList = getList;
    // var currentVal = parseInt($("input[name=qty_" + data + "]").val());
    // var cartData = { product_id: data, qty: currentVal, is_bundle: false };

    // if (getList) {
    //   var uniquePro = true;
    //   angular.forEach(getList, function(value, key) {
    //     if (value.product_id == data) {
    //       uniquePro = false;
    //       return;
    //     }
    //   });
    //   if (uniquePro) $scope.cartList.push(cartData);
    // } else {
    //   $scope.cartList.push(cartData);
    // }

    // localStorage.setItem("cartList", JSON.stringify($scope.cartList));
    // var getList = localStorage.getItem("cartList");
    // console.log(getList);
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

    //console.log(wtype);
    let productData = {
      product_id: product_id,
      is_bundle: false,
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
  $scope.addToBundleWithoutBundleId = function ($event, productId) {
    var productQty = parseInt($("input[name=qty_" + productId + "]").val());
    let productData = {
      product_id: productId,
      product_qty: productQty,
      is_bundle: false
    };
    userbundle
      .updateBundleWithoutBundleId(productData)
      .then(function (response) {
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
        console.log(response);
        toastr.warning(response.data.error.msg);
      });
  };
});
